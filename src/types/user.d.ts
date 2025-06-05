import { User as PrivyUser } from "@privy-io/react-auth";

export interface UserType {
  privyId: string;
  walletAddress: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserPayload {
  user: PrivyUser | UserType;
}
