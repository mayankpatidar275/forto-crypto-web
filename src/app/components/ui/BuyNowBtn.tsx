import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
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
      throw new Error("Connect wallet first");
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
