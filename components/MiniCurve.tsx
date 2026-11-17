import { pathFor } from "@/lib/curve";
import type { Peak } from "@/lib/kits";

export type Tone = "ink" | "lime" | "purple";
const colour: Record<Tone, string> = { ink: "var(--ink)", lime: "var(--accent-line)", purple: "var(--purple-line)" };

export function MiniCurve({ peaks, tone = "ink", className }: { peaks: Peak[]; tone?: Tone; className?: string }) {
  const lo = Math.min(...peaks.map((p) => p.tm)) - 5;
  const hi = Math.max(...peaks.map((p) => p.tm)) + 5;
  const d = pathFor(peaks, 200, 54, "derivative", lo, hi, 1.15);
  const c = colour[tone];
  return (
    <svg viewBox="0 0 200 56" className={className ?? "mini"} aria-hidden preserveAspectRatio="none">
      <path d={`${d} L200,54 L0,54 Z`} fill={c} opacity={0.14} />
      <line x1={0} x2={200} y1={55} y2={55} stroke="var(--ink)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <path d={d} fill="none" stroke={c} strokeWidth={2.4} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
