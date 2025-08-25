"use client";

// import { usePrivy } from "@privy-io/react-auth";
import Footer from "./Footer";
// import Loader from "../ui/Loader";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
// import { AutoConnect } from "thirdweb/react";
// import { createWallet } from "thirdweb/wallets";
// import { client } from "@/lib/client";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { ready } = usePrivy();
  const pathname = usePathname();
  const isDocsPage = pathname.startsWith("/docs");

  // If docs page, skip header/footer but still return children
  if (isDocsPage) return <>{children}</>;
  // if (!ready) return <Loader className="mx-auto my-auto" />;

  // const wallets = [
  //   createWallet("io.metamask"),
  //   createWallet("com.coinbase.wallet"),
  // ];

  return (
    <>
      {/* <AutoConnect
        client={client}
        timeout={10000}
        wallets={wallets}
        appMetadata={{
          name: "Forto",
          url: "https://fortotoken.com",
        }}
      /> */}
      <Toaster position="bottom-right" />
      <div className="glow-top"></div>
      <div className="scan-line"></div>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
