"use client";

import { useRemoveFromCart } from "@/custom-hooks/mutations";
import { useNftById } from "@/custom-hooks/queries";
import React from "react";

export interface CartItemCardProps {
  addedAt: string;
  cartId: string;
  id: string;
  nftId: string;
  quantity: number;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  addedAt,
  cartId,
  id,
  nftId,
  quantity,
}) => {
  const { data: response, isLoading, error } = useNftById(nftId);
  const nft = response?.data;

  const removeFromCartMutation = useRemoveFromCart();

  const handleRemove = () => {
    // Implement cart item removal logic here
    removeFromCartMutation.mutate(id);
    console.log("Removing item with id:", id);
  };

  //   const handleQuantityChange = (type: "inc" | "dec") => {
  //     // Implement quantity update logic here
  //     console.log("Change quantity", type, "for", id);
  //   };

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error || !nft)
    return <div className="text-red-500">Failed to load item.</div>;

  if (removeFromCartMutation.isPending) {
    return <div>Removing...</div>;
  }

  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="w-full overflow-hidden shadow-lg relative flex flex-col gap-4">
          <img
            src={nft.imageUrl}
            alt="Forto NFT Ticket"
            className={`w-full h-72 rounded-md object-cover transition-opacity duration-500`}
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold font-josef tracking-tight">
            {/* 1 FORTO */}
            {nft.title}
          </h2>
          <p className="text-link text-sm leading-relaxed">
            {/* Every ticket you buy enters you into a decade-long sweepstakes. Stay
            patient, win big. */}
            {nft.description}
          </p>

          {/* <div className="text-brand-br1 font-semibold text-sm">
            <span className="text-white">Current Draw:</span>{" "}
            {getCurrentMonth()}
          </div> */}

          <div className="space-y-3">
            <label className="block text-sm font-medium">
              Quantity: {quantity}
            </label>
          </div>

          <div className="text-lg font-semibold text-brand-br1">
            <span className="text-white">Cost: </span>
            {nft.price * quantity + " "}
            <span>{nft.currency}</span>
          </div>

          <div className="flex justify-between">
            <div className="h-12 w-62">
              <button
                onClick={handleRemove}
                //   disabled={loading}
                className="cursor-pointer inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
              >
                {"Remove"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartItemCard;
