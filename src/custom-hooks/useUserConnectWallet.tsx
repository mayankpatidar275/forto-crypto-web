import {
  useActiveAccount,
  useActiveWalletConnectionStatus,
  useConnectModal,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { client } from "@/lib/client";

export function useUserConnectWallet() {
  const account = useActiveAccount();
  const status = useActiveWalletConnectionStatus();
  const { connect } = useConnectModal();

  const ensureWalletConnection = useCallback(async (): Promise<boolean> => {
    if (status === "connecting") {
      // toast.loading("Connecting wallet...", { id: "wallet-connect" });
      return false;
    }

    if (status === "connected") {
      return true;
    }

    // if (status === "unknown") {
    //   toast.loading("Initializing wallet...", { id: "wallet-connect" });
    //   // Wait and retry — not critical to block
    //   setTimeout(() => toast.dismiss("wallet-connect"), 1500);
    //   return false;
    // }

    if (!account) {
      try {
        await connect({
          client,
          wallets: [
            createWallet("io.metamask"),
            createWallet("com.coinbase.wallet"),
          ],
          appMetadata: {
            name: "Forto",
            url: "https://fortotoken.com",
          },
          title: "Connect Wallet",
          showAllWallets: false,
          showThirdwebBranding: false,
          size: "compact",
        });

        return false;
      } catch (err) {
        console.error("Wallet connection failed:", err);
        toast.error("Failed to connect wallet.");
        return false;
      }
    }

    return false;
  }, [account, status, connect]);

  return {
    ensureWalletConnection,
  };
}
