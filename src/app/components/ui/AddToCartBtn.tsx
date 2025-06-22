import { useAddToCart } from "@/custom-hooks/mutations";
import { useCart } from "@/custom-hooks/queries";
import { useAppContext } from "@/custom-hooks/useAppContext";
import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { usePrivy } from "@privy-io/react-auth";
import React from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";

const AddToCartBtn = ({ ticketCount }: { ticketCount: string }) => {
  const { ready, authenticated } = usePrivy();
  const { state } = useAppContext();
  const { login } = useUserLogin();
  const addToCartMutation = useAddToCart();
  // Only call useCart if userId exists
  const {
    data: myCart,
    isLoading: isLoadingCart,
    error: errorLoadingCart,
  } = useCart(state.userPrivyId);

  const handleAddToCartClick = async () => {
    if (!ready) {
      toast.error("Authenticator is not ready");
    }
    if (!authenticated) {
      login();
      return;
    }

    if (!state.selectedNft) {
      toast.error("Please select an NFT first");
      return;
    }

    if (!state.userPrivyId) {
      console.log("state.userPrivyId is required: ", state.userPrivyId);
    }

    try {
      if (state.userPrivyId && state.selectedNft && state.selectedNft.id) {
        await addToCartMutation.mutateAsync({
          cartItem: {
            userId: state.userPrivyId,
            nftId: state.selectedNft.id,
            quantity: Number(ticketCount),
          },
        });
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Failed to add NFT to cart:", error);
      toast.error("Failed to add NFT to cart!");
    }
  };

  function isCartItemAlreadyExist() {
    const items = myCart?.data?.items;
    for (let i = 0; i < items?.length; i++) {
      const nftId = items[i].nftId;
      if (nftId === state.selectedNft?.id) {
        return true;
      }
    }
    return false;
  }

  if (errorLoadingCart) {
    return <div>Error</div>;
  }
  return (
    <>
      {!isCartItemAlreadyExist() && (
        <div className="h-12 w-62">
          {ready ? (
            <button
              onClick={handleAddToCartClick}
              disabled={
                isLoadingCart ||
                addToCartMutation.isPending ||
                isCartItemAlreadyExist()
              }
              className="cursor-pointer inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
            >
              {addToCartMutation.isPending ? <Loader /> : "Add to Cart"}
            </button>
          ) : (
            // <Loader className="text-white" />
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default AddToCartBtn;
