import { del, get, post } from "../apiMethods";

export async function addToCart(body: {
  cartItem: { userId: string; nftId: string; quantity: number };
}) {
  return post(`/api/cart`, body);
}

export async function fetchCart(userPrivyId?: string) {
  return get(`/api/cart?userPrivyId=${userPrivyId}`);
}

export async function removeFromCart(cartItemId: string) {
  return del(`/api/cart/cart-items/${cartItemId}`);
}
