"use client";

import Image from "next/image";
import React from "react";

export interface PurchaseItemCardProps {
  id: string;
  item: string;
  date: string;
  price: string;
  image: string;
}

const PurchaseHistoryItemCard: React.FC<PurchaseItemCardProps> = ({
  id,
  item,
  date,
  price,
  image,
}) => {
  return (
    <div className="max-w-6xl mx-auto flex gap-4 sm:gap-12 items-start w-full">
      <div className="relative w-36 h-36 overflow-hidden shadow-lg flex flex-col gap-4 shrink-0">
        <Image
          src={image}
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
          {item}
        </h2>
        <p className="text-link text-sm leading-relaxed">
          {/* Every ticket you buy enters you into a decade-long sweepstakes. Stay
            patient, win big. */}
          {date}
          {id}
        </p>

        {/* <div className="text-brand-br1 font-semibold text-sm">
            <span className="text-white">Current Draw:</span>{" "}
            {getCurrentMonth()}
          </div> */}

        <div className="space-y-3">
          <label className="block text-sm font-medium">Quantity: 2</label>
        </div>

        <div className="text-lg font-semibold text-brand-br1">
          {/* <span className="text-white">Cost: </span> */}
          {price}
          <span> USD</span>
        </div>

        {/* <div className="flex justify-between">
          <div className="h-12">
            <button
              // onClick={handleRemove}
              //   disabled={loading}
              className="btn-secondary"
            >
              Delete
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PurchaseHistoryItemCard;
