"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRICING_TIERS, type BillingCycle } from "@/lib/constants";

function price(t: (typeof PRICING_TIERS)[number], billing: BillingCycle) {
  if (t.monthly === 0) return "₱0";
  return billing === "monthly" ? `₱${t.monthly}/mo` : `₱${t.annual}/yr`;
}

export default function Pricing({ onChoose }: { onChoose: (tier: string) => void }) {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
        Simple pricing in pesos
      </h2>
      <p className="mt-3 text-center text-sm text-zinc-400">
        Pay with GCash or Maya. Cancel anytime.
      </p>

      <div className="mt-8 flex justify-center">
        <div className="relative flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {(["monthly", "annual"] as BillingCycle[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setBilling(c)}
              aria-pressed={billing === c}
              className={`relative rounded-lg px-5 py-2 text-sm font-medium capitalize transition-colors ${
                billing === c ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {billing === c && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">
                {c === "monthly" ? "Monthly" : "Annual"}
                {c === "annual" && (
                  <span className="ml-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] text-emerald-300">
                    12× value
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {PRICING_TIERS.map((t) => (
          <div
            key={t.id}
            className={`relative flex flex-col rounded-2xl border p-6 ${
              "popular" in t && t.popular
                ? "border-violet-500/50 bg-gradient-to-b from-violet-500/10 to-transparent shadow-xl shadow-violet-500/10"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            {"popular" in t && t.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                Most Popular
              </span>
            )}
            <h3 className="font-bold">{t.name}</h3>
            <p className="mt-2 text-3xl font-extrabold">{price(t, billing)}</p>
            <p className="mt-1 text-xs text-zinc-500">
              {t.monthly === 0
                ? "Free forever"
                : billing === "monthly"
                  ? `or ₱${t.annual.toLocaleString()}/yr annually`
                  : `= ₱${t.monthly.toLocaleString()}/mo billed annually`}
            </p>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-zinc-300">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onChoose(t.name)}
              className={`mt-6 rounded-xl px-4 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                "popular" in t && t.popular
                  ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/25"
                  : "border border-white/15 bg-white/5 text-zinc-100 hover:bg-white/10"
              }`}
            >
              {t.cta}
            </button>
            <p className="mt-3 text-center text-[11px] text-zinc-500">
              <span className="rounded bg-white/5 px-1.5 py-0.5 font-semibold text-zinc-400">GCash</span>{" "}
              <span className="rounded bg-white/5 px-1.5 py-0.5 font-semibold text-zinc-400">Maya</span>{" "}
              accepted
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
