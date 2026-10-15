const SLANG = [
  "lods",
  "gets",
  "charot",
  "keri",
  "jowa",
  "eme",
  "skl",
  "werpa",
  "petmalu",
  "sana all",
  "awit",
  "lodi",
];

export default function Ticker() {
  const row = [...SLANG, ...SLANG];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-3" aria-hidden="true">
      <div className="ticker-mask overflow-hidden">
        <div className="ticker-track flex w-max items-center gap-8 pr-8">
          {row.map((s, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span
                className={`font-display text-sm font-semibold tracking-wide ${
                  i % 3 === 0 ? "text-violet-300" : i % 3 === 1 ? "text-cyan-300" : "text-zinc-500"
                }`}
              >
                {s}
              </span>
              <span className="text-[10px] text-zinc-600">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
