import { NFTType } from "@prisma/client";

export interface NFTWithType {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  price: number;
  currency: Currency;
  available: boolean;
  createdAt: Date;
  type: NFTType;
}

export interface NFTWithIdAndImage {
  nftId: string | null;
  nftImageUrl: string | null;
  nftTitle: string | null;
}

export interface NFTResponse {
  success: boolean;
  data: NFTWithType[];
  //   pagination: {
  //     total: number;
  //     page: number;
  //     limit: number;
  //     totalPages: number;
  //   };
}
