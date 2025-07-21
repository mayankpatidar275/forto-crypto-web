import { get } from "../apiMethods";

export async function fetchNftById(nftId?: string) {
  return get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/nfts/${nftId}`);
}

export async function fetchNfts() {
  return get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/nfts`);
}
