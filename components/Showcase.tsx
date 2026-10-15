"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, Type, Download, Wand2 } from "lucide-react";
import { SHOWCASE_TABS } from "@/lib/constants";

const SLANG = ["lods", "gets", "charot", "jowa", "keri"];

function DetectionMockup() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-red-400">
          <X size={14} /> Generic tool
        </p>
        <p className="text-sm leading-relaxed text-zinc-400">
          “Hello mga loads, guess niyo ba? Carrot lung!”
        </p>
        <p className="mt-3 text-xs text-zinc-500">3 misheard words • manual fix ~20 min</p>
      </div>
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
          <Check size={14} /> TagScribe
        </p>
        <p className="text-sm leading-relaxed text-zinc-100">
          “Hello mga <mark className="rounded bg-violet-500/30 px-1">lods</mark>,{" "}
          <mark className="rounded bg-violet-500/30 px-1">gets</mark> niyo ba?{" "}
          <mark className="rounded bg-violet-500/30 px-1">Charot</mark> lang!”
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {SLANG.map((s) => (
            <span
              key={s}
              className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[11px] text-violet-300"
            >
              {s} ✓
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineMockup() {
  const [font, setFont] = useState(0);
  const fonts = [
    { name: "TikTok Bold", sample: "HELLO MGA LODS", cls: "font-black tracking-tight" },
    { name: "Reels Rounded", sample: "Hello mga lods", cls: "font-bold" },
    { name: "Vlog Serif", sample: "Hello mga lods", cls: "font-serif italic" },
  ];
  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-white/10 bg-black/40 p-4">
        <div className="flex h-12 items-end gap-1" aria-hidden="true">
          {[55, 80, 45, 90, 60, 75, 40, 85, 65, 95, 50, 70, 88, 58, 78, 48, 68, 92, 54, 74, 62, 84, 44, 66].map(
            (h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className={`w-full rounded-sm ${i >= 6 && i <= 14 ? "bg-cyan-400/80" : "bg-white/15"}`}
              />
            )
          )}
        </div>
        <p className="mt-2 text-center text-xs text-zinc-500">
          Selection: <span className="text-cyan-300">“gets niyo ba?”</span> • 00:14.2 → 00:15.8
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Font preset">
        {fonts.map((f, i) => (
          <button
            key={f.name}
            type="button"
            role="radio"
            aria-checked={font === i}
            onClick={() => setFont(i)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              font === i
                ? "border-violet-500/60 bg-violet-500/10"
                : "border-white/10 bg-white/[0.03] hover:border-violet-500/40"
            }`}
          >
            <Type size={14} className="mb-2 text-violet-300" />
            <p className={`text-white ${f.cls}`}>{f.sample}</p>
            <p className="mt-1 text-xs text-zinc-500">
              {f.name}{font === i ? " • selected" : ""}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ExportMockup() {
  const [watermark, setWatermark] = useState(true);
  const [rendered, setRendered] = useState(false);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">Format</p>
        {["MP4 1080p + burned-in captions", "SRT sidecar file", "VTT for web players"].map((o, i) => (
          <label key={o} className="mb-2 flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/10 px-3 py-2.5 text-sm hover:border-violet-500/40">
            <input type="radio" name="export-format" defaultChecked={i === 0} className="accent-violet-500" />
            {o}
          </label>
        ))}
      </div>
      <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">Remove watermark</p>
        <button
          type="button"
          role="switch"
          aria-checked={!watermark}
          aria-label="Remove watermark"
          onClick={() => setWatermark((v) => !v)}
          className={`relative h-7 w-12 rounded-full transition-colors ${watermark ? "bg-zinc-700" : "bg-gradient-to-r from-violet-500 to-cyan-500"}`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${watermark ? "left-1" : "left-6"}`}
          />
        </button>
        <p className="mt-2 text-sm text-zinc-300">
          {watermark ? "Free tier: watermark on" : "Creator Pro: watermark removed"}
        </p>
        <button
          type="button"
          onClick={() => setRendered(true)}
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Download size={15} /> {rendered ? "Added to render queue" : "Render video"}
        </button>
        {rendered && (
          <p className="mt-2 text-xs text-emerald-300">
            Demo render queued — Creator Pro unlocks high-speed rendering.
          </p>
        )}
      </div>
    </div>
  );
}

const MOCKUPS = [DetectionMockup, TimelineMockup, ExportMockup];
const TAB_ICONS = [Wand2, Type, Download];

export default function Showcase() {
  const [active, setActive] = useState(0);
  const Mockup = MOCKUPS[active];

  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-cyan-400">
        Product tour
      </p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="mx-auto mt-3 max-w-2xl text-center text-3xl font-extrabold tracking-tight sm:text-4xl"
      >
        Everything Taglish video needs, nothing it doesn&apos;t
      </motion.h2>

      <div
        className="mt-8 flex flex-col justify-center gap-2 sm:flex-row"
        role="tablist"
        aria-label="Feature showcase"
        onKeyDown={(e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          e.preventDefault();
          setActive((a) => (e.key === "ArrowRight" ? (a + 1) % SHOWCASE_TABS.length : (a - 1 + SHOWCASE_TABS.length) % SHOWCASE_TABS.length));
        }}
      >
        {SHOWCASE_TABS.map((t, i) => {
          const Icon = TAB_ICONS[i];
          return (
            <button
              key={t.id}
              role="tab"
              id={`showcase-tab-${t.id}`}
              aria-selected={active === i}
              aria-controls={`showcase-panel-${t.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                active === i
                  ? "border-violet-500/50 bg-violet-500/10 text-white"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Icon size={16} />
              {t.title}
            </button>
          );
        })}
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-zinc-400">
        {SHOWCASE_TABS[active].description}
      </p>

      <div
        className="mx-auto mt-8 max-w-4xl rounded-2xl border border-white/10 bg-zinc-900/50 p-4 sm:p-6"
        role="tabpanel"
        id={`showcase-panel-${SHOWCASE_TABS[active].id}`}
        aria-labelledby={`showcase-tab-${SHOWCASE_TABS[active].id}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Mockup />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
