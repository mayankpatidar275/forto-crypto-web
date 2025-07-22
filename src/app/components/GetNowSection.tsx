"use client";

import Heading2 from "./ui/Heading2";
import NFTCardLink from "./ui/NFTCardLink";
import Loader from "./ui/Loader";
import { NFTWithType, SelectedNftType } from "@/types/nft";
import { useAppContext } from "@/custom-hooks/useAppContext";
import { SELECT_NFT } from "@/utils/constants";
import { ErrorState } from "./ui/ErrorState";
import { EmptyState } from "./ui/EmptyState";
import { useNftsByCategory } from "@/custom-hooks/queries";

interface GetNowSectionProps {
  category: string;
  heading: string;
}

const GetNowSection = ({ category, heading }: GetNowSectionProps) => {
  const { dispatch } = useAppContext();

  const { data: nfts, isLoading, error } = useNftsByCategory(category);

  const handleNftClick = (nft: SelectedNftType) => {
    dispatch({ actionType: SELECT_NFT, value: nft });
  };

  if (isLoading) {
    return <Loader className="mx-auto my-auto flex justify-center" />;
  }

  if (error) {
    return (
      <ErrorState message="Failed to load NFTs. Please try again later." />
    );
  }

  if (!nfts?.data || nfts.data.length === 0) {
    return (
      <EmptyState message="No NFTs available in this category. Check back soon!" />
    );
  }

  return (
    <section className="cp-x cp-y flex justify-center" id="get-now">
      <div className="max-w-6xl w-full">
        <div className="block-heading px-6 text-center flex flex-col items-center">
          <Heading2>{heading}</Heading2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 px-4 mt-8">
          {nfts.data.map((nft: NFTWithType) => (
            <NFTCardLink key={nft.id} nft={nft} onClick={handleNftClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetNowSection;
