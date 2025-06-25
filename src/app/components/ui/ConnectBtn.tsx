import { client } from "@/lib/client";
import React from "react";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
];

const ConnectBtn = () => {
  return (
    <div>
      <ConnectButton
        wallets={wallets}
        client={client}
        appMetadata={{ name: "Forto", url: "https://fortotoken.com" }}
        showAllWallets={false}
      />
    </div>
  );
};

export default ConnectBtn;

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
