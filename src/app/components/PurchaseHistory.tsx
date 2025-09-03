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

  return (
    <div className="bg-background-b3 shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6">Purchase History</h3>
      <div className="flex flex-col gap-8">
        {purchases.length === 0 ? (
          <EmptyState message="No purchase history found." />
        ) : (
          purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="rounded-lg p-6 bg-background shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold">
                    Order #{purchase.id.slice(-6)}
                  </h4>
                  <p className="text-sm text-link">
                    Purchased on{" "}
                    {new Date(purchase.purchasedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-brand-br1">
                    ${purchase.totalAmount} USD
                  </p>
                  {purchase.txHash && (
                    <p className="text-xs text-gray-400">
                      TX: {purchase.txHash.slice(0, 8)}...
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {purchase.items.map((item: PurchaseItem) => (
                  <PurchaseHistoryItemCard
                    key={item.id}
                    item={item}
                    purchaseDate={purchase.purchasedAt}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
