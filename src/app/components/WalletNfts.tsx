"use client";

import React, { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { EmptyState } from "./ui/EmptyState";
import NFTItemCard from "./NFTItemCard";

interface NFT {
  id: string;
  name: string;
  image: string;
  mintAddress: string;
}

const WalletNFTs = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!publicKey) {
        setNfts([]);
        return;
      }

      setLoading(true);
      try {
        // Fetch token accounts owned by the wallet
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { programId: TOKEN_PROGRAM_ID }
        );

        const nftList: NFT[] = [];
        for (const account of tokenAccounts.value) {
          const tokenAmount = account.account.data.parsed.info.tokenAmount;
          // Check for NFTs (typically have amount of 1 and 0 decimals)
          if (tokenAmount.amount === "1" && tokenAmount.decimals === 0) {
            // In a real implementation, you'd fetch metadata from the NFT's mint address
            // This is a simplified version assuming metadata is accessible
            // You might need to integrate with Metaplex or another metadata standard
            nftList.push({
              id: account.pubkey.toBase58(),
              name: `NFT #${nftList.length + 1}`, // Placeholder, replace with actual metadata
              image:
                "https://forto-assets.s3.ap-south-1.amazonaws.com/nfts/italian-brainrot/02_Bobritto+Bandito.jpg", // Placeholder
              mintAddress: account.account.data.parsed.info.mint,
            });
          }
        }
        setNfts(nftList);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setNfts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [publicKey, connection]);

  return (
    <div className="bg-background-b3 shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6">Your Wallet NFTs</h3>
      <div className="flex flex-col gap-8">
        {!publicKey ? (
          <EmptyState message="Please connect your wallet to view NFTs." />
        ) : loading ? (
          <EmptyState message="Loading NFTs..." />
        ) : nfts.length === 0 ? (
          <EmptyState message="No NFTs found in your wallet." />
        ) : (
          nfts.map((nft) => (
            <NFTItemCard
              key={nft.id}
              id={nft.id}
              name={nft.name}
              image={nft.image}
              mintAddress={nft.mintAddress}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WalletNFTs;
