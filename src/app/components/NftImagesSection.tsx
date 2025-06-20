import { useAppContext } from "@/custom-hooks/useAppContext";
import Image from "next/image";
import React, { useState } from "react";
import Loader from "./ui/Loader";
import { NFTWithType } from "@/types/nft";
import { SELECT_NFT } from "@/utils/constants";

const NftImagesSection = ({ nfts }: { nfts: NFTWithType[] }) => {
  const { state, dispatch } = useAppContext();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full overflow-hidden shadow-lg relative flex flex-col gap-4">
      {!imageLoaded && (
        <Loader className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}
      {state.selectedNft ? (
        <Image
          src={state.selectedNft?.imageUrl || "/fallback-image.jpg"}
          alt="Forto NFT Ticket"
          className={`w-full h-72 rounded-md object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          width={500}
          height={288}
          onLoadingComplete={() => setImageLoaded(true)}
          style={{ width: "100%", height: "18rem", objectFit: "contain" }}
          // unoptimized // remove this if you want Next.js optimization and host images locally or allow remote domains
        />
      ) : (
        <div>Failed to load NFT</div>
      )}
      <div className="flex justify-around gap-4">
        {nfts.map((item: NFTWithType, index: number) => (
          <div
            key={index}
            className={`cursor-pointer border-2 rounded-md ${
              state.selectedNft?.imageUrl === item.imageUrl
                ? "border-brand-br2"
                : "border-transparent"
            }`}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={150}
              height={50}
              priority
              className="cursor-pointer rounded-md hover:opacity-80 transition-opacity duration-300"
              onClick={() => {
                setImageLoaded(false);
                dispatch({
                  actionType: SELECT_NFT,
                  value: item,
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftImagesSection;
