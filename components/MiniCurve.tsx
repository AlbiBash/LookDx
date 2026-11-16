import { pathFor } from "@/lib/curve";
import type { Peak } from "@/lib/kits";

export function MiniCurve({ peaks, className }: { peaks: Peak[]; className?: string }) {
  const lo = Math.min(...peaks.map((p) => p.tm)) - 5;
  const hi = Math.max(...peaks.map((p) => p.tm)) + 5;
  return (
    <svg viewBox="0 0 200 56" className={className ?? "mini"} aria-hidden preserveAspectRatio="none">
      <line x1={0} x2={200} y1={55} y2={55} stroke="var(--ink)" strokeWidth={1.5} />
      <path d={pathFor(peaks, 200, 54, "derivative", lo, hi, 1.15)} fill="none" stroke="var(--ink)" strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
