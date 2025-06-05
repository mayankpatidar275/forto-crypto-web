import { UserType } from "@/types/user";
import { post } from "../apiMethods";

export async function storeUser(body: { user: UserType }) {
  return post(`/api/user`, body);
}
