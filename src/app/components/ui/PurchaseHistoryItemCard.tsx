// PurchaseHistoryItemCard.tsx
"use client";

import Image from "next/image";
import React from "react";

export interface PurchaseItem {
  id: string;
  purchasedAt: string;
  totalAmount: string;
  items: Array<{
    id: string;
    quantity: number;
    nft: {
      id: string;
      title: string;
      imageUrl: string;
      type: {
        name: string;
      };
    };
  }>;
}

export interface PurchaseItemCardProps {
  purchase: PurchaseItem;
}

const PurchaseHistoryItemCard: React.FC<PurchaseItemCardProps> = ({
  purchase,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Assuming each purchase has at least one item
  const firstItem = purchase.items[0];
  const totalItems = purchase.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto flex gap-4 sm:gap-12 items-start w-full">
      <div className="relative w-36 h-36 overflow-hidden shadow-lg flex flex-col gap-4 shrink-0">
        <Image
          src={firstItem.nft.imageUrl}
          alt={firstItem.nft.title}
          className="rounded-md object-cover transition-opacity duration-500"
          layout="fill"
        />
      </div>

      <div className="flex flex-col gap-1 sm:gap-2">
        <h2 className="text-xl font-bold font-josef tracking-tight">
          {firstItem.nft.title}
        </h2>
        <p className="text-link text-sm leading-relaxed">
          {formatDate(purchase.purchasedAt)}
        </p>
        <div className="space-y-3">
          <label className="block text-sm font-medium">
            Quantity: {totalItems}
          </label>
        </div>

        <div className="text-lg font-semibold text-brand-br1">
          ${purchase.totalAmount}
          <span> USD</span>
        </div>

        {purchase.items.length > 1 && (
          <p className="text-sm text-gray-500">
            + {purchase.items.length - 1} more item
            {purchase.items.length > 2 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistoryItemCard;
