import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { mintFreeNft, submitSurvey } from "../services/api/surveyApi";
import { storeUser } from "@/services/api/usersApi";
import { addToCart, removeFromCart } from "@/services/api/cartApi";
import { buyNft, participate } from "@/services/api/nftApi";

// Generalized mutation function
function useMutationWithSuccessMessage<TVariables>(
  mutationFn: (variables: TVariables) => Promise<void>,
  successMessage: string | null,
  queryKey: string[]
  // navigateTo: string | null = null
) {
  const queryClient = useQueryClient();
  // Use `getToken()` to get the current session token
  // const navigate = useNavigate();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey, exact: true });
      // if (navigateTo) navigate(navigateTo);
      if (successMessage) toast.success(successMessage);
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
}

// Survey mutations
export const useSubmitSurvey = () =>
  useMutationWithSuccessMessage(
    submitSurvey,
    "Survey submitted successfully!",
    []
  );

export const useMintFreeNft = () =>
  useMutationWithSuccessMessage(mintFreeNft, "Minted successfully!", []);

// Users mutations
export const useStoreUser = () =>
  useMutationWithSuccessMessage(storeUser, null, ["users"]);

// Cart mutations
export const useAddToCart = () =>
  useMutationWithSuccessMessage(addToCart, "NFT added to cart!", ["cart"]);

// Cart mutations
export const useRemoveFromCart = () =>
  useMutationWithSuccessMessage(
    removeFromCart,
    "Removed from cart successfully",
    ["cart"]
  );

// Cart mutations
export const useBuyNft = () =>
  useMutationWithSuccessMessage(buyNft, "NFT bought!", ["buy"]);

// Participate mutations
export const useParticipate = () => {
  return useMutation({
    mutationFn: participate,
  });
};
