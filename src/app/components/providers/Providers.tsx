"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";
import { ContextProvider } from "./ContextProvider";
import { ThirdwebProvider } from "thirdweb/react";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ReactQueryClientProvider>
      <ThirdwebProvider>
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
            {children}
          </PrivyProvider>
        </ContextProvider>
      </ThirdwebProvider>
    </ReactQueryClientProvider>
  );
};

export default Providers;
