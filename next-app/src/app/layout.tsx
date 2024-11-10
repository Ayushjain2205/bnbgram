import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Providers from "./Providers";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "BNBgram",
  description: "Gateway to the binance ecosystem through telegram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
      </body>
    </html>
  );
}
