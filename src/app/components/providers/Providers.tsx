"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";
import { ContextProvider } from "./ContextProvider";

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
          config={{
            // Display email and wallet as login methods
            loginMethods: ["email"],

            // Customize Privy's appearance in your app
            appearance: {
              theme: "light",
              accentColor: "#facc15",
              // walletChainType: "ethereum-only",
              // logo: "",
            },
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              // createOnLogin: "users-without-wallets",
            },
          }}
        >
          {children}
        </PrivyProvider>
      </ContextProvider>
    </ReactQueryClientProvider>
  );
};

export default Providers;
