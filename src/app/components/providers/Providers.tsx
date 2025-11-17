"use client";

import React from "react";
import { ContextProvider } from "./ContextProvider";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";
import { SolanaProvider } from "./SolanaProvider";
import { ClerkProvider } from "@clerk/nextjs";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ReactQueryClientProvider>
      <ContextProvider>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <SolanaProvider>{children}</SolanaProvider>
        </ClerkProvider>
      </ContextProvider>
    </ReactQueryClientProvider>
  );
};

export default Providers;
