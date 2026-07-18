export interface AdopterApplication {
  _id: string;
  petId: string;
  petName: string;
  petImage: string;
  petBreed: string;
  shelter: {
    name: string;
    id: string;
    logo?: string;
  };
  status: 'pending' | 'under_review' | 'approved' | 'interview_scheduled' | 'adopted' | 'rejected' | 'withdrawn';
  submittedAt: string;
  updatedAt: string;
  nextSteps?: string;
  message?: string;
  canArchive?: boolean;
}