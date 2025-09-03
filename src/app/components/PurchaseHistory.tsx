"use client";

// PurchaseHistory.tsx
import React from "react";
import { EmptyState } from "./ui/EmptyState";
import PurchaseHistoryItemCard, {
  PurchaseItem,
} from "./ui/PurchaseHistoryItemCard";
import { usePurchaseHistory } from "@/custom-hooks/queries";
import { useAppContext } from "@/custom-hooks/useAppContext";
import Loader from "./ui/Loader";
import { ErrorState } from "./ui/ErrorState";

const PurchaseHistory = () => {
  const { state } = useAppContext();
  const {
    data: purchaseHistory,
    isLoading,
    error,
  } = usePurchaseHistory(state?.userPrivyId);

  if (isLoading) {
    return <Loader className="mx-auto my-auto flex justify-center" />;
  }

  if (error || !purchaseHistory?.success) {
    return (
      <ErrorState message="Failed to load purchase history. Please try again later." />
    );
  }

  const purchases = purchaseHistory.data || [];

  console.log("purchases: ", purchases);

  return (
    <div className="bg-background-b3 shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6">Purchase History</h3>
      <div className="flex flex-col gap-8">
        {purchases.length === 0 ? (
          <EmptyState message="No purchase history found." />
        ) : (
          purchases.map((purchase: PurchaseItem) => (
            <PurchaseHistoryItemCard key={purchase.id} purchase={purchase} />
          ))
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
