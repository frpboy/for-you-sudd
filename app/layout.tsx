import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "for u, sudd",
  description: "A private experience.",
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "for u, sudd",
    description: "A private experience.",
    images: [{ url: "/og-couple.jpg", width: 1200, height: 630, alt: "for u, sudd" }],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
