"use client";

import { useRemoveFromCart } from "@/custom-hooks/mutations";
import { useNftById } from "@/custom-hooks/queries";
import Image from "next/image";
import React from "react";

export interface CartItemCardProps {
  addedAt: string;
  cartId: string;
  id: string;
  nftId: string;
  quantity: number;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ id, nftId, quantity }) => {
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
    <div className="max-w-6xl mx-auto flex gap-4 sm:gap-12 items-start">
      <div className="relative w-36 h-36 overflow-hidden shadow-lg flex flex-col gap-4 shrink-0">
        <Image
          src={nft.imageUrl}
          alt="Forto NFT Ticket"
          className={`rounded-md object-cover transition-opacity duration-500`}
          layout="fill"
          // width={150}
          // height={150}
        />
      </div>

      <div className="flex flex-col gap-1 sm:gap-2">
        <h2 className="text-xl sm:text-3xl font-bold font-josef tracking-tight">
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
          {/* <span className="text-white">Cost: </span> */}
          {nft.price * quantity + " "}
          <span>{nft.currency}</span>
        </div>

        <div className="flex justify-between">
          <div className="h-12">
            <button
              onClick={handleRemove}
              //   disabled={loading}
              className="btn-secondary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
