"use client";

import { usePrivy } from "@privy-io/react-auth";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "../ui/Loader";
import { usePathname } from "next/navigation";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready } = usePrivy();
  const pathname = usePathname();
  const isDocsPage = pathname.startsWith("/docs");

  if (!ready) return <Loader className="mx-auto my-auto" />;

  // If docs page, skip header/footer but still return children
  if (isDocsPage) return <>{children}</>;

  return (
    <>
      <div className="glow-top"></div>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
