import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./components/providers/Providers";
import AppWrapper from "./components/layout/AppWrapper";
import { RootProvider } from "fumadocs-ui/provider";
import { ThemeProvider } from "next-themes";

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
      >
        <Providers>
          <AppWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              forcedTheme="dark"
              enableSystem={false}
            >
              <RootProvider search={{ enabled: false }}>
                {children}
              </RootProvider>
            </ThemeProvider>
          </AppWrapper>
        </Providers>
      </body>
    </html>
  );
}
