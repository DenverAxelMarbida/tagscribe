"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SCREEN_SHOTS } from "@/lib/constants";

const AUTOPLAY_MS = 5000;

export default function Screens() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [retry, setRetry] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (i + SCREEN_SHOTS.length) % SCREEN_SHOTS.length;
    const child = track.children[clamped] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
    setActive(clamped);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => {
      if (!pausedRef.current && document.visibilityState === "visible") {
        scrollTo(active + 1);
      } else {
        setRetry((r) => r + 1);
      }
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, retry, reduceMotion, scrollTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const dist = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="screens" className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-16 sm:py-20">
      <span aria-hidden="true" className="ghost-word pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[18vw] font-bold leading-none sm:text-[9rem]">
        APP TOUR
      </span>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          See what TagScribe actually looks like
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-400 sm:text-base">
          Real screens from the app — from upload to captioned export. Swipe
          through the full workflow.
        </p>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
          aria-roledescription="carousel"
          aria-label="TagScribe app screenshots. Auto-advances every 5 seconds. Swipe to explore."
          onPointerDown={() => {
            pausedRef.current = true;
          }}
          onPointerUp={() => {
            setTimeout(() => {
              pausedRef.current = false;
            }, AUTOPLAY_MS);
          }}
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onFocus={() => {
            pausedRef.current = true;
          }}
          onBlur={() => {
            pausedRef.current = false;
          }}
        >
          {SCREEN_SHOTS.map((s, i) => (
            <article
              key={s.src}
              className="w-[85%] shrink-0 snap-center sm:w-[70%] lg:w-[60%]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SCREEN_SHOTS.length}: ${s.title}`}
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 shadow-2xl shadow-violet-500/10">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 truncate rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-zinc-400">
                    {s.url}
                  </span>
                </div>
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 60vw"
                    className="object-cover object-top"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="font-display text-base font-semibold">
                  <span className="mr-2 rounded-md bg-violet-500/15 px-2 py-0.5 text-xs text-violet-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </p>
                <p className="mx-auto mt-1.5 max-w-md text-sm text-zinc-400">{s.caption}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="flex gap-2" role="tablist" aria-label="Choose screenshot">
            {SCREEN_SHOTS.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Go to ${s.title}`}
                onClick={() => scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "w-6 bg-gradient-to-r from-violet-500 to-cyan-400" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
