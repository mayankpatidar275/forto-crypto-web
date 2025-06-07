import { get } from "../apiMethods";

export async function fetchNftById(nftId?: string) {
  return get(`/api/nfts/${nftId}`);
}
