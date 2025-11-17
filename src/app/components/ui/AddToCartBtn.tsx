import { useAddToCart } from "@/custom-hooks/mutations";
import { useCart } from "@/custom-hooks/queries";
import { useAppContext } from "@/custom-hooks/useAppContext";
import { useUserLogin } from "@/custom-hooks/useUserLogin";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import Loader from "./Loader";
import toast from "react-hot-toast";

const AddToCartBtn = ({ ticketCount }: { ticketCount: string }) => {
  const { user, isLoaded } = useUser();
  const { state } = useAppContext();
  const { login } = useUserLogin();
  const addToCartMutation = useAddToCart();
  // Only call useCart if userId exists
  const {
    data: myCart,
    isLoading: isLoadingCart,
    error: errorLoadingCart,
  } = useCart(state.userClerkId);

  const handleAddToCartClick = async () => {
    if (!isLoaded) {
      toast.error("Authentication is not ready");
    }
    if (!user) {
      login();
      return;
    }

    if (!state.selectedNft) {
      toast.error("Please select an NFT first");
      return;
    }

    if (!state.userClerkId) {
      console.log("state.userClerkId is required: ", state.userClerkId);
    }

    try {
      if (state.userClerkId && state.selectedNft && state.selectedNft.id) {
        await addToCartMutation.mutateAsync({
          cartItem: {
            userId: state.userClerkId,
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
      <SignedIn>
        {!isCartItemAlreadyExist() && (
          <div className="h-12 w-62">
            {isLoaded ? (
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
              <></>
            )}
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <div className="h-12 w-62">
          <button
            onClick={() => login()}
            className="cursor-pointer inline-block border-2 border-brand-br2 text-white px-6 py-3 rounded-xl text-lg md:text-xl font-semibold hover:bg-brand-br2 hover:text-link transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
          >
            Login to Add to Cart
          </button>
        </div>
      </SignedOut>
    </>
  );
};

export default AddToCartBtn;
