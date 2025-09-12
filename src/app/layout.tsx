import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EligibilityProvider } from "@/features/check-eligibility/context/eligibility-context";
import { QueryProvider } from "@/lib/query-client";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TotallyMoney - Credit Card Eligibility Checker",
  description: "Check your credit card eligibility and find the best deals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <EligibilityProvider>
            <Header />
            {children}
          </EligibilityProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
