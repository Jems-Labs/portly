import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google"; 

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GlobalStateInitializer } from "@/components/GlobalStateInitializer";


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portly",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} ${playfair.variable} font-sans`}>
        <GlobalStateInitializer />
        {children}
        <Toaster position="top-center"/>
      </body>
    </html>
  );
}
