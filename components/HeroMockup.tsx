"use client";

import { useEffect, useMemo, useState } from "react";
import { BadgeCheck } from "lucide-react";

const FULL_LINE = "Hello mga lods, gets niyo ba? Charot lang!";
const WORDS = FULL_LINE.split(" ");
const WAVEFORM = [38, 62, 45, 80, 55, 92, 70, 48, 76, 60, 88, 52, 68, 90, 58, 74, 42, 66, 84, 50, 72, 60, 82, 46];

export default function HeroMockup() {
  const [chars, setChars] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (chars >= FULL_LINE.length) {
      const pause = setTimeout(() => {
        setChars(0);
        setCycle((c) => c + 1);
      }, 2200);
      return () => clearTimeout(pause);
    }
    const t = setTimeout(() => setChars((c) => c + 1), 55);
    return () => clearTimeout(t);
  }, [chars]);

  const typed = FULL_LINE.slice(0, chars);
  const activeWord = useMemo(() => {
    const count = typed.split(" ").length - 1;
    return typed.endsWith(" ") ? count - 1 : count;
  }, [typed]);

  const startOf = (i: number) =>
    i === 0 ? 0 : WORDS.slice(0, i).join(" ").length + 1;
  const renderWord = (w: string, i: number) => {
    const start = startOf(i);
    const done = chars >= start + w.length;
    const current = i === activeWord && chars > start && !done;
    return (
      <span
        key={`${cycle}-${i}`}
        className={
          current
            ? "rounded bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent"
            : done
              ? "text-white"
              : "text-zinc-600"
        }
      >
        {w}{" "}
      </span>
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-2xl shadow-violet-500/10">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 rounded-md bg-white/5 px-3 py-1 text-xs text-zinc-400">
          tagscribe.ai/editor
        </span>
        <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Transcribing
        </span>
      </div>

      <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 px-4 py-8 sm:px-8">
        <p className="text-center text-sm text-zinc-500">vlog_ep12_final.mp4</p>
        <div className="mx-auto mt-4 max-w-md rounded-xl bg-black/60 px-4 py-5 text-center">
          <p key={cycle} className="min-h-[4.5rem] break-words text-lg font-bold leading-snug sm:text-xl" aria-live="polite">
            <span className="block">
              {WORDS.slice(0, 6).map((w, k) => renderWord(w, k))}
            </span>
            <span className="block">
              {WORDS.slice(6).map((w, k) => renderWord(w, k + 6))}
              <span className="animate-pulse text-cyan-400">|</span>
            </span>
          </p>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-violet-500/15 px-2.5 py-1 text-[11px] text-violet-300">
            <BadgeCheck size={12} /> Taglish 98%
          </span>
          <span className="flex items-center gap-1 rounded-full bg-cyan-500/15 px-2.5 py-1 text-[11px] text-cyan-300">
            <BadgeCheck size={12} /> Slang 97%
          </span>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex h-10 items-end justify-between gap-1" aria-hidden="true">
          {WAVEFORM.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className="w-full rounded-sm bg-gradient-to-t from-violet-500/70 to-cyan-400/70"
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-zinc-500">
          <span>00:12</span>
          <span>Word-level alignment • 24 words</span>
          <span>00:47</span>
        </div>
      </div>
    </div>
  );
}
