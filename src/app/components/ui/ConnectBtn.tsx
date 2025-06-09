import React from "react";
import Link from "next/link";
import { usePrivy, useWallets } from "@privy-io/react-auth";

const ConnectBtn = () => {
  const { connectWallet } = usePrivy();
  const { wallets } = useWallets();
  function handleDisconnectWallet() {
    console.log("disconnecting");
    wallets[0].disconnect();
  }
  return (
    <div className="flex items-center space-x-4">
      {wallets[0] ? (
        <Link
          href="/my-profile"
          className="btn-primary"
          onClick={handleDisconnectWallet}
        >
          <div className="flex items-center">
            {wallets[0].address.slice(0, 4) +
              "..." +
              wallets[0].address.slice(wallets[0].address.length - 2)}
          </div>
        </Link>
      ) : (
        <div className="flex items-center">
          <button
            disabled={wallets[0]}
            onClick={() =>
              connectWallet({
                walletChainType: "ethereum-only",
                walletList: ["metamask"],
              })
            }
            className="btn-primary"
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectBtn;
