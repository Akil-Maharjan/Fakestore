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
        <script src="https://cdn.chatbot.co/widget.min.js" 
  data-chatbot-id="64ec5db1-6638-4031-a7b1-c6945640aa4a"
  data-api-key="vrit_RM0mph-OrAZTKzvt9mICEZMjoidZRoyRc0IysJRJlAE"
  data-domain-name="fakestore-gules.vercel.app"
  data-brand-name="OTT SATHI"
  data-primary-color="#3a54ed"
  data-position="bottom-right"
  async>
</script>
      </body>
      
    </html>
  );
}
