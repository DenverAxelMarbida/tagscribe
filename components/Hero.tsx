"use client";

import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import HeroMockup from "./HeroMockup";

export default function Hero({
  onUpload,
  onVideo,
}: {
  onUpload: () => void;
  onVideo: () => void;
}) {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300"
          >
            <Sparkles size={12} />
            Built for Filipino creators
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          >
            Instant, Accurate{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Taglish Captions
            </span>{" "}
            in Seconds.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Stop wasting hours fixing code-switching subtitles manually. The
            first AI captioning tool built specifically for Filipino creators,
            student editors, and video agencies.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={onUpload}
              className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition-transform hover:scale-[1.02]"
            >
              Start Captioning for Free
            </button>
            <button
              type="button"
              onClick={onVideo}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-100 transition-colors hover:bg-white/10"
            >
              <Play size={16} />
              Watch 45s Pitch Video
            </button>
          </motion.div>
          <p className="mt-4 text-xs text-zinc-500">
            Free 10 mins/mo • No credit card • GCash &amp; Maya accepted
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <HeroMockup />
        </motion.div>
      </div>
    </section>
  );
}
