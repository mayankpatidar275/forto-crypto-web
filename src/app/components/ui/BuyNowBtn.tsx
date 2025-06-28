import { useUserConnectWallet } from "@/custom-hooks/useUserConnectWallet";
import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { buyNfts } from "@/utils/helper";
import { usePrivy } from "@privy-io/react-auth";
import { useState } from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { client } from "@/lib/client";
import { useActiveAccount } from "thirdweb/react";

const BuyNowBtn = ({
  buyItems,
}: {
  buyItems: { count: string; imageUrls: string[]; rate: number };
}) => {
  const { ready, authenticated } = usePrivy();
  const [loading, setLoading] = useState(false);
  const { login } = useUserLogin();
  const { ensureWalletConnection } = useUserConnectWallet();
  const contract = getContract({
    address: "0x98e00301Ab710f58a1Ef02F8bb7Fa57476CD6785",
    chain: base,
    client: client,
  });

  const account = useActiveAccount();

  const handleBuyClick = async () => {
    if (!ready) return toast.error("Authenticator not ready");
    if (!authenticated) return login();

    try {
      setLoading(true);
      const connected = await ensureWalletConnection();
      if (!connected) return;

      await buyNfts(buyItems.rate, buyItems.imageUrls, account, contract.chain);
    } catch (e) {
      console.error(e);
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
