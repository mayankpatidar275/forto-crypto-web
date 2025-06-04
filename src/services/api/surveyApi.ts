import { SurveyResponseType } from "../../types/types";
import { get, post } from "../apiMethods";

export async function fetchSurveyQuestions() {
  const surveyQuestions = await get(`/api/survey-questions`);
  return surveyQuestions;
}

export async function submitSurvey(body: SurveyResponseType) {
  return post(`/api/survey-response`, body);
}

export async function mintFreeNft({
  address,
  image = "https://images.unsplash.com/photo-1746980885762-d31b3ee71d4c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
}: {
  address: string;
  image?: string | null;
}) {
  // now `image` is guaranteed to be that URL if the caller passed `undefined` or omitted it
  return post(`/api/mintFreeNFT`, {
    address,
    image,
  });
}
