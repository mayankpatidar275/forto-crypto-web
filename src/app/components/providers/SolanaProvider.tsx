"use client";
// TODO: Some packages (like @keystonehq/sdk, qrcode.react, react-qr-reader) expect React 16 or 17. Might be fine for now if we are not using those wallets now.
import React, { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import // PhantomWalletAdapter,
// SolflareWalletAdapter,
// UnsafeBurnerWalletAdapter,
"@solana/wallet-adapter-wallets";
import {
  // WalletDisconnectButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
// import { WalletMultiButton } from "../wallet-connection/WalletMultiButton";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

interface SolanaProviderProps {
  children: ReactNode;
}

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      return isIOS
        ? [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/anza-xyz/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            // new UnsafeBurnerWalletAdapter(),
          ]
        : [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* <WalletMultiButton /> */}
          {/* <WalletMultiButton /> */}

          {/* <WalletDisconnectButton /> */}
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
// "use client";

// import React, { FC, ReactNode, useMemo } from "react";
// import dynamic from "next/dynamic";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";
// import "@solana/wallet-adapter-react-ui/styles.css";

// // Dynamically import buttons to avoid hydration issues
// const WalletMultiButton = dynamic(
//   () =>
//     import("@solana/wallet-adapter-react-ui").then(
//       (mod) => mod.WalletMultiButton
//     ),
//   { ssr: false }
// );

// const WalletDisconnectButton = dynamic(
//   () =>
//     import("@solana/wallet-adapter-react-ui").then(
//       (mod) => mod.WalletDisconnectButton
//     ),
//   { ssr: false }
// );

// interface SolanaProviderProps {
//   children: ReactNode;
// }

// const SolanaProviderInner: FC<SolanaProviderProps> = ({ children }) => {
//   const network = WalletAdapterNetwork.Devnet;

//   const endpoint = useMemo(() => clusterApiUrl(network), [network]);

//   const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);

//   return (
//     <ConnectionProvider endpoint={endpoint}>
//       <WalletProvider wallets={wallets} autoConnect>
//         <WalletModalProvider>
//           <div className="flex gap-4 mb-4">
//             <WalletMultiButton />
//             <WalletDisconnectButton />
//           </div>
//           {children}
//         </WalletModalProvider>
//       </WalletProvider>
//     </ConnectionProvider>
//   );
// };

// // Wrap everything in dynamic import with SSR disabled
// const SolanaProvider = dynamic(() => Promise.resolve(SolanaProviderInner), {
//   ssr: false,
// });

// export default SolanaProvider;
