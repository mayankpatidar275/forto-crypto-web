import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { mintFreeNft, submitSurvey } from "../services/api/surveyApi";
import { storeUser } from "@/services/api/usersApi";
import { addToCart } from "@/services/api/cartApi";

// Generalized mutation function
function useMutationWithSuccessMessage<TVariables>(
  mutationFn: (variables: TVariables) => Promise<void>,
  successMessage: string,
  queryKey: string[],
  navigateTo: string | null = null
) {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey, exact: true });
      // if (navigateTo) navigate(navigateTo);
      toast.success(successMessage);
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
  useMutationWithSuccessMessage(storeUser, "User stored successfully", [
    "users",
  ]);

// Cart mutations
export const useAddToCart = () =>
  useMutationWithSuccessMessage(addToCart, "Added to cart successfully", [
    "cart",
  ]);
