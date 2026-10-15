"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Showcase from "@/components/Showcase";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import UploadModal from "@/components/UploadModal";
import VideoModal from "@/components/VideoModal";

export default function Home() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-zinc-100">
      <Nav onTrial={() => setUploadOpen(true)} />
      <Hero onUpload={() => setUploadOpen(true)} onVideo={() => setVideoOpen(true)} />
      <SocialProof />
      <Showcase />
      <HowItWorks />
      <Pricing onChoose={() => setUploadOpen(true)} />
      <FAQ />
      <Footer />
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </main>
  );
}
