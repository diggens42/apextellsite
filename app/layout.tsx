import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, Space_Grotesk } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "ApexTell — See Everything. Solve Anything. Win More.",
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
        className={`${bebasNeue.variable} ${dmMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-crimson focus:px-4 focus:py-2 focus:text-white focus:font-sans focus:text-sm"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="pt-16">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
