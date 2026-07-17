export interface Pet {
  userId: string;
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
  status: 'available' | 'pending' | 'adopted';
}