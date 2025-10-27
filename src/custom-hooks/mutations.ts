import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
import { mintFreeNft, submitSurvey } from "../services/api/surveyApi";
import { storeUser } from "@/services/api/usersApi";
import { addToCart, removeFromCart } from "@/services/api/cartApi";
import {
  buyNft,
  CheckPhoneReq,
  CheckPhoneRes,
  checkPhoneVerification,
  participate,
  SendPhoneReq,
  SendPhoneRes,
  sendPhoneVerification,
} from "@/services/api/nftApi";

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

// Note: generics = <TData, TError, TVariables, TContext>
export function useSendPhoneVerificationMutation(
  options?: UseMutationOptions<SendPhoneRes, Error, SendPhoneReq, unknown>
) {
  return useMutation<SendPhoneRes, Error, SendPhoneReq, unknown>({
    mutationFn: (payload: SendPhoneReq) => sendPhoneVerification(payload),
    ...(options as unknown as object), // preserve caller options; narrow-cast to satisfy TS
  });
}

export function useCheckPhoneVerificationMutation(
  options?: UseMutationOptions<CheckPhoneRes, Error, CheckPhoneReq, unknown>
) {
  return useMutation<CheckPhoneRes, Error, CheckPhoneReq, unknown>({
    mutationFn: (payload: CheckPhoneReq) => checkPhoneVerification(payload),
    ...(options as unknown as object),
  });
}
