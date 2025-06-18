import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useStoreUser } from "@/custom-hooks/mutations";

export const useUserLogin = () => {
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

  return {
    login,
    ready,
    authenticated,
    user,
    connectWallet,
  };
};
