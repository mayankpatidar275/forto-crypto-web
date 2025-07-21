import { del, get, post } from "../apiMethods";

export async function addToCart(body: {
  cartItem: { userId: string; nftId: string; quantity: number };
}) {
  return post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cart`, body);
}

export async function fetchCart(userPrivyId?: string) {
  return get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cart?userPrivyId=${userPrivyId}`
  );
}

export async function removeFromCart(cartItemId: string) {
  return del(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/cart/cart-items/${cartItemId}`
  );
}
