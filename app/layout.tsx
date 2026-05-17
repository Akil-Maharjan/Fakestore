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
        
<script src="https://orbitchat-fronted.vercel.app/widget/chat-widget.iife.js"
  data-chatbot-id="b9a32d74-fb98-42ef-b57f-6b665a32b424"
  data-api-key="vrit_N3wOtP7zCw7V4nCtExYiQOM4FK3xmtyMT8HmWGDfkno"
  data-api-endpoint="https://test.orbitchat.ai"
  data-right-offset="40"
  data-bottom-offset="40"
  data-z-index="9999"
  async>
</script>
      </body>
      
    </html>
  );
}
