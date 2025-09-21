"use client";

import BuyNFTSection from "@/app/components/BuyNFTSection";
import Loader from "@/app/components/ui/Loader";
import { useNfts } from "@/custom-hooks/queries";
import { useAppContext } from "@/custom-hooks/useAppContext";
import { NFTWithType } from "@/types/nft";
import { SELECT_NFT } from "@/utils/constants";
import { useParams, notFound } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function BuyLotteryForm() {
  const { dispatch } = useAppContext();
  const params = useParams();
  const rawNftTitle = params?.nftTitle as string;
  const decodedNftTitle = decodeURIComponent(rawNftTitle || "");

  const { data: nfts, isLoading, isError } = useNfts();

  // Always call hooks first - no conditional hook calls
  const currentNft = useMemo(() => {
    if (!nfts?.data?.length) return null;
    return (
      nfts.data.find((nft: NFTWithType) => nft.title === decodedNftTitle) ||
      null
    );
  }, [nfts?.data, decodedNftTitle]);

  useEffect(() => {
    if (currentNft) {
      dispatch({
        actionType: SELECT_NFT,
        value: currentNft,
      });
    }
  }, [dispatch, currentNft]);

  // Loading state
  if (isLoading) {
    return <Loader className="mx-auto my-auto flex justify-center" />;
  }

  // Error state or no NFTs
  if (isError || !nfts?.data?.length) {
    return (
      <div className="mx-auto w-full my-auto text-center">
        {isError
          ? "Something went wrong while loading NFTs!"
          : "No NFTs available right now."}
      </div>
    );
  }

  // Invalid NFT title
  if (!currentNft) return notFound();

  return <BuyNFTSection nfts={nfts.data} />;
}
