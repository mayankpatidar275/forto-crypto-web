// PurchaseHistoryItemCard.tsx
"use client";

import Image from "next/image";
import React from "react";

export interface PurchaseItem {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  nft: {
    id: string;
    title: string;
    imageUrl: string;
    type: {
      name: string;
    };
  };
}

export interface PurchaseItemCardProps {
  item: PurchaseItem;
  purchaseDate: string;
}

const PurchaseHistoryItemCard: React.FC<PurchaseItemCardProps> = ({
  item,
  purchaseDate,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-md bg-background-b3">
      <div className="relative w-20 h-20 overflow-hidden rounded-md shrink-0">
        <Image
          src={item.nft.imageUrl}
          alt={item.nft.title}
          className="object-cover"
          layout="fill"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">{item.nft.title}</h3>
        <p className="text-sm text-link">{item.nft.type.name}</p>
        <p className="text-xs text-link">
          Purchased: {formatDate(purchaseDate)}
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm text-link">Qty: {item.quantity}</p>
        <p className="text-md font-semibold text-brand-br1">
          {(item.priceAtPurchase * item.quantity).toFixed(2)}
        </p>
        <p className="text-xs text-link">{item.priceAtPurchase} each</p>
      </div>
    </div>
  );
};

export default PurchaseHistoryItemCard;
