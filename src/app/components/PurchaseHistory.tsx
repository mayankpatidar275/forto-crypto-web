import React from "react";
import { EmptyState } from "./ui/EmptyState";
import PurchaseHistoryItemCard from "./ui/PurchaseHistoryItemCard";

const purchases = [
  {
    id: "1",
    item: "Crocodildo Penisini",
    date: "2025-07-18",
    price: "$100",
    image:
      "https://forto-assets.s3.ap-south-1.amazonaws.com/nfts/italian-brainrot/02_Bobritto+Bandito.jpg",
  },
  {
    id: "2",
    item: "Boombardilo Krokodilo",
    date: "2025-07-15",
    price: "$100",
    image:
      "https://forto-assets.s3.ap-south-1.amazonaws.com/nfts/italian-brainrot/02_Bobritto+Bandito.jpg",
  },
];

const PurchaseHistory = () => {
  return (
    <div className="bg-background-b3 shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6">Purchase History</h3>
      <div className="flex flex-col gap-8">
        {purchases.length === 0 ? (
          <EmptyState message="Your cart is empty." />
        ) : (
          purchases.map((item) => (
            <PurchaseHistoryItemCard key={item.id} {...item} />
          ))
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
