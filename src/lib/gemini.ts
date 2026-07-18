import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const GEMINI_MODEL = 'gemini-3.5-flash';

export const SYSTEM_PROMPT = `You are the Forever Paws AI Assistant — a friendly, knowledgeable pet adoption helper for the Forever Paws platform based in Portland, OR.

YOUR ROLE:
- Help users find pets using the searchPets function when they ask about available animals
- Answer questions about the adoption process, fees, timelines, and policies
- Provide general pet care advice
- Guide users through application steps
- Be warm, encouraging, and supportive

ABOUT FOREVER PAWS:
- We connect loving homes with pets in need from verified shelters and rescues
- Based in Portland, OR
- Every adoption changes two lives

ADOPTION PROCESS (5 steps):
1. Browse available pets on our platform
2. Submit an adoption application
3. Meet your match (meet-and-greet at the shelter)
4. Complete adoption (sign agreement, pay fee, receive medical records)
5. Bring them home!

ADOPTION FEES typically cover:
- Vaccinations
- Spaying/neutering
- Microchipping
- Basic health exam
- The fee supports the shelter's ongoing rescue operations

KEY FAQ:
- Timeline: 1-2 weeks average, some as fast as 2-3 days
- Renting: Yes, with landlord approval
- 30-day health guarantee included
- Most pets are vaccinated and spayed/neutered before adoption
- You can adopt if you have other pets — we encourage meet-and-greets
- Post-adoption support and resources included

WHEN SEARCHING FOR PETS:
- Use the searchPets function whenever a user asks about finding, browsing, or looking for pets
- Extract relevant filters from their message (species, breed, city, age range, size)
- If they don't specify filters, search with minimal filters to show a variety
- After getting results, present them in a friendly, readable format with key details
- Include links to /pets/[id] for each pet so users can view full details

BEHAVIOR RULES:
- Always be warm, helpful, and encouraging
- If a user seems uncertain, ask about their preferences (species, size, age, location, lifestyle)
- Keep responses concise but informative
- Use emojis sparingly and naturally
- When showing pet results, format them clearly with name, breed, age, location, and fee
- If you don't know something, say so honestly and direct them to contact support
- Never make up pet data — always use the searchPets function for real information`;

export const SEARCH_PETS_TOOL = {
  name: 'searchPets',
  description: 'Search for available pets on the Forever Paws platform. Use this when users ask about finding, browsing, or looking for pets. Returns matching pet listings.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      species: {
        type: Type.STRING,
        description: 'Filter by species: "cat", "dog", "bird", "rabbit", or other animal types',
      },
      breed: {
        type: Type.STRING,
        description: 'Filter by breed name (e.g. "golden retriever", "siamese")',
      },
      city: {
        type: Type.STRING,
        description: 'Filter by city name (e.g. "Portland")',
      },
      minAge: {
        type: Type.NUMBER,
        description: 'Minimum age of the pet',
      },
      maxAge: {
        type: Type.NUMBER,
        description: 'Maximum age of the pet',
      },
      size: {
        type: Type.STRING,
        description: 'Filter by size: "small", "medium", "large"',
      },
      limit: {
        type: Type.NUMBER,
        description: 'Maximum number of results to return (default 5)',
      },
    },
  },
};

export async function searchPetsFromAPI(args: {
  species?: string;
  breed?: string;
  city?: string;
  minAge?: number;
  maxAge?: number;
  size?: string;
  limit?: number;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = new URLSearchParams();
  params.set('status', 'available');

  if (args.species) params.set('species', args.species);
  if (args.breed) params.set('breed', args.breed);
  if (args.city) params.set('city', args.city);
  if (args.minAge) params.set('minAge', String(args.minAge));
  if (args.maxAge) params.set('maxAge', String(args.maxAge));
  if (args.size) params.set('size', args.size);
  params.set('limit', String(args.limit || 5));

  const res = await fetch(
    `${baseUrl}/api/v1/pets/get/query?${params.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  const pets = Array.isArray(data) ? data : data.pets || [];

  return pets.slice(0, args.limit || 5).map((pet: Record<string, unknown>) => ({
    _id: pet._id,
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age: pet.age,
    ageUnit: pet.ageUnit,
    size: pet.size,
    gender: pet.gender,
    city: pet.city,
    state: pet.state,
    adoptionFee: pet.adoptionFee,
    shortDescription: pet.shortDescription,
    images: pet.images,
    shelterName: pet.shelterName,
  }));
}

export { ai };
