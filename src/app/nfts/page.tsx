"use client";
import BuyNFTSection from "@/app/components/BuyNFTSection";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BuyLotteryFormContent() {
  const searchParams = useSearchParams();
  const nftId = searchParams.get("nftId");
  const nftImageUrl = searchParams.get("nftImageUrl");
  const nftTitle = searchParams.get("nftTitle");

  const nft = {
    nftId,
    nftImageUrl,
    nftTitle,
  };

  return <BuyNFTSection {...nft} />;
}

export default function BuyLotteryForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuyLotteryFormContent />
    </Suspense>
  );
}
