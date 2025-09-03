import { useQuery } from "@tanstack/react-query";
import { fetchSurveyQuestions } from "../services/api/surveyApi";
import { fetchCart, fetchPurchaseHistory } from "@/services/api/cartApi";
import {
  fetchNftById,
  fetchNfts,
  fetchNftsByCategory,
} from "@/services/api/nftApi";

// Reusable query function
function useCustomQuery<TQueryFnData, TQueryParams = void>(
  queryKey: readonly unknown[],
  queryFn: (params?: TQueryParams) => Promise<TQueryFnData>,
  params?: TQueryParams,
  enabled: boolean = true
) {
  return useQuery({
    queryKey,
    queryFn: () => queryFn(params), // Pass parameters if they exist
    enabled,
  });
}

export function useSurveyQuestions() {
  return useCustomQuery(["surveyQuestions"], fetchSurveyQuestions);
}

export function useCart(userPrivyId: string) {
  return useCustomQuery(["cart"], fetchCart, userPrivyId, !!userPrivyId);
}

export function useNftById(nftId: string) {
  return useCustomQuery(["nftById", nftId], fetchNftById, nftId);
}

export function useNfts() {
  return useCustomQuery(["nfts"], fetchNfts);
}

export function useNftsByCategory(category: string) {
  return useCustomQuery(["nfts", category], fetchNftsByCategory, category);
}

export function usePurchaseHistory(userPrivyId: string) {
  return useCustomQuery(
    ["purchase"],
    fetchPurchaseHistory,
    userPrivyId,
    !!userPrivyId
  );
}
