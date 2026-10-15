"use client";

import { useState } from "react";
import { CONTACT_EMAIL, FOOTER_NOTE } from "@/lib/constants";

const SOON_LINKS = ["Terms of Service", "Privacy Policy", "Discord Community"];

export default function Footer() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold tracking-tight">
            Tag<span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">Scribe</span>
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Instant, accurate Taglish captions for Filipino creators.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-block text-sm text-cyan-300 hover:text-cyan-200"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-2.5">
            <p className="font-semibold text-zinc-200">Product</p>
            <a href="#features" className="text-zinc-400 hover:text-white">Features</a>
            <a href="#pricing" className="text-zinc-400 hover:text-white">Pricing</a>
            <a href="#faqs" className="text-zinc-400 hover:text-white">FAQs</a>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="font-semibold text-zinc-200">Legal</p>
            {SOON_LINKS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setNotice(`${l} ships at launch — email ${CONTACT_EMAIL} for early access.`)}
                className="text-left text-zinc-400 hover:text-white"
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-zinc-400 md:text-right">
          <p>Native GCash &amp; Maya checkout.</p>
          <p className="mt-1">Made for Filipino creators, editors &amp; agencies.</p>
          {notice && (
            <p role="status" className="mt-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2.5 text-xs text-cyan-200">
              {notice}
            </p>
          )}
        </div>
      </div>
      <div className="overflow-hidden border-t border-white/10">
        <p aria-hidden="true" className="ghost-word whitespace-nowrap text-center font-display text-[19vw] font-bold leading-[0.9] sm:text-[10rem]">
          TagScribe
        </p>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-xs text-zinc-500 sm:px-6">
          {FOOTER_NOTE}
        </p>
      </div>
    </footer>
  );
}
