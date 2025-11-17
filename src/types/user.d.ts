import { User as ClerkUser } from "@clerk/nextjs";

export interface UserType {
  privyId: string;
  walletAddress?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserPayload {
  user: ClerkUser | UserType;
}
