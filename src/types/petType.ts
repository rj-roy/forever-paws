export interface Pet {
  _id: string;
  shelterId?: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  ageUnit?: string;
  size: string;
  weight?: number;
  gender?: string;
  shortDescription: string;
  fullDescription: string;
  temperamentTags: string[];
  vaccinated: boolean;
  spayedNeutered: boolean;
  microchipped?: boolean;
  healthCertificate?: boolean;
  healthNotes?: string;
  adoptionFee: number;
  city: string;
  state?: string;
  shelterName?: string;
  contactEmail?: string;
  contactPhone?: string;
  images: string[];
  status: 'available' | 'pending-adoption' | 'adopted' | 'pending-approval' | 'rejected';
  avgRating?: number;
  reviewCount?: number;
  applications?: number;
  views?: number;
  postedDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RelatedPet {
  id: string;
  name: string;
  breed: string;
  age: number;
  ageUnit?: string;
  adoptionFee: number;
  city: string;
  state?: string;
  images: string[];
}
