import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/BookingModal";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "VIIV Wellness Haus | Miami Beach Med Spa",
  description:
    "Experience an all-inclusive Med Spa in Miami Beach, FL offering the latest techniques in cosmetic injectables, skincare treatments, and wellness therapies.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="min-h-full flex flex-col">
        <BookingProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
