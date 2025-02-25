import { QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import ProviderWrapper from "./ProviderWrapper";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Burnt Pay",
  description: "Next-gen crypto payments built on the XION blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <link
          href="https://db.onlinewebfonts.com/c/a09cc1fff02da4cda4da3eb1fb54c12f?family=Rational+Text+DEMO+SemiBold"
          rel="stylesheet"
        />
        <link
          href="https://db.onlinewebfonts.com/c/09545c17c66618f72912378877e5e45f?family=Rational+Text+DEMO+Light"
          rel="stylesheet"
        />
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
