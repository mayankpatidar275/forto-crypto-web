import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useStoreUser } from "@/custom-hooks/mutations";

export const useStoreUserOnLogin = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const storeUser = useStoreUser();
  const hasStored = useRef(false); // ✅ ensures we only call once

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !hasStored.current) {
      hasStored.current = true; // prevent repeat calls
      storeUser.mutate({
        user: {
          privyId: user.id,
          email:
            user.primaryEmailAddress?.emailAddress ??
            user.emailAddresses[0]?.emailAddress,
        },
      });
    }
  }, [isLoaded, isSignedIn, user, storeUser.mutate, storeUser]);
};
