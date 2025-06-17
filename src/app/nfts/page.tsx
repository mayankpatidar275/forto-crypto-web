"use client";
import BuyNFTSection from "@/app/components/BuyNFTSection";
import { useSearchParams } from "next/navigation";

export default function BuyLotteryForm() {
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
