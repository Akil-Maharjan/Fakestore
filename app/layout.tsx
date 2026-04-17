import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/providers/ClientProviders";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fake Store - Production E-commerce Dashboard",
  description: "A production-ready e-commerce dashboard built with Next.js 15, TypeScript, and Fake Store API integration",
  keywords: ["e-commerce", "dashboard", "next.js", "typescript", "fake store api"],
  authors: [{ name: "Developer" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased font`}>
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
<Script 
id=""
src="https://orbitchat-fronted.vercel.app/widget/chat-widget.iife.js"
  data-chatbot-id="a673d389-21bb-40e4-9961-b0da2969028e"
  data-api-key="vrit_l_2i2asL1KxAqbpoh9drcgE2bTrRT0WbQ6M1DmhlYZw"
  data-api-endpoint="https://test.orbitchat.ai"
  data-right-offset="40"
  data-bottom-offset="40"
  data-z-index="9999" 
  >
</Script>
      </body>
      
    </html>
  );
}
