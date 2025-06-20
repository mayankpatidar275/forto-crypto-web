import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useStoreUser } from "@/custom-hooks/mutations";
import { USER_UPLOADED } from "@/utils/constants";
import { useAppContext } from "./useAppContext";
import toast from "react-hot-toast";
import { useUserLogout } from "./useUserLogout";

export const useUserLogin = () => {
  const { dispatch } = useAppContext();
  const { logout } = useUserLogout();
  const { login } = useLogin({
    onComplete: async (user) => {
      try {
        console.log("User logged in successfully!", user);
        const privyId = user.user.id;
        const walletAddress = user.user.wallet?.address;
        const email = user.user.email?.address;
        if (!privyId) {
          return console.log("Privy ID not found: ", privyId);
          // return toast.error("Privy ID not found");
        }
        if (!email) {
          return console.log("Email not found: ", email);
          // return toast.error("Email not found");
        }

        await storeUserMutation.mutateAsync({
          user: {
            privyId,
            walletAddress,
            email,
          },
        });
        // TODO: make it atomic, if it fails delete the user from privy also
        // IMP: TODO: dispatch on success of mutation
        dispatch({
          actionType: USER_UPLOADED,
          value: privyId,
        });
      } catch (error) {
        console.error("Failed to store user:", error);
        logout();
        toast.error("Failed to store user!");
      }
    },
    onError: (error) => {
      console.log("Login failed:", error);
      // toast.error("Privy Login Failed!");
    },
  });

  const { ready, authenticated, user, connectWallet } = usePrivy();

  const storeUserMutation = useStoreUser();

  return {
    login,
    ready,
    authenticated,
    user,
    connectWallet,
  };
};
