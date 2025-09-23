"use client";

import Footer from "./BFooter";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Header from "./BHeader";
import { useStoreUserOnLogin } from "@/custom-hooks/useStoreUserOnLogin";

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
      <div className="glow-top-light"></div>
      <div className="scan-line"></div>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
