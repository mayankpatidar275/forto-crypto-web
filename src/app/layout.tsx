// import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./components/providers/Providers";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "@next/third-parties/google";
import AppWrapper from "./components-website-3.0/layout/AppWrapper";
import { Funnel_Display } from "next/font/google";

export const funnel = Funnel_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap", // for better rendering
});

// TODO: OPTI: If you're using multiple weights later (e.g., 400, 700), preload them here together.
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap", // for better rendering
});

// export const metadata: Metadata = {
//   title: "Forto Token: 1 Entry, Multiple Chances to Win, Life Changing Prices",
//   description:
//     "Forto Token isn't just a lottery, it's a revolution. For the first time, your single ticket is your key to winning multiple times. Multiple winners, Multiple Chances and life changing prices",
// };

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
              defaultTheme="light"
              forcedTheme="light"
              enableSystem={false}
            >
              {children}
            </ThemeProvider>
          </AppWrapper>
        </Providers>
      </body>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID &&
        process.env.NEXT_PUBLIC_NODE_ENV === "production" && (
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
          />
        )}
    </html>
  );
}
