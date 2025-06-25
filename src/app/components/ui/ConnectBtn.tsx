import { client } from "@/lib/client";
import {
  useActiveAccount,
  useActiveWalletConnectionStatus,
  useConnectModal,
  useWalletDetailsModal,
} from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

export default function ConnectBtn() {
  const { connect, isConnecting } = useConnectModal();
  const account = useActiveAccount();
  const status = useActiveWalletConnectionStatus();
  const detailsModal = useWalletDetailsModal();

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
  ];

  const handleClick = async () => {
    if (status === "connected") {
      detailsModal.open({ client, theme: "dark" });
    } else {
      await connect({
        client,
        wallets,
        appMetadata: {
          name: "Forto",
          url: "https://fortotoken.com",
        },
        title: "Connect Wallet",
        showAllWallets: false,
        showThirdwebBranding: false,
        size: "compact",
      });
    }
  };

  return (
    <button
      className="btn-primary"
      onClick={handleClick}
      disabled={isConnecting || status === "connecting"}
    >
      {account
        ? `${account.address.slice(0, 4)}...${account.address.slice(-2)}`
        : isConnecting || status === "connecting"
        ? "Connecting..."
        : "Connect"}
    </button>
  );
}

// import { useUserConnectWallet } from "@/custom-hooks/useUserConnectWallet";
// import { useWallets } from "@privy-io/react-auth";
// import Link from "next/link";

// const ConnectBtn = () => {
//   const { wallets } = useWallets();
//   const { ensureWalletConnection } = useUserConnectWallet();
//   function handleDisconnectWallet() {
//     console.log("disconnecting");
//     wallets[0].disconnect();
//   }
//   return (
//     <div className="flex items-center space-x-4">
//       {wallets[0] ? (
//         <Link
//           href="/my-profile"
//           className="btn-primary"
//           onClick={handleDisconnectWallet}
//         >
//           <div className="flex items-center">
//             {wallets[0].address.slice(0, 4) +
//               "..." +
//               wallets[0].address.slice(wallets[0].address.length - 2)}
//           </div>
//         </Link>
//       ) : (
//         <div className="flex items-center">
//           <button
//             disabled={wallets[0]}
//             onClick={async () => await ensureWalletConnection()}
//             className="btn-primary"
//           >
//             Connect
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConnectBtn;
