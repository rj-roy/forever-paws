export interface AdoptionApplication {
    _id: string;
    petId: string;
    petName: string;
    petImage: string;
    applicant: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
    };
    housing: {
        type: string;
        ownership: string;
        hasYard: string;
    };
    household: {
        membersCount: string;
        childrenAges: string;
        hasOtherPets: boolean;
        otherPetsDetails: string;
    };
    experience: {
        previousPets: string;
        whyAdopt: string;
    };
    status: 'pending' | 'interview_scheduled' | 'approved' | 'rejected';
    createdAt: string;
}