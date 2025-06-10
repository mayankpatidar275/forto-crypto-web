"use client";

import { useCart, useNfts } from "@/custom-hooks/queries";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import React, { useState } from "react";
import CartItemCard from "../components/ui/CartItemCard";
import { CartItemType } from "@/types/cart";
import { NFTWithType } from "@/types/nft";
import { connectToContract } from "@/utils/helper";
import { ethers } from "ethers";

const CartPage = () => {
  const { ready, authenticated, user, login } = usePrivy();
  const userId = user?.id;

  const { data: myCart, isLoading, error } = useCart(userId || "");
  const { data: nfts } = useNfts();
  const { wallets } = useWallets();
  const { connectWallet } = usePrivy();

  const [loading, setLoading] = useState(true);

  // Number of FORTO tokens required per ticket
  const FORTO_PER_TICKET = 10;

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
      const totalForto = BigInt(findTotalTickets()) * BigInt(FORTO_PER_TICKET);
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
      const tokenURIs = new Array(findTotalTickets()).fill(
        "https://images.unsplash.com/photo-1746980885762-d31b3ee71d4c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
      );

      // 3) now mint — the contract will internally transferFrom() your tokens
      const mintTx = await ticketContract.mintNFT(
        findTotalTickets(),
        tokenURIs
      );
      await mintTx.wait();

      alert(`Successfully minted ${findTotalTickets()} NFT(s)!`);
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Failed to mint NFT. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  function findTotalCost() {
    if (!myCart?.data?.items || !nfts || !nfts?.data || nfts.data.length == 0)
      return 0;

    return myCart.data.items.reduce((total: number, item: CartItemType) => {
      const matchingNft = nfts.data.find(
        (nft: NFTWithType) => nft.id === item.nftId
      );
      const price = matchingNft?.price || 0;
      return total + price * item.quantity;
    }, 0);
  }

  function findTotalTickets() {
    if (!myCart?.data?.items) return 0;

    return myCart.data.items.reduce((total: number, item: CartItemType) => {
      return total + item.quantity;
    }, 0);
  }

  if (!userId) {
    return <div className="text-white">Please log in to view your cart.</div>;
  }

  if (isLoading) {
    return <div className="text-white">Loading your cart...</div>;
  }

  if (error || !myCart?.success) {
    return (
      <div className="text-red-500">
        Failed to load your cart. Please try again later.
      </div>
    );
  }

  const totalCost = findTotalCost();

  return (
    <section className="relative cp-x cp-y justify-center">
      <div className="flex flex-col gap-8">
        {myCart.data.items.length === 0 ? (
          <div className="text-white">Your cart is empty.</div>
        ) : (
          myCart.data.items.map((item: CartItemType) => (
            <CartItemCard key={item.id} {...item} />
          ))
        )}
      </div>

      {/* Fixed total cost card */}
      <div className="fixed bottom-0 right-0 left-0 sm:bottom-6 flex justify-between gap-4 sm:right-6 sm:left-1/2 md:left-2/3 sm:border-2 border-brand-br2 sm:w-auto sm:min-w-[260px] bg-background rounded-lg p-4 shadow-xl text-white z-100">
        <div>
          <div className="text-sm font-medium text-link">Total Cost</div>
          <div className="text-2xl font-bold text-link">
            {totalCost.toFixed(2)} FORTO
          </div>
        </div>

        <button
          disabled={!wallets[0]}
          onClick={handleBuyClick}
          className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-brand-br1 text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-[background-color,transform, scale] duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93]"
        >
          Buy
        </button>
      </div>
    </section>
  );
};

export default CartPage;
