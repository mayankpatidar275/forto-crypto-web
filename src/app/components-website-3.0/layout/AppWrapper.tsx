"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useStoreUserOnLogin } from "@/custom-hooks/useStoreUserOnLogin";
import Header from "./BHeader";
import Footer from "./BFooter";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDocsPage = pathname.startsWith("/docs");

  useStoreUserOnLogin();

  // If docs page, skip header/footer but still return children
  if (isDocsPage) return <>{children}</>;

  return (
    <>
      <Toaster position="bottom-right" />
      {/* <div className="glow-top-light"></div> */}
      {/* <div className="scan-line"></div> */}
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
