"use client";

import BuyNFTSection from "@/app/components/BuyNFTSection";
import Loader from "@/app/components/ui/Loader";
import { useNfts } from "@/custom-hooks/queries";
import { useAppContext } from "@/custom-hooks/useAppContext";
import { NFTWithType } from "@/types/nft";
import { SELECT_NFT } from "@/utils/constants";
import { useParams, notFound } from "next/navigation";
import { useEffect } from "react";

export default function BuyLotteryForm() {
  const params = useParams();
  const rawNftTitle = params?.nftTitle as string;
  const decodedNftTitle = decodeURIComponent(rawNftTitle || "");

  const { dispatch } = useAppContext();
  const {
    data: nfts,
    isLoading: isLoadingNfts,
    isError: errorLoadingNfts,
  } = useNfts();

  useEffect(() => {
    if (!nfts) return;

    const currentNft = nfts.data.find(
      (nft: NFTWithType) => nft.title === decodedNftTitle
    );

    if (currentNft) {
      dispatch({
        actionType: SELECT_NFT,
        value: currentNft,
      });
    }
  }, [dispatch, decodedNftTitle, nfts]);

  if (isLoadingNfts) {
    return <Loader className="mx-auto my-auto flex justify-center" />;
  }

  if (errorLoadingNfts) {
    return (
      <div className="mx-auto w-full my-auto text-center">
        Something went wrong while loading NFTs!
      </div>
    );
  }

  const isNftValid = nfts?.data.some(
    (nft: NFTWithType) => nft.title === decodedNftTitle
  );
  if (!isNftValid) return notFound();

  return <BuyNFTSection nfts={nfts.data} />;
}
