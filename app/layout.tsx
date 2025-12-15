import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LivePreviewProvider from "@/components/LivePreviewProvider";
import { PersonalizeProvider } from "@/components/context/PersonalizeContext";
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
      <head>
        {/* Lytics Tracking Tag */}
        <Script
          id="lytics-tracking"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
              jstag.init({
                src: 'https://c.lytics.io/api/tag/c927f800bedb87bee5a6d8ae690855bd/latest.min.js'
              });
              jstag.pageView();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <PersonalizeProvider>
          <LivePreviewProvider config={livePreviewConfig} />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </PersonalizeProvider>
      </body>
    </html>
  );
}
