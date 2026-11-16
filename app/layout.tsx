import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", weight: "100 900", display: "swap", variable: "--font" });

export const metadata: Metadata = {
  title: { default: "LookDx — HRM primer & probe kits", template: "%s — LookDx" },
  description: "Multiplexed HRM genotyping kits resolved by melt temperature, run on the real-time instrument you already own.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
