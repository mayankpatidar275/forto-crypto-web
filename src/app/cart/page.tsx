"use client";

import { useCart, useNfts } from "@/custom-hooks/queries";
import { useAppContext } from "@/custom-hooks/useAppContext";
import { useUserConnectWallet } from "@/custom-hooks/useUserConnectWallet";
import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { CartItemType } from "@/types/cart";
import { NFTWithType } from "@/types/nft";
import { buyNfts } from "@/utils/helper";
import { usePrivy } from "@privy-io/react-auth";
import CartItemCard, { CartItemCardProps } from "../components/ui/CartItemCard";
import Loader from "../components/ui/Loader";
import toast from "react-hot-toast";
import { useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { client } from "@/lib/client";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import { TotalCostCard } from "../components/ui/TotalCostCard";

const CONTRACT_ADDRESS = "0x98e00301Ab710f58a1Ef02F8bb7Fa57476CD6785";

const CartPage = () => {
  const { authenticated, ready } = usePrivy();
  const { state } = useAppContext();
  const { data: myCart, isLoading, error } = useCart(state?.userPrivyId);
  const { data: nfts } = useNfts();
  const { login } = useUserLogin();
  const { ensureWalletConnection } = useUserConnectWallet();
  const account = useActiveAccount();

  const contract = getContract({
    address: CONTRACT_ADDRESS,
    chain: base,
    client,
  });

  const handleBuyClick = async () => {
    if (!ready) {
      toast.error("Wallet is not ready. Please wait...");
      return;
    }

    if (!authenticated) {
      login();
      return;
    }

    const connected = await ensureWalletConnection();
    if (!connected) return;

    try {
      const imageUrls = getImageUrls(myCart?.data?.items, nfts?.data);

      if (imageUrls.length === 0) {
        toast.error("No NFTs found in your cart.");
        return;
      }

      const price = nfts?.data?.[0]?.price;

      if (!price) {
        toast.error("NFT price is unavailable.");
        return;
      }

      await buyNfts(price, imageUrls, account, contract.chain);
    } catch (err) {
      console.error("Error minting NFT:", err);
      toast.error("Failed to mint NFT.");
    }
  };

  // Handle states: not logged in / loading / error
  if (!state?.userPrivyId) {
    return <EmptyState message="Please log in to view your cart." />;
  }

  if (isLoading) {
    return <Loader className="mx-auto my-auto flex justify-center" />;
  }

  if (error || !myCart?.success) {
    return (
      <ErrorState message="Failed to load your cart. Please try again later." />
    );
  }

  const items = myCart.data.items;
  const totalCost = findTotalCost(items, nfts?.data);

  return (
    <section className="relative cp-x cp-y justify-center">
      <div className="flex flex-col gap-8">
        {items.length === 0 ? (
          <EmptyState message="Your cart is empty." />
        ) : (
          items.map((item: CartItemCardProps) => (
            <CartItemCard key={item.id} {...item} />
          ))
        )}
      </div>

      <TotalCostCard total={totalCost} onBuy={handleBuyClick} />
    </section>
  );
};

export default CartPage;

export function findMatchingNft(nfts: NFTWithType[] = [], nftId: string) {
  return nfts.find((nft) => nft.id === nftId);
}

export function getImageUrls(
  items: CartItemType[] = [],
  nfts: NFTWithType[] = []
) {
  return items.flatMap((item) => {
    const nft = findMatchingNft(nfts, item.nftId);
    return nft?.imageUrl ? Array(item.quantity).fill(nft.imageUrl) : [];
  });
}

export function findTotalCost(
  items: CartItemType[] = [],
  nfts: NFTWithType[] = []
) {
  return items.reduce((total, item) => {
    const nft = findMatchingNft(nfts, item.nftId);
    return total + (nft?.price || 0) * item.quantity;
  }, 0);
}
