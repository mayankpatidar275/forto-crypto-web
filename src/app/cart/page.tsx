"use client";

import { useBuyNft } from "@/custom-hooks/mutations";
import { useCart, useNfts } from "@/custom-hooks/queries";
import { useAppContext } from "@/custom-hooks/useAppContext";
import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { CartItemType } from "@/types/cart";
import { NFTWithType } from "@/types/nft";
import { payNftFeeTx } from "@/utils/payNftFeeFrontend";
import { usePrivy } from "@privy-io/react-auth";
import toast from "react-hot-toast";
import CartItemCard, { CartItemCardProps } from "../components/ui/CartItemCard";
import { EmptyState } from "../components/ui/EmptyState";
import { ErrorState } from "../components/ui/ErrorState";
import Loader from "../components/ui/Loader";
import { TotalCostCard } from "../components/ui/TotalCostCard";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { useState } from "react";

const CartPage = () => {
  const { authenticated, ready } = usePrivy();
  const { state } = useAppContext();
  const { data: myCart, isLoading, error } = useCart(state?.userPrivyId);
  const { data: nfts } = useNfts();
  const buyNftMutation = useBuyNft();
  const { login } = useUserLogin();
  const [loading, setLoading] = useState(false);

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  const wallet = useWallet();

  const handleBuyClick = async () => {
    // TODO: check if wallet is ready
    if (!ready) return toast.error("Authenticator not ready! Please try again");
    if (!authenticated) {
      login();
      return;
    }
    if (!wallet.connected || !wallet.publicKey) {
      return toast.error("Please connect your wallet first");
    }

    // Get cart items with quantities
    const items = getCartItemsWithQuantities(myCart?.data?.items);

    if (items.length === 0) {
      toast.error("No NFTs found in your cart.");
      return;
    }

    setLoading(true);

    try {
      // ✅ STEP 1: Build transaction and request wallet signature immediately
      const tx = await payNftFeeTx({
        connection,
        wallet: wallet as unknown as anchor.Wallet,
        eventName: "test-5",
      });

      // wallet.signTransaction MUST be called synchronously from click
      if (!wallet.signTransaction) {
        toast.error("Your wallet does not support signing transactions.");
        return;
      }

      const signedTx = await wallet.signTransaction(tx);

      // ✅ STEP 2: Continue async flow (send tx + backend mutation)
      await toast.promise(
        (async () => {
          const sig = await connection.sendRawTransaction(signedTx.serialize());
          await connection.confirmTransaction(sig, "confirmed");

          await buyNftMutation.mutateAsync({
            userPublicAddress: String(wallet.publicKey),
            items: items,
            privyId: state?.userPrivyId,
          });
        })(),
        {
          loading: "Minting might take a few minutes. Please wait...",
          success: "NFTs minted successfully! 🎉",
          error: "Failed to mint NFTs.",
        },
        { id: "cart-buy-toast" }
      );
    } catch (err) {
      console.error("Error minting NFT:", err);
      toast.error("Please use Wallet Browser!");
    } finally {
      setLoading(false);
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
      <TotalCostCard
        total={totalCost}
        onBuy={handleBuyClick}
        loading={loading}
      />
    </section>
  );
};

export default CartPage;

function findMatchingNft(nfts: NFTWithType[] = [], nftId: string) {
  return nfts.find((nft) => nft.id === nftId);
}

function findTotalCost(items: CartItemType[] = [], nfts: NFTWithType[] = []) {
  return items.reduce((total, item) => {
    const nft = findMatchingNft(nfts, item.nftId);
    return total + (nft?.price || 0) * item.quantity;
  }, 0);
}

function getCartItemsWithQuantities(items: CartItemType[] = []) {
  return items.map((item) => ({
    nftId: item.nftId,
    quantity: item.quantity,
  }));
}
