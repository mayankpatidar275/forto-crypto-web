"use client";

import { NFTWithType } from "@/types/nft";
import NftContentSection from "./NftContentSection";
import NftImagesSection from "./NftImagesSection";

export default function BuyNFTSection({ nfts }: { nfts: NFTWithType[] }) {
  // const mintFreeNftMutation = useMintFreeNft();

  // const storeUserMutation = useStoreUser();

  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <NftImagesSection nfts={nfts} />
        <NftContentSection />
      </div>
    </section>
  );
}
