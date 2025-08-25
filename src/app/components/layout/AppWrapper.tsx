"use client";

import Footer from "./Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Header from "./Header";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDocsPage = pathname.startsWith("/docs");

  // If docs page, skip header/footer but still return children
  if (isDocsPage) return <>{children}</>;

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="glow-top"></div>
      <div className="scan-line"></div>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
