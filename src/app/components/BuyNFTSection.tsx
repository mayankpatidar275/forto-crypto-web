"use client";

import { useEffect, useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import Loader from "@/app/components/ui/Loader";
import {
  useAddToCart,
  useMintFreeNft,
  useStoreUser,
} from "@/custom-hooks/mutations";
import { NFTWithIdAndImage, NFTWithType } from "@/types/nft";
import { useLogin } from "@privy-io/react-auth";
import Image from "next/image";
import { ethers } from "ethers";
import { connectToContract } from "@/utils/helper";

function getCurrentMonth(): string {
  const date = new Date();
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export default function BuyNFTSection(nft: {
  nftId: string | null;
  nftImageUrl: string | null;
}) {
  const [ticketCount, setTicketCount] = useState(1);
  //   const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nfts, setNfts] = useState<NFTWithType[]>([]);
  const [selectedNft, setSelectedNft] = useState<NFTWithIdAndImage>({
    nftId: nft.nftId,
    nftImageUrl: nft.nftImageUrl,
  });

  const { wallets } = useWallets();
  const { connectWallet } = usePrivy();
  const { ready, authenticated, user } = usePrivy();

  const mintFreeNftMutation = useMintFreeNft();
  const addToCartMutation = useAddToCart();
  const storeUserMutation = useStoreUser();

  const { login } = useLogin({
    onComplete: async (user) => {
      try {
        console.log("User logged in successfully!", user);
        await storeUserMutation.mutateAsync({
          user: {
            privyId: user.user.id,
            walletAddress: user.user.wallet?.address || "",
            email: user.user.email?.address || "",
          },
        });
      } catch (error) {
        console.error("Failed to store user:", error);
      }
    },
    onError: (error) => {
      // Handle login errors
      console.log("Login failed:", error);
    },
  });

  // Number of FORTO tokens required per ticket
  const FORTO_PER_TICKET = 10;

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setTicketCount(isNaN(val) ? 1 : Math.max(1, val));
  };

  const handleAddToCartClick = async () => {
    if (!authenticated) {
      login();
      return;
    }

    if (!selectedNft) {
      alert("Please select an NFT first");
      return;
    }

    try {
      if (user && user.id && selectedNft && selectedNft.nftId) {
        await addToCartMutation.mutateAsync({
          cartItem: {
            userId: user.id,
            nftId: selectedNft.nftId,
            quantity: ticketCount,
          },
        });
      } else {
        alert("Something is missing. Failed to add to cart");
      }
      alert("NFT added to cart successfully!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add NFT to cart");
    }
  };

  const handleBuyClick = async () => {
    try {
      setLoading(true);

      if (!authenticated) {
        login();
        return;
      }

      if (!wallets[0]) {
        connectWallet({
          walletChainType: "ethereum-only",
          walletList: ["metamask"],
        });
        return;
      }

      // Connect to the ticket and token contracts
      const ticketContract = await connectToContract("FORTO_TICKET");
      const tokenContract = await connectToContract("FORTO_TOKEN");
      if (!ticketContract || !tokenContract) {
        throw new Error("Unable to connect to contracts");
      }
      console.log("calculating forto cost...");

      // 1) figure out how many FORTO we need, scaled to 18 decimals
      const totalForto = BigInt(ticketCount) * BigInt(FORTO_PER_TICKET);
      const cost = ethers.parseUnits(totalForto.toString(), 18);

      console.log("Cost in FORTO:", cost.toString());

      // 2) give the ticket contract permission to pull that many FORTO
      const approveTx = await tokenContract.approve(
        "0x188003513f2EEfEB5Bcf0cdBaD50367C1Dcc8dDB",
        cost
      );
      await approveTx.wait();
      console.log("Approved FORTO:", cost.toString());

      // Prepare token URIs for minted NFTs
      const tokenURIs = new Array(ticketCount).fill(
        "https://images.unsplash.com/photo-1746980885762-d31b3ee71d4c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
      );

      // 3) now mint — the contract will internally transferFrom() your tokens
      const mintTx = await ticketContract.mintNFT(ticketCount, tokenURIs);
      await mintTx.wait();

      alert(`Successfully minted ${ticketCount} NFT(s)!`);
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Failed to mint NFT. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        setLoading(true);
        // const response = await fetch(`/api/nfts?currency=${currency}&limit=6`);
        const response = await fetch(`/api/nfts`);
        console.log("res: ", response);
        const data = await response.json();
        console.log("datadata: ", data);

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

  const totalCost = ticketCount * FORTO_PER_TICKET;

  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="w-full overflow-hidden shadow-lg relative flex flex-col gap-4">
          {/* {!imageLoaded && (
            <Loader className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )} */}
          {selectedNft && selectedNft.nftImageUrl && (
            <img
              src={selectedNft?.nftImageUrl}
              alt="Forto NFT Ticket"
              className={`w-full h-72 rounded-md object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          )}
          <div className="flex justify-around gap-4">
            {nfts.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer border-2 rounded-md ${
                  selectedNft?.nftImageUrl === item.imageUrl
                    ? "border-brand-br2"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={item.imageUrl}
                  alt={`Thumbnail ${index}`}
                  width={150}
                  height={50}
                  priority
                  onClick={() => {
                    setImageLoaded(false);
                    setSelectedNft({
                      nftId: item.id,
                      nftImageUrl: item.imageUrl,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold font-josef tracking-tight">
            1 FORTO
          </h2>
          <p className="text-link text-sm leading-relaxed">
            Every ticket you buy enters you into a decade-long sweepstakes. Stay
            patient, win big.
          </p>

          <div className="text-brand-br1 font-semibold text-sm">
            <span className="text-white">Current Draw:</span>{" "}
            {getCurrentMonth()}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium">
              Number of Tickets
            </label>
            <input
              type="number"
              value={ticketCount}
              onChange={handleTicketChange}
              min={1}
              className="bg-background text-white border border-border px-3 py-2 rounded-md w-full"
            />
          </div>

          <div className="text-lg font-semibold text-brand-br1">
            <span className="text-white">Total Cost:</span> {totalCost} FORTO
          </div>

          <div className="flex justify-between">
            <div className="h-12 w-62">
              {ready ? (
                <button
                  onClick={handleBuyClick}
                  disabled={loading}
                  className="cursor-pointer inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
                >
                  {loading ? <Loader /> : "Buy Now"}
                </button>
              ) : (
                <Loader className="text-white" />
              )}
            </div>
            <div className="h-12 w-62">
              {ready ? (
                <button
                  onClick={handleAddToCartClick}
                  disabled={loading}
                  className="cursor-pointer inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
                >
                  {loading ? <Loader /> : "Add to Cart"}
                </button>
              ) : (
                <Loader className="text-white" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
