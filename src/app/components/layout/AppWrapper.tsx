"use client";

import { usePrivy } from "@privy-io/react-auth";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "../ui/Loader";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready } = usePrivy();

  if (!ready) return <Loader className="mx-auto my-auto" />;

  return (
    <>
      <div className="glow-top"></div>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
