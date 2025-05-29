"use client";

// import { ethers } from "ethers";
import { useState } from "react";
// import { connectToContract } from "../../utils/helper";
import { usePrivy } from "@privy-io/react-auth";
// import NFTImage from "../../../src/assets/NFTImage.png";
import Loader from "@/app/components/ui/Loader";
import { nftImageData } from "../data/data";
import Image from "next/image";

function getCurrentMonth(): string {
  const date = new Date();
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export default function BuyNFTSection() {
  const [ticketCount, setTicketCount] = useState(1);
  //   const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { ready } = usePrivy();
  // const { ready, authenticated, user, login, linkEmail } = usePrivy();

  // Number of FORTO tokens required per ticket
  const FORTO_PER_TICKET = 10;

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setTicketCount(isNaN(val) ? 1 : Math.max(1, val));
  };

  //   const handleBuy = async () => {
  //     try {
  //       setLoading(true);

  //       if (!authenticated) {
  //         login();
  //         return;
  //       }
  //       if (authenticated && !user?.email) {
  //         linkEmail();
  //         return;
  //       }

  //       // Connect to the ticket and token contracts
  //       const ticketContract = await connectToContract("FORTO_TICKET");
  //       const tokenContract = await connectToContract("FORTO_TOKEN");
  //       if (!ticketContract || !tokenContract) {
  //         throw new Error("Unable to connect to contracts");
  //       }
  //       console.log("calculating forto cost...");

  //       // 1) figure out how many FORTO we need, scaled to 18 decimals
  //       const totalForto = BigInt(ticketCount) * BigInt(FORTO_PER_TICKET);
  //       const cost = ethers.parseUnits(totalForto.toString(), 18);

  //       console.log("Cost in FORTO:", cost.toString());

  //       // 2) give the ticket contract permission to pull that many FORTO
  //       const approveTx = await tokenContract.approve(
  //         "0x188003513f2EEfEB5Bcf0cdBaD50367C1Dcc8dDB",
  //         cost
  //       );
  //       await approveTx.wait();
  //       console.log("Approved FORTO:", cost.toString());

  //       // Prepare token URIs for minted NFTs
  //       const tokenURIs = new Array(ticketCount).fill(
  //         "https://images.unsplash.com/photo-1746980885762-d31b3ee71d4c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
  //       );

  //       // 3) now mint — the contract will internally transferFrom() your tokens
  //       const mintTx = await ticketContract.mintNFT(ticketCount, tokenURIs);
  //       await mintTx.wait();

  //       alert(`Successfully minted ${ticketCount} NFT(s)!`);
  //     } catch (error) {
  //       console.error("Error minting NFT:", error);
  //       alert("Failed to mint NFT. Check the console for details.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const totalCost = ticketCount * FORTO_PER_TICKET;

  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="w-full rounded-2xl overflow-hidden shadow-lg relative flex flex-col gap-4">
          {/* {!imageLoaded && (
            <Loader className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )} */}
          <img
            src="https://cdn.prod.website-files.com/620c78af8cae7c4d2f039f61/62101d16f4d9716e605177b4_Frame%2011.png"
            alt="Forto NFT Ticket"
            className={`w-full h-72 object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="flex justify-around gap-4">
            {nftImageData.map((item, index) => (
              <div key={index}>
                <Image
                  // src="https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e4609e7b123fb0460c97c_Logo_trainai.avif"
                  // src={OrangeLogo}
                  src={item.image}
                  alt="Logo"
                  // className="h-8 w-auto"
                  width={150}
                  height={50}
                  priority
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

          <div className="h-12 w-62">
            {ready ? (
              <button
                // onClick={handleBuy}
                // disabled={loading}
                className="cursor-pointer inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
              >
                {/* {loading ? <Loader /> : "Buy Now"} */} Buy Now
              </button>
            ) : (
              <Loader className="text-white" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
