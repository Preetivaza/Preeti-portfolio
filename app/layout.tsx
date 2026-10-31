import "./globals.css";
import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
const display = Sora({ subsets: ["latin"], variable: "--f-display" });
const body = Inter({ subsets: ["latin"], variable: "--f-body" });
const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "Preeti Vaza | Full-Stack Developer & AI/ML Engineer",
  description: "Portfolio of Preeti Vaza, a Computer Engineering student building MERN applications and machine learning systems. View projects, experience and resume.",
  openGraph: { title: "Preeti Vaza | Developer Portfolio", description: "MERN, Python, machine learning and GenAI projects.", type: "website", images: ["/preeti.png"] },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${display.variable} ${body.variable} font-sans antialiased`}>{children}</body></html>;
}
