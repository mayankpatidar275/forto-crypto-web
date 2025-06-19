import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useStoreUser } from "@/custom-hooks/mutations";
import { useAuth } from "./useAuth";
import { USER_UPLOADED } from "@/utils/constants";
import { useEffect } from "react";

export const useUserLogin = () => {
  const { state, dispatch } = useAuth();
  const { login } = useLogin({
    onComplete: async (user) => {
      try {
        console.log("User logged in successfully!", user);
        await storeUserMutation.mutateAsync({
          user: {
            privyId: user.user.id,
            walletAddress: user.user.wallet?.address || "",
            email: user.user.email?.address || "",
          },
        });
        // TODO: clear the state on logout
        // TODO: make it atomic, if it fails delete the user from privy also
        dispatch({
          actionType: USER_UPLOADED,
          value: user.user.id,
        });
      } catch (error) {
        console.error("Failed to store user:", error);
      }
    },
    onError: (error) => {
      console.log("Login failed:", error);
    },
  });

  const { ready, authenticated, user, connectWallet } = usePrivy();

  const storeUserMutation = useStoreUser();

  useEffect(() => {
    console.log("state:", state);
  }, [state]);
  return {
    login,
    ready,
    authenticated,
    user,
    connectWallet,
  };
};
