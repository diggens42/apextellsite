import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, Cormorant_Garamond } from "next/font/google";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CookieBanner from "./components/layout/CookieBanner";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "ApexTell — The Edge. The Data. The Win.",
    template: "%s | ApexTell",
  },
  description:
    "The all-in-one poker HUD, tracker, solver, trainer, and AI coach. Local-first, private, powerful.",
  keywords: ["poker", "HUD", "tracker", "solver", "GTO", "poker software"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${dmMono.variable} ${cormorantGaramond.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-16">{children}</div>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
