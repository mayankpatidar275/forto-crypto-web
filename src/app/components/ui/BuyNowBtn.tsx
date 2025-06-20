import { usePrivy, useWallets } from "@privy-io/react-auth";
import React, { useState } from "react";
import Loader from "./Loader";
import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { connectToContract } from "@/utils/helper";
import { ethers } from "ethers";

const BuyNowBtn = ({
  buyItems,
}: {
  buyItems: { count: string; imageUrls: string[]; rate: number };
}) => {
  // TODO: to do anything and check for login or not use context state not prive user
  const { ready, authenticated } = usePrivy();
  const [loading, setLoading] = useState(false);
  const { login } = useUserLogin();
  const { wallets } = useWallets();
  const { connectWallet } = usePrivy();
  const handleBuyClick = async () => {
    try {
      setLoading(true);

      if (!ready) {
        alert("Authenticator is not ready");
      }

      if (!authenticated) {
        login();
        return;
      }

      if (!wallets[0]) {
        connectWallet({
          walletChainType: "ethereum-only",
          // walletList: ["metamask"],
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
      const totalForto = BigInt(buyItems.count) * BigInt(buyItems.rate);
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
      const tokenURIs = new Array(buyItems.count).fill(
        "https://images.unsplash.com/photo-1746980885762-d31b3ee71d4c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
      );

      // 3) now mint — the contract will internally transferFrom() your tokens
      const mintTx = await ticketContract.mintNFT(buyItems.count, tokenURIs);
      await mintTx.wait();

      alert(`Successfully minted ${buyItems.count} NFT(s)!`);
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Failed to mint NFT. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };
  return (
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
        // <Loader className="text-white" />
        <></>
      )}
    </div>
  );
};

export default BuyNowBtn;
