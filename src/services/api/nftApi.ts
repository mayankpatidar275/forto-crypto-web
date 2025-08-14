import { get, post } from "../apiMethods";

export async function fetchNftById(nftId?: string) {
  return get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/nfts/${nftId}`);
}

export async function fetchNfts() {
  return get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/nfts`);
}

export async function fetchNftsByCategory(category?: string) {
  return get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/nfts?category=${category}`
  );
}

export async function buyNft(body: {
  userPublicAddress: string;
  nftName: string;
  description: string;
  eventName: string;
}) {
  return post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/mintNft`, body);
}
