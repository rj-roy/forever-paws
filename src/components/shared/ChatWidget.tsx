'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { PawPrint, X, MessageCircle, Minus } from 'lucide-react';
import type { ChatMessage, InlinePet } from '@/types/chat';
import ChatMessageComponent from '@/components/pages/chat/ChatMessage';
import ChatInput from '@/components/pages/chat/ChatInput';

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    "Hi there! I'm the Forever Paws assistant. I can help you find your perfect pet companion, answer questions about adoption, or guide you through the process. What would you like to know?",
};

interface ChatWidgetProps {
  fullPage?: boolean;
}

export default function ChatWidget({ fullPage = false }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(fullPage);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: ChatMessage = { role: 'user', content };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        abortRef.current = new AbortController();
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
          signal: abortRef.current.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error('Failed to get response');
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let assistantText = '';
        let assistantPets: InlinePet[] = [];
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const chunk = JSON.parse(line);

              if (chunk.type === 'text' && chunk.content) {
                assistantText += chunk.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastMsg = updated[updated.length - 1];
                  if (lastMsg?.role === 'assistant') {
                    updated[updated.length - 1] = {
                      ...lastMsg,
                      content: assistantText,
                      pets: assistantPets.length > 0 ? assistantPets : undefined,
                    };
                  } else {
                    updated.push({
                      role: 'assistant',
                      content: assistantText,
                      pets: assistantPets.length > 0 ? assistantPets : undefined,
                    });
                  }
                  return updated;
                });
              } else if (chunk.type === 'pets' && chunk.pets) {
                assistantPets = chunk.pets;
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastMsg = updated[updated.length - 1];
                  if (lastMsg?.role === 'assistant') {
                    updated[updated.length - 1] = {
                      ...lastMsg,
                      pets: assistantPets,
                    };
                  }
                  return updated;
                });
              } else if (chunk.type === 'done') {
                break;
              }
            } catch {
              // skip malformed JSON lines
            }
          }
        }

        if (!assistantText && assistantPets.length === 0) {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: "I'm sorry, I couldn't generate a response. Please try again.",
            },
          ]);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        console.error('Chat error:', err);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "I'm having trouble connecting. Please try again in a moment.",
          },
        ]);
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [messages]
  );

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  if (fullPage) {
    return (
      <div className="flex flex-col h-[70dvh] max-w-3xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <PawPrint size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Forever Paws Assistant</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ask me about pets, adoption, or anything else</p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="text-xs text-gray-500 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Clear chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg, i) => (
            <ChatMessageComponent key={i} message={msg} />
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                <PawPrint size={16} className="text-primary" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    );
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setIsMinimized(false); }}
          className="fixed bottom-33 right-6 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
          aria-label="Open chat assistant"
        >
          <MessageCircle size={26} className="group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-tertiary rounded-full border-2 border-white dark:border-gray-900" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
            isMinimized
              ? 'bottom-6 right-6 w-80 h-14'
              : 'bottom-6 right-6 w-96 h-[500px] max-sm:inset-0 max-sm:w-full max-sm:h-full max-sm:rounded-none'
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between bg-primary text-white px-4 transition-all ${
              isMinimized ? 'h-14' : 'py-3'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <PawPrint size={18} />
              </div>
              {!isMinimized && (
                <div>
                  <h3 className="font-semibold text-sm">Forever Paws Assistant</h3>
                  <p className="text-xs text-white/70">Online</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Minimize"
              >
                <Minus size={18} />
              </button>
              <button
                onClick={() => { setIsOpen(false); setIsMinimized(false); }}
                className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((msg, i) => (
                  <ChatMessageComponent key={i} message={msg} />
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <PawPrint size={16} className="text-primary" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <ChatInput onSend={sendMessage} disabled={isLoading} />
            </>
          )}
        </div>
      )}
    </>
  );
}
