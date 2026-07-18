export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: ChatRole;
  content: string;
  pets?: InlinePet[];
}

export interface InlinePet {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  ageUnit?: string;
  size: string;
  gender?: string;
  city: string;
  state?: string;
  adoptionFee: number;
  shortDescription: string;
  images: string[];
  shelterName?: string;
}

export interface ChatStreamChunk {
  type: 'text' | 'function_call' | 'pets' | 'done';
  content?: string;
  pets?: InlinePet[];
}
