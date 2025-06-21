"use client";

import { useCart, useNfts } from "@/custom-hooks/queries";
import { useAppContext } from "@/custom-hooks/useAppContext";
import { useUserConnectWallet } from "@/custom-hooks/useUserConnectWallet";
import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { CartItemType } from "@/types/cart";
import { NFTWithType } from "@/types/nft";
import { buyNfts } from "@/utils/helper";
import { usePrivy } from "@privy-io/react-auth";
import CartItemCard from "../components/ui/CartItemCard";
import Loader from "../components/ui/Loader";

const CartPage = () => {
  const { authenticated, ready } = usePrivy();
  const { state } = useAppContext();
  const { data: myCart, isLoading, error } = useCart(state?.userPrivyId);
  const { data: nfts } = useNfts();
  const { login } = useUserLogin();
  const { ensureWalletConnection } = useUserConnectWallet();

  const handleBuyClick = async () => {
    try {
      // setLoading(true);
      if (!ready) {
        alert("Wallet is not ready. Please wait...");
        return;
      }

      if (!authenticated) {
        login();
        return;
      }

      await ensureWalletConnection();

      const imageUrls = getImageUrls();

      const price = nfts?.data?.[0]?.price;

      if (!price) {
        alert("Price is unavailable.");
        return;
      }

      await buyNfts(price, imageUrls);
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Failed to mint NFT. Check the console for details.");
    } finally {
      // setLoading(false);
    }
  };

  function getImageUrls(): string[] {
    if (!myCart?.data?.items || !nfts?.data) return [];

    const urls: string[] = [];

    for (const item of myCart.data.items) {
      const matchingNft = nfts.data.find(
        (nft: NFTWithType) => nft.id === item.nftId
      );
      if (matchingNft?.imageUrl) {
        const repeatedUrls = Array(item.quantity).fill(matchingNft.imageUrl);
        urls.push(...repeatedUrls);
      }
    }

    return urls;
  }

  function findTotalCost(): number {
    if (!myCart?.data?.items || !nfts?.data) return 0;

    return myCart.data.items.reduce((total: number, item: CartItemType) => {
      const matchingNft = nfts.data.find(
        (nft: NFTWithType) => nft.id === item.nftId
      );
      const price = matchingNft?.price || 0;
      return total + price * item.quantity;
    }, 0);
  }

  // function findTotalTickets() {
  //   if (!myCart?.data?.items) return 0;

  //   return myCart.data.items.reduce((total: number, item: CartItemType) => {
  //     return total + item.quantity;
  //   }, 0);
  // }

  if (!state?.userPrivyId) {
    return <div className="text-white">Please log in to view your cart.</div>;
  }

  if (isLoading) {
    return <Loader className="mx-auto my-auto flex justify-center" />;
  }

  if (error || !myCart?.success) {
    return (
      <div className="text-red-500">
        Failed to load your cart. Please try again later.
      </div>
    );
  }

  const totalCost = findTotalCost();

  return (
    <section className="relative cp-x cp-y justify-center">
      <div className="flex flex-col gap-8">
        {myCart.data.items.length === 0 ? (
          <div className="text-white text-center">Your cart is empty.</div>
        ) : (
          myCart.data.items.map((item: CartItemType) => (
            <CartItemCard key={item.id} {...item} />
          ))
        )}
      </div>

      {/* Fixed total cost card */}
      <div className="fixed bottom-0 right-0 left-0 sm:bottom-6 flex justify-between gap-4 sm:right-6 sm:left-1/2 md:left-2/3 sm:border-2 border-brand-br2 sm:w-auto sm:min-w-[260px] bg-background rounded-lg p-4 shadow-xl text-white z-100">
        <div>
          <div className="text-sm font-medium text-link">Total Cost</div>
          <div className="text-2xl font-bold text-link">
            {totalCost.toFixed(2)} FORTO
          </div>
        </div>

        <button
          onClick={handleBuyClick}
          className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-brand-br1 text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-[background-color,transform, scale] duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93]"
        >
          Buy
        </button>
      </div>
    </section>
  );
};

export default CartPage;
