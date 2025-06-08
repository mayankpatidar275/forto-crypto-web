import { get } from "../apiMethods";

export async function fetchNftById(nftId?: string) {
  return get(`/api/nfts/${nftId}`);
}

export async function fetchNfts() {
  return get(`/api/nfts`);
}
