"use client";

import { motion } from "framer-motion";
import { Upload, Captions, Palette } from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "1. Upload your video",
    text: "Drop in any MP4 from TikTok, Reels, YouTube, or class projects. Free tier covers 10 mins/mo.",
  },
  {
    icon: Captions,
    title: "2. AI transcribes Taglish",
    text: "Fine-tuned detection handles code-switching and slang, aligned word-by-word on the timeline.",
  },
  {
    icon: Palette,
    title: "3. Style & export",
    text: "Pick a local font preset, remove the watermark, and render — 70% faster than manual subtitles.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          From upload to captioned in 3 steps
        </motion.h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-[#0A0A0B] p-6"
            >
              <span className="inline-flex rounded-lg bg-gradient-to-br from-violet-500/25 to-cyan-500/25 p-2.5 text-cyan-300">
                <s.icon size={20} />
              </span>
              <h3 className="mt-4 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
