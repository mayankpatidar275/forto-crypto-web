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
export async function fetchNftsByEventName(eventName?: string) {
  return get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/nfts?eventName=${eventName}`
  );
}

export async function buyNft(body: {
  userPublicAddress: string;
  items: Array<{ nftId: string; quantity: number }>;
  privyId: string;
}) {
  return post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/mintNft`, body);
}

export async function participate(body: {
  eventId: string;
  brandId: string;
  drawId: string;
  // fullName: string;
  firstName: string;
  lastName: string;
  gender: string;
  shoppingWebsite: string;
  email: string;
  phone: string;
  purchasedBefore: boolean;
  token: string | null;
}) {
  return post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/participate`,
    body
  );
}

export async function fetchEventById(eventId?: string) {
  return get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/events/${eventId}`);
}
