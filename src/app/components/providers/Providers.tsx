"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";
import { ContextProvider } from "./ContextProvider";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";
import { SolanaProvider } from "./SolanaProvider";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ReactQueryClientProvider>
      <ContextProvider>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
          clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || ""}
          config={{
            // Display email and wallet as login methods
            loginMethods: ["email"],
            // Customize Privy's appearance in your app
            appearance: {
              theme: "light",
              accentColor: "#facc15",
              walletList: ["metamask", "coinbase_wallet"],
              // walletChainType: "ethereum-only",
              // logo: "",
            },
          }}
        >
          <SolanaProvider>{children}</SolanaProvider>
        </PrivyProvider>
      </ContextProvider>
    </ReactQueryClientProvider>
  );
};

export default Providers;
