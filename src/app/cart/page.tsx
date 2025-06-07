"use client";

import { useCart } from "@/custom-hooks/queries";
import { usePrivy } from "@privy-io/react-auth";
import React from "react";
import CartItemCard from "../components/ui/CartItemCard";

const CartPage = () => {
  const { user } = usePrivy();
  const userId = user?.id;

  // Only call useCart if userId exists
  const { data: myCart, isLoading, error } = useCart(userId || "");

  if (!userId) {
    return <div>Please log in to view your cart.</div>;
  }

  if (isLoading) {
    return <div>Loading your cart...</div>;
  }

  if (error || !myCart?.success) {
    return <div>Failed to load your cart. Please try again later.</div>;
  }

  return (
    <div>
      {myCart.data.items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        myCart.data.items.map(
          (item: {
            addedAt: string;
            cartId: string;
            id: string;
            nftId: string;
            quantity: number;
          }) => <CartItemCard key={item.id} {...item} />
        )
      )}
      <div></div>
    </div>
  );
};

export default CartPage;
