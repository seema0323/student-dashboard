import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduFlow - Student Dashboard",
  description: "A high-fidelity learning dashboard with real-time course tracking and activity visualization",
  keywords: ["education", "dashboard", "learning", "courses", "progress"],
  authors: [{ name: "EduFlow Team" }],
  openGraph: {
    title: "EduFlow - Student Dashboard",
    description: "Track your learning journey with beautiful animations and real-time data",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
