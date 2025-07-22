import React from "react";

const purchases = [
  { id: 1, item: "Forto Ticket #1234", date: "2025-07-18", price: "$10" },
  { id: 2, item: "Tokenomics Access", date: "2025-07-15", price: "$20" },
];

const PurchaseHistory = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Purchase History</h3>
      <ul className="divide-y divide-gray-200">
        {purchases.map((purchase) => (
          <li key={purchase.id} className="py-3 flex justify-between">
            <span>{purchase.item}</span>
            <span className="text-sm text-gray-500">
              {purchase.date} - {purchase.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseHistory;
