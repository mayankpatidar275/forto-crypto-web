"use client";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ConnectBtn() {
  const { publicKey, connecting, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const shortAddress = useMemo(() => {
    if (!publicKey) return null;
    const base58 = publicKey.toBase58();
    return `${base58.slice(0, 4)}...${base58.slice(-2)}`;
  }, [publicKey]);

  const fullAddress = publicKey?.toBase58();

  const handleCopy = () => {
    if (fullAddress) {
      navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleButtonClick = () => {
    if (!connected) {
      setVisible(true);
    } else {
      setDropdownOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="btn-primary"
        onClick={handleButtonClick}
        disabled={connecting}
      >
        {connecting ? "Connecting..." : shortAddress ? shortAddress : "Connect"}
      </button>

      {dropdownOpen && connected && (
        <div className="absolute right-0 mt-2 w-48 bg-background rounded-md z-50">
          <ul className="py-1 text-sm text-white">
            <li>
              <button
                onClick={handleCopy}
                className="w-full text-left px-4 py-2 hover:bg-[var(--background-b3)] transition pointer"
              >
                {copied ? "Copied!" : "Copy Address"}
              </button>
            </li>
            <li>
              <a
                href={`https://explorer.solana.com/address/${fullAddress}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-[var(--background-b3)] transition pointer"
              >
                View on Explorer
              </a>
            </li>
            <li>
              <button
                onClick={disconnect}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-[var(--background-b3)] transition pointer"
              >
                Disconnect
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

// import { client } from "@/lib/client";
// import {
//   useActiveAccount,
//   useActiveWalletConnectionStatus,
//   useConnectModal,
//   useWalletDetailsModal,
// } from "thirdweb/react";
// import { createWallet } from "thirdweb/wallets";

// export default function ConnectBtn() {
//   const { connect, isConnecting } = useConnectModal();
//   const account = useActiveAccount();
//   const status = useActiveWalletConnectionStatus();
//   const detailsModal = useWalletDetailsModal();

//   const wallets = [
//     createWallet("io.metamask"),
//     createWallet("com.coinbase.wallet"),
//   ];

//   const handleClick = async () => {
//     if (status === "connected") {
//       detailsModal.open({ client, theme: "dark" });
//     } else {
//       await connect({
//         client,
//         wallets,
//         appMetadata: {
//           name: "Forto",
//           url: "https://fortotoken.com",
//         },
//         title: "Connect Wallet",
//         showAllWallets: false,
//         showThirdwebBranding: false,
//         size: "compact",
//       });
//     }
//   };

//   return (
//     <button
//       className="btn-primary"
//       onClick={handleClick}
//       disabled={isConnecting || status === "connecting"}
//     >
//       {account
//         ? `${account.address.slice(0, 4)}...${account.address.slice(-2)}`
//         : isConnecting || status === "connecting"
//         ? "Connecting..."
//         : "Connect"}
//     </button>
//   );
// }
