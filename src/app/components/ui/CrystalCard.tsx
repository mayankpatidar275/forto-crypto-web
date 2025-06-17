"use client";

import React from "react";
import { NFTWithType } from "@/types/nft";
import Image from "next/image";

interface CrystalCardProps {
  nft: NFTWithType;
  // currency: "USD" | "FORTO" | "ETH" | "SOL";
}

const CrystalCard: React.FC<CrystalCardProps> = ({ nft }) => {
  // const convertAndFormatPrice = (price: number, from: string, to: string) => {
  //   // Simplified conversion - in a real app, use the utility we created earlier
  //   const conversionRates = {
  //     USD: 1,
  //     FORTO: 0.25,
  //     ETH: 3000,
  //     SOL: 100,
  //   };
  //   const converted = (price * conversionRates[from]) / conversionRates[to];
  //   return (
  //     converted.toLocaleString("en-US", {
  //       style: "currency",
  //       currency: to === "FORTO" ? "USD" : to,
  //       minimumFractionDigits: 2,
  //       maximumFractionDigits: to === "ETH" ? 4 : 2,
  //     }) + (to === "FORTO" ? " FORTO" : "")
  //   );
  // };

  return (
    <div className="nft-card-item flex flex-col justify-center items-center gap-2">
      <Image
        src={nft.imageUrl}
        alt={nft.title}
        className="nft-preview-image w-full h-auto object-cover rounded-lg shadow-lg"
        loading="lazy"
        width={500}
        height={288}
      />
      <div className="text-center">
        <h3 className="font-bold">{nft.title}</h3>
        {/* <p className="text-sm text-gray-600">{nft.description}</p> */}
        {/* <p className="font-bold"></p>
        {!nft.available && (
          <span className="text-xs text-red-500">Sold Out</span>
        )} */}
      </div>
    </div>
  );
};

export default CrystalCard;
