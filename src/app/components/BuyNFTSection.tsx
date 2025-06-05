"use client";

// import { ethers } from "ethers";
import { useEffect, useState } from "react";
// import { connectToContract } from "../../utils/helper";
import { usePrivy, useWallets } from "@privy-io/react-auth";
// import NFTImage from "../../../src/assets/NFTImage.png";
import Loader from "@/app/components/ui/Loader";
import { useMintFreeNft, useStoreUser } from "@/custom-hooks/mutations";
import { NFTWithType } from "@/types/nft";
import { useLogin } from "@privy-io/react-auth";
import Image from "next/image";

function getCurrentMonth(): string {
  const date = new Date();
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export default function BuyNFTSection() {
  const [ticketCount, setTicketCount] = useState(1);
  //   const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nfts, setNfts] = useState<NFTWithType[]>([]);

  const [selectedImage, setSelectedImage] = useState(
    "https://cdn.prod.website-files.com/620c78af8cae7c4d2f039f61/62101d16f4d9716e605177b4_Frame%2011.png"
  );
  const { wallets } = useWallets();
  const { connectWallet } = usePrivy();
  const { ready, authenticated } = usePrivy();
  const mintFreeNftMutation = useMintFreeNft();
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

  // const { state, loginWithCode, sendCode } = useLoginWithEmail({
  //   onComplete: ({ user }) => {
  //     console.log("user: ", user);
  //   },
  // });
  // const { ready, authenticated, user, login, linkEmail } = usePrivy();

  // Number of FORTO tokens required per ticket
  const FORTO_PER_TICKET = 10;

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setTicketCount(isNaN(val) ? 1 : Math.max(1, val));
  };

  async function handleBuyClick() {
    setSubmitting(true);

    try {
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

      if (authenticated && wallets[0]) {
        // Todo: Submit the response
        // Todo: Handle the case if the user's wallet is different than the connected wallet.
        // const adrr = await getWalletAddress();
        const adrr = wallets[0].address;
        if (!adrr) {
          alert("Please connect your wallet!");
          return;
        }

        // const answers = questions.map((q) => {
        //   const value = data[q.id];
        //   const answer = Array.isArray(value)
        //     ? value
        //     : typeof value === "string"
        //       ? [value]
        //       : [];
        //   return { questionId: q.id, answer };
        // });
        console.log("Bypassing survey submission for testing purposes");
        console.log("Minting NFT for address:", adrr);

        await mintFreeNftMutation.mutateAsync({ address: adrr });

        // await submitSurveyMutation.mutateAsync({
        //   privyUserId: user.id,
        //   answers,
        // });

        alert("Survey submitted! You will receive the Ticket!");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

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

  const totalCost = ticketCount * FORTO_PER_TICKET;

  return (
    <section className="cp-x cp-y flex justify-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="w-full overflow-hidden shadow-lg relative flex flex-col gap-4">
          {/* {!imageLoaded && (
            <Loader className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )} */}
          <img
            src={selectedImage}
            alt="Forto NFT Ticket"
            className={`w-full h-72 rounded-md object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="flex justify-around gap-4">
            {nfts.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer border-2 rounded-md ${
                  selectedImage === item.imageUrl
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
                    setSelectedImage(item.imageUrl);
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
            {/* <div className="h-12 w-62">
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
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
