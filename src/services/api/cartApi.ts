import { post } from "../apiMethods";

export async function addToCart(body: {
  cartItem: { userId: string; nftId: string; quantity: number };
}) {
  return post(`/api/cart`, body);
}
