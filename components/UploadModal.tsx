"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, FileVideo, CheckCircle2 } from "lucide-react";

export default function UploadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setProgress(null);
    setDrag(false);
  }, []);

  useEffect(() => {
    if (!open) reset();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer.current) clearInterval(timer.current);
    };
  }, [open, onClose, reset]);

  if (!open) return null;

  const startFakeUpload = () => {
    if (progress !== null) return;
    setProgress(0);
    timer.current = setInterval(() => {
      setProgress((p) => {
        if (p === null) return null;
        if (p >= 100) {
          if (timer.current) clearInterval(timer.current);
          return 100;
        }
        return p + 8;
      });
    }, 160);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Start captioning for free"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Start captioning for free</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {progress === 100 ? (
          <div className="mt-6 text-center">
            <CheckCircle2 size={40} className="mx-auto text-emerald-400" />
            <p className="mt-3 font-semibold">Upload complete!</p>
            <p className="mt-1 text-sm text-zinc-400">
              Your 10 free minutes are ready. Taglish transcription would start
              here in the full app.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white"
            >
              Open caption editor
            </button>
          </div>
        ) : (
          <>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                startFakeUpload();
              }}
              className={`mt-5 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors ${
                drag ? "border-cyan-400 bg-cyan-400/5" : "border-white/15 hover:border-violet-500/50"
              }`}
              onClick={startFakeUpload}
            >
              <UploadCloud size={32} className="text-violet-300" />
              <p className="mt-3 text-sm font-medium">
                Drag &amp; drop your video, or click to browse
              </p>
              <p className="mt-1 text-xs text-zinc-500">MP4, MOV up to 500MB • first 10 mins free</p>
            </div>
            {progress !== null && (
              <div className="mt-4">
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <FileVideo size={16} />
                  vlog_ep12_final.mp4
                  <span className="ml-auto text-xs text-zinc-500">{progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            <p className="mt-4 text-center text-[11px] text-zinc-500">
              Demo only — no file leaves your browser. GCash &amp; Maya accepted on paid plans.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
