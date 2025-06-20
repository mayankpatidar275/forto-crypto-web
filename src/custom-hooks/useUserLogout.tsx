import { useLogout } from "@privy-io/react-auth";
import toast from "react-hot-toast";
import { useAppContext } from "./useAppContext";
import { USER_UPLOADED } from "@/utils/constants";

export const useUserLogout = () => {
  const { dispatch } = useAppContext();
  const { logout } = useLogout({
    onSuccess: () => {
      dispatch({
        actionType: USER_UPLOADED,
        value: "",
      });
      toast.success("Logged Out Successfully!");
    },
  });
  return {
    logout,
  };
};
