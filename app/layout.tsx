import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0A0A0B] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
