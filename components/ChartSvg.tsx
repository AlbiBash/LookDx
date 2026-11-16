import { pathFor, T_MIN, T_MAX, type Gauss } from "@/lib/curve";

export type Line = {
  id: string;
  gauss: Gauss[];
  style: "solid" | "accent" | "dashed" | "grey";
};

const W = 800;
const H = 300;

const stroke = (s: Line["style"]) =>
  s === "accent" ? "var(--accent)" : s === "grey" ? "var(--grey-line)" : "var(--ink)";

export function ChartSvg({
  lines,
  mode,
  active,
  ticks,
  tMin = T_MIN,
  tMax = T_MAX,
  label,
}: {
  lines: Line[];
  mode: "derivative" | "normalised";
  active: string | null;
  ticks: number[];
  tMin?: number;
  tMax?: number;
  label: string;
}) {
  return (
    <svg viewBox={`0 0 ${W} ${H + 28}`} role="img" aria-label={label} className="chart-svg" preserveAspectRatio="none">
      {ticks.map((t) => {
        const x = ((t - tMin) / (tMax - tMin)) * W;
        return (
          <g key={t}>
            <line x1={x} x2={x} y1={0} y2={H} className="grid" />
            <text x={x} y={H + 20} textAnchor="middle" className="tick">
              {t}
              {t === ticks[ticks.length - 1] ? " °C" : ""}
            </text>
          </g>
        );
      })}
      <line x1={0} x2={W} y1={H} y2={H} stroke="var(--ink)" strokeWidth={1.5} />
      {lines.map((l) => {
        const dim = active !== null && active !== l.id;
        return (
          <path
            key={l.id}
            d={pathFor(l.gauss, W, H - 2, mode, tMin, tMax)}
            fill="none"
            stroke={stroke(l.style)}
            strokeWidth={2.2}
            strokeDasharray={l.style === "dashed" ? "5 4" : undefined}
            opacity={dim ? 0.15 : 1}
            vectorEffect="non-scaling-stroke"
            className="curve"
          />
        );
      })}
    </svg>
  );
}
