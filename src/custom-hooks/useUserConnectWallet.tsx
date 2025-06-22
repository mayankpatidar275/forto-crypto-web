import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useCallback } from "react";
import toast from "react-hot-toast";

export function useUserConnectWallet() {
  const { ready, connectWallet } = usePrivy();
  const { wallets } = useWallets();

  const ensureWalletConnection = useCallback(async (): Promise<boolean> => {
    if (!ready) {
      toast.error("Authenticator is not ready");
      return false;
    }

    if (!wallets[0]) {
      connectWallet({
        walletChainType: "ethereum-only",
        walletList: ["metamask", "coinbase_wallet"],
      });
      return false;
    }

    return true;
  }, [ready, wallets, connectWallet]);

  return {
    ensureWalletConnection,
  };
}
