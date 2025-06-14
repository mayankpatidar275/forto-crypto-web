import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./components/providers/Providers";
import AppWrapper from "./components/layout/AppWrapper";
import { RootProvider } from "fumadocs-ui/provider";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forto - SweepStakes",
  description: "Forto - SweepStakes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased min-h-screen flex flex-col`}
        // you can use Tailwind CSS too
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   minHeight: "100vh",
        // }}
      >
        <Providers>
          <AppWrapper>
            <RootProvider
              // theme={{ enabled: false }}
              search={{ enabled: false }}
            >
              {children}
            </RootProvider>
          </AppWrapper>
        </Providers>
      </body>
    </html>
  );
}
