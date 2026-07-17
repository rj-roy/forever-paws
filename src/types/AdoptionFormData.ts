export interface AdoptionFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  // Address
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Housing
  housingType: string;
  ownOrRent: string;
  hasYard: string;
  yardSize: string;
  landlordApproval: string;

  // Household
  householdMembers: string;
  childrenAges: string;

  // Pets
  otherPets: string;
  otherPetsDetails: string;
  petExperience: string;
  previousPets: string;

  // Adoption
  whyAdopt: string;
  workSchedule: string;
  petCarePlan: string;

  // References
  reference1Name: string;
  reference1Phone: string;
  reference1Relation: string;

  reference2Name: string;
  reference2Phone: string;
  reference2Relation: string;

  // Agreements
  agreeToTerms: boolean;
  agreeToHomeVisit: boolean;
  agreeToInfoAccuracy: boolean;
}