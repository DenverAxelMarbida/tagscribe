"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, FileVideo, CheckCircle2 } from "lucide-react";

function trapTab(container: HTMLElement | null, e: KeyboardEvent) {
  if (!container || e.key !== "Tab") return;
  const items = Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("disabled"));
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement as HTMLElement | null;
  if (e.shiftKey && (active === first || !container.contains(active))) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}

export default function UploadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [drag, setDrag] = useState(false);
  const [fileName, setFileName] = useState("vlog_ep12_final.mp4");
  const [progress, setProgress] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setProgress(null);
    setDrag(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    const closeBtn = boxRef.current?.querySelector<HTMLElement>("button");
    closeBtn?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      trapTab(boxRef.current, e);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timer.current) clearInterval(timer.current);
      triggerRef.current?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  if (!open) return null;

  const startFakeUpload = (name?: string) => {
    if (progress !== null) return;
    if (name) setFileName(name);
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

  const acceptFile = (f: File | undefined) => {
    if (!f) return;
    const ok = /\.(mp4|mov|webm|mkv)$/i.test(f.name) || f.type.startsWith("video/");
    if (!ok) {
      setFileName(f.name + " (unsupported — MP4/MOV only)");
      return;
    }
    startFakeUpload(f.name);
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
        ref={boxRef}
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
              Back to site
            </button>
          </div>
        ) : (
          <>
            <input
              ref={fileRef}
              type="file"
              accept="video/mp4,video/quicktime,video/webm,.mp4,.mov"
              className="sr-only"
              aria-label="Choose a video file"
              onChange={(e) => acceptFile(e.target.files?.[0])}
            />
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload a video file"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                acceptFile(e.dataTransfer.files?.[0]);
              }}
              className={`mt-5 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors ${
                drag ? "border-cyan-400 bg-cyan-400/5" : "border-white/15 hover:border-violet-500/50"
              }`}
              onClick={() => fileRef.current?.click()}
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
                  <span className="truncate">{fileName}</span>
                  <span className="ml-auto shrink-0 text-xs text-zinc-500">{progress}%</span>
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
