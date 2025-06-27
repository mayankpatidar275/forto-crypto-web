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
// import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
// import { claimTo } from "thirdweb/extensions/erc20";

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

  const contract = getContract({
    address: "0x98e00301Ab710f58a1Ef02F8bb7Fa57476CD6785",
    chain: base,
    client: client,
  });

  // const { data } = useReadContract(balanceOf, {
  //   contract,
  //   owner: "0x...",
  //   tokenId: 0n,
  // });

  console.log("contract: ", contract);
  // const transaction = claimTo({
  //   contract,
  //   quantity: "1",
  //   to: "0x...",
  // });
  // const { mutateAsync: claimNft } = useSendTransaction();
  const account = useActiveAccount();
  const handleBuyClick = async () => {
    try {
      setLoading(true);
      if (!ready) {
        toast.error("Authenticator is not ready");
      }
      if (!authenticated) {
        login();
        return;
      }

      const alreadyConnected = await ensureWalletConnection();
      if (!alreadyConnected) {
        return;
      }
      await buyNfts(buyItems.rate, buyItems.imageUrls, account, contract.chain);
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast.error("Failed to mint NFT.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-12 w-62">
      {/* <button onClick={() => claimNft(transaction)}>Claim</button> */}
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
