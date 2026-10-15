"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

export default function VideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [started, setStarted] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      setStarted(false);
      return;
    }
    triggerRef.current = document.activeElement as HTMLElement | null;
    boxRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && boxRef.current) {
        const items = Array.from(
          boxRef.current.querySelectorAll<HTMLElement>("button, [href], input")
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open, onClose]);

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
        ref={boxRef}
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
          {!started ? (
            <>
              <button
                type="button"
                aria-label="Play pitch video"
                onClick={() => setStarted(true)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-xl transition-transform hover:scale-105"
              >
                <Play size={24} className="ml-1" />
              </button>
              <p className="mt-4 max-w-sm px-6 text-center text-sm text-zinc-300">
                “Hello mga lods” — watch Taglish captions generate live, styled for
                TikTok &amp; Reels.
              </p>
            </>
          ) : (
            <div className="max-w-sm px-6 text-center">
              <p className="font-semibold">The 45s pitch premieres at launch</p>
              <p className="mt-2 text-sm text-zinc-300">
                Join the Discord community to catch the premiere and get early
                Creator Pro access.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Back to site
              </button>
            </div>
          )}
          <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-zinc-300">
            00:45
          </span>
        </div>
      </motion.div>
    </div>
  );
}
