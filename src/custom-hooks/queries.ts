import { useQuery } from "@tanstack/react-query";
import { fetchSurveyQuestions } from "../services/api/surveyApi";

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
