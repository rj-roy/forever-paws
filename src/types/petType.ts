export interface Pet {
  _id: string;
  userId?: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  size: string;
  shortDescription: string;
  fullDescription: string;
  temperamentTags: string[];
  vaccinated: boolean;
  spayedNeutered: boolean;
  adoptionFee: number;
  city: string;
  images: string[];
  status: 'available' | 'pending-adoption' | 'adopted';
};

// types/pet.ts - Add these types
export interface Pet {
  _id: string;
  userId?: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  ageUnit: string;
  size: string;
  weight?: string;
  gender: string;
  shortDescription: string;
  fullDescription: string;
  temperamentTags: string[];
  vaccinated: boolean;
  spayedNeutered: boolean;
  microchipped: boolean;
  healthCertificate: boolean;
  adoptionFee: number;
  city: string;
  state: string;
  images: string[];
  status: 'available' | 'pending-adoption' | 'adopted';
  postedDate: string;
  shelter?: {
    name: string;
    rating: number;
    reviewCount: number;
    contactEmail: string;
  };
  views?: number;
  applications?: number;
}

export interface RelatedPet {
  id: string;
  name: string;
  breed: string;
  age: number;
  ageUnit: string;
  adoptionFee: number;
  city: string;
  state: string;
  images: string[];
}