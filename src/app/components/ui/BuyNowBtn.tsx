import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { payNftFeeWithUser } from "@/utils/payNftFeeFrontend";
import { Connection } from "@solana/web3.js";
import { useBuyNft } from "@/custom-hooks/mutations";

const BuyNowBtn = ({
  buyItems,
}: {
  buyItems: { count: string; imageUrls: string[]; rate: number };
}) => {
  const { ready, authenticated } = usePrivy();
  const [loading, setLoading] = useState(false);
  const { login } = useUserLogin();
  const wallet = useWallet();
  const buyNftMutation = useBuyNft();
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const imageUrls = buyItems.imageUrls;

  const handleBuyClick = async () => {
    // TODO: check if wallet is ready
    if (!ready) return toast.error("Authenticator not ready");
    if (!authenticated) return login();
    if (!wallet.connected || !wallet.publicKey) {
      return toast.error("Please connect your wallet first");
    }
    try {
      setLoading(true);

      if (imageUrls.length === 0) {
        toast.error("No NFTs selected to mint.");
        return;
      }

      await payNftFeeWithUser({
        connection,
        wallet: wallet as unknown as anchor.Wallet, // AnchorWallet
        eventName: "test-5",
      });

      await buyNftMutation.mutateAsync({
        userPublicAddress: String(wallet.publicKey),
        nftName: "My NFT",
        description: "NFT desc",
        eventName: "test-5",
        imageUrls: imageUrls,
      });
    } catch (err) {
      console.error("Error minting NFT:", err);
      toast.error("Failed to mint NFT.");
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  useEffect(() => {
    if (buyNftMutation.isPending)
      toast.loading("Minting might take few minutes. Please wait!");
  }, [buyNftMutation.isPending]);

  return (
    <div className="h-12 w-62">
      {ready &&
        (loading ? (
          <div className="flex gap-2 items-center h-full">
            <Loader className="text-white" />
          </div>
        ) : (
          <button
            onClick={handleBuyClick}
            disabled={loading}
            className="cursor-pointer inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
          >
            Buy Now
          </button>
        ))}
    </div>
  );
};

export default BuyNowBtn;

// import { useUserLogin } from "@/custom-hooks/useUserLogin";
// import { usePrivy } from "@privy-io/react-auth";
// import toast from "react-hot-toast";
// import Loader from "./Loader";
// import { useWallet } from "@solana/wallet-adapter-react";
// import * as anchor from "@coral-xyz/anchor";
// import { payNftFeeTx } from "@/utils/payNftFeeFrontend"; // <-- new helper
// import { Connection } from "@solana/web3.js";
// import { useBuyNft } from "@/custom-hooks/mutations";
// import { useState } from "react";

// const BuyNowBtn = ({
//   buyItems,
// }: {
//   buyItems: { count: string; imageUrls: string[]; rate: number };
// }) => {
//   const { ready, authenticated } = usePrivy();
//   const { login } = useUserLogin();
//   const wallet = useWallet();
//   const buyNftMutation = useBuyNft();
//   const [loading, setLoading] = useState(false);

//   const connection = new Connection(
//     "https://api.devnet.solana.com",
//     "confirmed"
//   );
//   const imageUrls = buyItems.imageUrls;

//   const handleBuyClick = async () => {
//     // TODO: check if wallet is ready
//     if (!ready) return toast.error("Authenticator not ready");
//     if (!authenticated) return login();
//     if (!wallet.connected || !wallet.publicKey) {
//       return toast.error("Please connect your wallet first");
//     }
//     if (imageUrls.length === 0) {
//       return toast.error("No NFTs selected to mint.");
//     }

//     setLoading(true);

//     try {
//       // ✅ STEP 1: Build transaction and request wallet signature immediately
//       const tx = await payNftFeeTx({
//         connection,
//         wallet: wallet as unknown as anchor.Wallet,
//         eventName: "test-5",
//       });

//       // wallet.signTransaction MUST be called synchronously from click
//       if (!wallet.signTransaction) {
//         toast.error("Your wallet does not support signing transactions.");
//         return;
//       }

//       const signedTx = await wallet.signTransaction(tx);

//       // ✅ STEP 2: Continue async flow (send tx + backend mutation)
//       await toast.promise(
//         (async () => {
//           const sig = await connection.sendRawTransaction(signedTx.serialize());
//           await connection.confirmTransaction(sig, "confirmed");

//           await buyNftMutation.mutateAsync({
//             userPublicAddress: String(wallet.publicKey),
//             nftName: "My NFT",
//             description: "NFT desc",
//             eventName: "test-5",
//             imageUrls,
//           });
//         })(),
//         {
//           loading: "Minting might take a few minutes. Please wait...",
//           success: "NFT minted successfully! 🎉",
//           error: "Failed to mint NFT.",
//         },
//         { id: "buy-now-toast" }
//       );
//     } catch (err) {
//       console.error("Error minting NFT:", err);
//       toast.error("Something went wrong while minting.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-12 w-62">
//       {ready &&
//         (loading ? (
//           <div className="flex gap-2 items-center h-full">
//             <Loader className="text-white" />
//           </div>
//         ) : (
//           <button
//             onClick={handleBuyClick}
//             disabled={loading}
//             className="cursor-pointer inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
//           >
//             Buy Now
//           </button>
//         ))}
//     </div>
//   );
// };

// export default BuyNowBtn;
