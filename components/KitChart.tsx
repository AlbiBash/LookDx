"use client";
import { useState } from "react";
import { ChartSvg, type Line } from "./ChartSvg";
import type { Kit } from "@/lib/kits";

const styles = { wt: "solid", het: "accent", hom: "dashed" } as const;

export function KitChart({ kit }: { kit: Kit }) {
  const [mode, setMode] = useState<"derivative" | "normalised">("derivative");
  const lines: Line[] = kit.genotypes.map((g) => ({ id: g.id, style: styles[g.id], gauss: g.peaks }));
  const all = kit.genotypes.flatMap((g) => g.peaks.map((p) => p.tm));
  const lo = Math.floor(Math.min(...all) - 5);
  const ticks: number[] = [];
  for (let t = lo; t <= lo + 10; t += 2) ticks.push(t);

  return (
    <figure className="figure">
      <figcaption className="fig-head">
        <span>
          <span className="caps">Fig. 1 — Reference melt profile</span>
          <br />
          <span className="muted small">Illustrative. Replace with verification data.</span>
        </span>
        <span className="toggle" role="group" aria-label="Plot mode">
          {(["derivative", "normalised"] as const).map((m) => (
            <button key={m} aria-pressed={mode === m} onClick={() => setMode(m)}>
              {m === "derivative" ? "Derivative" : "Normalised"}
            </button>
          ))}
        </span>
      </figcaption>
      <div className="axis-label small muted">{mode === "derivative" ? "−dF/dT" : "Fluorescence, normalised"}</div>
      <ChartSvg lines={lines} mode={mode} active={null} ticks={ticks} tMin={lo} tMax={lo + 10} label={`Reference melt profile for ${kit.name}`} />
      <ul className="legend">
        {kit.genotypes.map((g) => (
          <li key={g.id}>
            <span className={`swatch ${styles[g.id]}`} aria-hidden />
            <strong>{g.label}</strong>
            <small>
              {g.shape} · {g.tmText}
            </small>
          </li>
        ))}
      </ul>
    </figure>
  );
}
