import { useSignIn, useUser } from "@clerk/nextjs";
import { useStoreUser } from "@/custom-hooks/mutations";
import { USER_UPLOADED } from "@/utils/constants";
import { useAppContext } from "./useAppContext";
import toast from "react-hot-toast";
import { useUserLogout } from "./useUserLogout";
import { useEffect, useRef } from "react";

export const useUserLogin = () => {
  const { dispatch } = useAppContext();
  const { logout } = useUserLogout();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { user, isLoaded: userLoaded } = useUser();

  const storeUserMutation = useStoreUser();

  // Use refs to track if we've already processed the user
  const hasProcessedUserRef = useRef(false);
  const currentUserIdRef = useRef<string | null>(null);

  // Handle user storage when user becomes available
  useEffect(() => {
    // If no user or still loading, reset the flags
    if (!user || !userLoaded) {
      hasProcessedUserRef.current = false;
      currentUserIdRef.current = null;
      return;
    }

    // If we've already processed this user, don't do anything
    if (hasProcessedUserRef.current && currentUserIdRef.current === user.id) {
      return;
    }

    // If mutation is already in progress, wait
    if (storeUserMutation.isPending) {
      return;
    }

    const storeUser = async () => {
      try {
        console.log("Storing user in database...", user.id);
        const clerkId = user.id;
        const walletAddress = "";
        const email = user.primaryEmailAddress?.emailAddress;

        if (!clerkId) {
          console.log("Clerk ID not found");
          return;
        }
        if (!email) {
          console.log("Email not found");
          return;
        }

        await storeUserMutation.mutateAsync({
          user: {
            privyId: clerkId,
            walletAddress,
            email,
          },
        });

        // Mark as processed only after successful mutation
        hasProcessedUserRef.current = true;
        currentUserIdRef.current = user.id;

        dispatch({
          actionType: USER_UPLOADED,
          value: clerkId,
        });

        console.log("User stored successfully!");
      } catch (error) {
        console.error("Failed to store user:", error);
        // Reset flags on error so we can retry
        hasProcessedUserRef.current = false;
        currentUserIdRef.current = null;
        logout();
        toast.error("Failed to store user!");
      }
    };

    storeUser();
  }, [user, userLoaded, storeUserMutation, dispatch, logout]);

  const login = async () => {
    if (!signInLoaded) {
      toast.error("Authentication not ready");
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed!");
    }
  };

  return {
    login,
    isLoaded: userLoaded && signInLoaded,
    user,
  };
};
