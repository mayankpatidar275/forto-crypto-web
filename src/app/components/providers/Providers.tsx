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
              walletList: ["metamask", "coinbase_wallet"],
              // walletChainType: "ethereum-only",
              // logo: "",
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
