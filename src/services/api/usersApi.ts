import { UserType } from "@/types/user";
import { post } from "../apiMethods";

export async function storeUser(body: { user: UserType }) {
  return post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user`, body);
}
