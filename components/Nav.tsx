"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Nav({ onTrial }: { onTrial: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="text-lg font-bold tracking-tight">
          Tag<span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">Scribe</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onTrial}
            className="text-sm text-zinc-300 transition-colors hover:text-white"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={onTrial}
            className="rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02]"
          >
            Try Free
            <span className="mt-0.5 block text-[10px] font-normal opacity-80">
              No credit card • GCash • Maya
            </span>
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-zinc-300 hover:bg-white/5 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-zinc-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onTrial();
              }}
              className="mt-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Try Free — No Credit Card (GCash • Maya)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
