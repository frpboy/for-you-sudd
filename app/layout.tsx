import type { Metadata } from "next";
import Script from "next/script";
import { AmbientAudio } from "@/components/ambient-audio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://for-you-sudd.vercel.app"),
  title: "for u, sudd",
  description: "A private experience.",
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/icon.svg" },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "for u, sudd" },
  openGraph: {
    title: "for u, sudd",
    description: "A private experience.",
    images: [{ url: "/og-couple.jpg", width: 1200, height: 630, alt: "for u, sudd" }],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><meta id="app-theme-color" name="theme-color" content="#F6F0E6" /><meta id="app-color-scheme" name="color-scheme" content="light" /></head><body><AmbientAudio />{children}<Script id="microsoft-clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","xw3s9o3yx6");`}</Script></body></html>;
}
