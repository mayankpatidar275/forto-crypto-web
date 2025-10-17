import { useQuery } from "@tanstack/react-query";
import { fetchSurveyQuestions } from "../services/api/surveyApi";
import { fetchCart, fetchPurchaseHistory } from "@/services/api/cartApi";
import {
  fetchEventById,
  fetchNftById,
  fetchNfts,
  fetchNftsByCategory,
  fetchNftsByEventName,
} from "@/services/api/nftApi";
import { useAuth } from "@clerk/nextjs";
import { get } from "@/services/apiMethods";

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
export function useNftsByEventName(eventName: string) {
  return useCustomQuery(["nfts", eventName], fetchNftsByEventName, eventName);
}

export function usePurchaseHistory(userPrivyId: string) {
  return useCustomQuery(
    ["purchase"],
    fetchPurchaseHistory,
    userPrivyId,
    !!userPrivyId
  );
}

export function useEventById(eventId: string) {
  return useCustomQuery(["eventById", eventId], fetchEventById, eventId);
}

export const useUserTickets = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["userTickets"],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("No token available");
      return get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ticket/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
};

// Hook to check participation
export const useUserParticipation = (drawId: string) => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["userParticipation", drawId],
    queryFn: async () => {
      const token = await getToken();
      if (!token || !isSignedIn) throw new Error("Not authenticated");
      return get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ticket/${drawId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    enabled: !!drawId && isSignedIn, // Only run when we have eventId and user is signed in
  });
};
