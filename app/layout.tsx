import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "TagScribe — Instant Taglish Captions",
  description:
    "Stop wasting hours fixing code-switching subtitles manually. The first AI captioning tool built specifically for Filipino creators, student editors, and video agencies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${grotesk.variable}`}>
      <body className="overflow-x-clip bg-[#0A0A0B] font-sans text-zinc-100 antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
