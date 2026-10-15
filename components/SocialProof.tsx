import { Zap, Languages, Wallet } from "lucide-react";
import { METRICS } from "@/lib/constants";

const ICONS = [Zap, Languages, Wallet];

export default function SocialProof() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {METRICS.map((m, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div key={m.label} className="flex items-center gap-4 px-4 py-6 sm:justify-center sm:px-8">
              <span className="rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 p-2.5 text-cyan-300">
                <Icon size={20} />
              </span>
              <div>
                <p className="font-bold">{m.value}</p>
                <p className="text-sm text-zinc-400">{m.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
