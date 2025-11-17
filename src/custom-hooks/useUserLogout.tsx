import {} from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useAppContext } from "./useAppContext";
import { USER_UPLOADED } from "@/utils/constants";

export const useUserLogout = () => {
  const { dispatch } = useAppContext();
  // const { signOut } = useSignOut();

  const logout = async () => {
    try {
      // await signOut();
      dispatch({
        actionType: USER_UPLOADED,
        value: "",
      });
      toast.success("Logged Out Successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed!");
    }
  };

  return {
    logout,
  };
};
