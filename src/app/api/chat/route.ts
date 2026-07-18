import { NextRequest } from 'next/server';
import { ai, GEMINI_MODEL, SYSTEM_PROMPT, SEARCH_PETS_TOOL, searchPetsFromAPI } from '@/lib/gemini';
import type { ChatMessage } from '@/types/chat';
import type { Content, Part } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const contents: Content[] = messages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents,
            config: {
              systemInstruction: SYSTEM_PROMPT,
              tools: [{ functionDeclarations: [SEARCH_PETS_TOOL] }],
            },
          });

          let maxIterations = 5;
          while (maxIterations > 0) {
            const functionCalls = response.functionCalls;

            if (functionCalls && functionCalls.length > 0) {
              // Extract raw parts from the first candidate to get thoughtSignature
              const candidateParts: Part[] =
                response.candidates?.[0]?.content?.parts || [];

              for (const fc of functionCalls) {
                if (fc.name === 'searchPets') {
                  controller.enqueue(
                    encoder.encode(
                      JSON.stringify({ type: 'function_call', content: 'Searching for pets...' }) + '\n'
                    )
                  );

                  const pets = await searchPetsFromAPI(fc.args as Record<string, unknown>);

                  controller.enqueue(
                    encoder.encode(
                      JSON.stringify({ type: 'pets', pets }) + '\n'
                    )
                  );

                  // Find the matching raw part to preserve thoughtSignature
                  const matchingPart = candidateParts.find(
                    (p) => p.functionCall?.name === fc.name
                  );

                  const modelPart: Part = {
                    functionCall: { name: fc.name, args: fc.args },
                  };
                  if (matchingPart?.thoughtSignature) {
                    modelPart.thoughtSignature = matchingPart.thoughtSignature;
                  }
                  if (matchingPart?.thought !== undefined) {
                    modelPart.thought = matchingPart.thought;
                  }

                  contents.push(
                    { role: 'model', parts: [modelPart] },
                    {
                      role: 'user',
                      parts: [
                        {
                          functionResponse: {
                            name: fc.name,
                            response: { pets },
                          },
                        },
                      ],
                    }
                  );
                }
              }

              response = await ai.models.generateContent({
                model: GEMINI_MODEL,
                contents,
                config: {
                  systemInstruction: SYSTEM_PROMPT,
                  tools: [{ functionDeclarations: [SEARCH_PETS_TOOL] }],
                },
              });
            } else {
              const text = response.text;
              if (text) {
                controller.enqueue(
                  encoder.encode(JSON.stringify({ type: 'text', content: text }) + '\n')
                );
              }
              break;
            }

            maxIterations--;
          }

          controller.enqueue(encoder.encode(JSON.stringify({ type: 'done' }) + '\n'));
          controller.close();
        } catch (err) {
          console.error('Chat stream error:', err);
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: 'text',
                content: `I'm sorry, I encountered an error: ${errorMessage}. Please try again or contact our support team.`,
              }) + '\n'
            )
          );
          controller.enqueue(encoder.encode(JSON.stringify({ type: 'done' }) + '\n'));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (err) {
    console.error('Chat API error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
