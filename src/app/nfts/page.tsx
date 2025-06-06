"use client";
import BuyNFTSection from "@/app/components/BuyNFTSection";
import { useSearchParams } from "next/navigation";

export default function BuyLotteryForm() {
  const searchParams = useSearchParams();
  const nftId = searchParams.get("nftId");
  const nftImageUrl = searchParams.get("nftImageUrl");

  const nft = {
    nftId,
    nftImageUrl,
  };

  return <BuyNFTSection {...nft} />;
}
