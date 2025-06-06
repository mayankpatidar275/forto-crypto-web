"use client";

import CrystalCard from "./ui/CrystalCard";
import Heading2 from "./ui/Heading2";
import { useState, useEffect } from "react";
import { NFTWithType } from "@/types/nft";
import Link from "next/link";
// import { CrystalCardSkeleton } from "./ui/CrystalCardSkeleton";

const GetNowSection = () => {
  const [nfts, setNfts] = useState<NFTWithType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [currency, setCurrency] = useState<"USD" | "FORTO">("USD");

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        // const response = await fetch(`/api/nfts?currency=${currency}&limit=6`);
        const response = await fetch(`/api/nfts`);
        console.log("res: ", response);
        const data = await response.json();

        if (data.success) {
          setNfts(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch NFTs");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
    // }, [currency]);
  }, []);

  // Then use in GetNowSection while loading:
  // {
  //   loading &&
  //     Array(6)
  //       .fill(0)
  //       .map((_, i) => <CrystalCardSkeleton key={i} />);
  // }
  // In GetNowSection.tsx
  if (error)
    return (
      <div className="cp-x cp-y text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
          }}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  return (
    <section className="cp-x cp-y flex justify-center">
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
        <div className="flex flex-wrap justify-center gap-8 px-6 mt-8">
          {nfts.map((nft) => (
            <div key={nft.id} className="w-32">
              <Link
                href={{
                  pathname: `/nfts`,
                  query: { nftId: nft.id, nftImageUrl: nft.imageUrl },
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
