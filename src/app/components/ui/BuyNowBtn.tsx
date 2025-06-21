import { useUserConnectWallet } from "@/custom-hooks/useUserConnectWallet";
import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { buyNfts } from "@/utils/helper";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import Loader from "./Loader";

const BuyNowBtn = ({
  buyItems,
}: {
  buyItems: { count: string; imageUrls: string[]; rate: number };
}) => {
  // TODO: to do anything and check for login or not use context state not prive user
  const { ready, authenticated } = usePrivy();
  const [loading, setLoading] = useState(false);
  const { login } = useUserLogin();
  const { ensureWalletConnection } = useUserConnectWallet();

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
      await ensureWalletConnection();
      await buyNfts(buyItems.rate, buyItems.imageUrls);
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
