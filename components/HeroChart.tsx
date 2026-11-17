"use client";
import { useState } from "react";
import { ChartSvg, type Line } from "./ChartSvg";
import { heroTargets } from "@/lib/kits";

const lines: Line[] = heroTargets.map((t) => ({
  id: t.id,
  style: t.style,
  gauss: [{ tm: t.tm, height: t.height, sigma: t.sigma }],
}));

export function HeroChart() {
  const [active, setActive] = useState<string | null>(null);
  const sel = heroTargets.find((t) => t.id === active);
  const tms = heroTargets.map((t) => t.tm);

  return (
    <figure className="figure">
      <figcaption className="fig-head">
        <span className="caps">Fig. 1 — Derivative melt, −dF/dT</span>
        <span className="muted small">Illustrative profile</span>
      </figcaption>
      <ChartSvg lines={lines} mode="derivative" active={active} ticks={[70, 75, 80, 85, 90]} label="Derivative melt curves for four targets" />
      <div className="tabs" role="tablist" aria-label="Select target">
        <button role="tab" aria-selected={active === null} onClick={() => setActive(null)}>
          All targets
        </button>
        {heroTargets.map((t) => (
          <button key={t.id} role="tab" aria-selected={active === t.id} onClick={() => setActive(t.id)}>
            <span>{t.label}</span>
            <small>{t.tm} °C</small>
          </button>
        ))}
      </div>
      <dl className="stats">
        <div>
          <dt className="caps">{sel ? "Target" : "Target"}</dt>
          <dd>{sel ? sel.label : "4 / tube"}</dd>
        </div>
        <div>
          <dt className="caps">Tm</dt>
          <dd>{sel ? `${sel.tm} °C` : `${Math.min(...tms)}–${Math.max(...tms)}`}</dd>
        </div>
      </dl>
    </figure>
  );
}
