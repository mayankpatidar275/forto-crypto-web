"use client";

import CrystalCard from "./ui/CrystalCard";
import Heading2 from "./ui/Heading2";
import { NFTWithType, SelectedNftType } from "@/types/nft";
import Link from "next/link";
import Loader from "./ui/Loader";
import { useNfts } from "@/custom-hooks/queries";
import { SELECT_NFT } from "@/utils/constants";
import { useAppContext } from "@/custom-hooks/useAppContext";
// import { CrystalCardSkeleton } from "./ui/CrystalCardSkeleton";

const GetNowSection = () => {
  const {
    data: nfts,
    isLoading: isLoadingNfts,
    error: errorLoadingNfts,
  } = useNfts();

  const { dispatch } = useAppContext();

  function handleNftClick(nft: SelectedNftType) {
    dispatch({
      actionType: SELECT_NFT,
      value: nft,
    });
  }

  if (isLoadingNfts) {
    return <Loader className="mx-auto my-auto flex justify-center" />;
  }
  if (errorLoadingNfts)
    return <div className="cp-x cp-y text-center">Something went wrong!</div>;

  return (
    <section className="cp-x cp-y flex justify-center" id="get-now">
      <div className="max-w-6xl w-full">
        <div className="block-heading px-6 text-center flex flex-col items-center">
          <Heading2>Get your unique NFT ticket now</Heading2>
          {/* <div className="mt-4">
            <label htmlFor="currency" className="mr-2">
              Currency:
            </label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as "USD" | "FORTO")}
              className="px-3 py-1 border rounded"
            >
              <option value="USD">USD</option>
              <option value="FORTO">FORTO</option>
            </select>
          </div> */}
        </div>
        <div className="flex flex-wrap justify-center gap-8 px-4 mt-8">
          {nfts.data.map((nft: NFTWithType) => (
            <div key={nft.id} className="w-36">
              <Link
                onClick={() => {
                  handleNftClick(nft);
                }}
                href={{
                  pathname: `/buy-nfts/${nft.title}`,
                }}
                className="block"
              >
                <CrystalCard nft={nft} />
              </Link>
            </div>
            // <CrystalCard key={nft.id} nft={nft} currency={currency} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetNowSection;
