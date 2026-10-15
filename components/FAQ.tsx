"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-3xl font-extrabold tracking-tight">
        Frequently asked questions
      </h2>
      <div className="mt-8 flex flex-col gap-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold"
              >
                {f.q}
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{f.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
