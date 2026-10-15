"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

export default function VideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Watch 45 second pitch video"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
      >
        <div className="flex items-center justify-between px-5 py-3">
          <p className="text-sm font-semibold">TagScribe in 45 seconds</p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        <div className="relative flex aspect-video flex-col items-center justify-center bg-gradient-to-br from-violet-900/60 via-zinc-900 to-cyan-900/40">
          <button
            type="button"
            aria-label="Play pitch video"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-xl transition-transform hover:scale-105"
          >
            <Play size={24} className="ml-1" />
          </button>
          <p className="mt-4 max-w-sm px-6 text-center text-sm text-zinc-300">
            “Hello mga lods” — watch Taglish captions generate live, styled for
            TikTok &amp; Reels.
          </p>
          <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-zinc-300">
            00:45
          </span>
        </div>
      </motion.div>
    </div>
  );
}
