"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";

export default function Home() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-zinc-100">
      <Nav onTrial={() => setUploadOpen(true)} />
      <Hero onUpload={() => setUploadOpen(true)} onVideo={() => setVideoOpen(true)} />
      <SocialProof />
      {uploadOpen && <div data-testid="upload-modal-pending" className="hidden" />}
      {videoOpen && <div data-testid="video-modal-pending" className="hidden" />}
    </main>
  );
}
