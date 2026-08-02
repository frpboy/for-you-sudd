import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "for u, sudd", description: "A private experience.", robots: { index: false, follow: false, nocache: true }, openGraph: { title: "for u, sudd", description: "A private experience." } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
