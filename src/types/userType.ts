export interface UserType {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  profileImage: string;
  phone?: number | null;
  bio?: string | null;
  city?: string | null;
  state?: string | null;
}
