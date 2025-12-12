import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LivePreviewProvider from "@/components/LivePreviewProvider";
import { getLivePreviewConfig } from "@/lib/live-preview";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Engineering Hub",
  description: "Engineering documentation and resources for Contentstack developers and QA teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const livePreviewConfig = getLivePreviewConfig();

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <LivePreviewProvider config={livePreviewConfig} />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
