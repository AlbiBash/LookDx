"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { kits } from "@/lib/kits";
import { MiniCurve } from "./MiniCurve";

export function KitFinder() {
  const [q, setQ] = useState("");
  const [app, setApp] = useState("All");
  const [inst, setInst] = useState("Any");
  const [plex, setPlex] = useState("Any");

  const apps = ["All", ...Array.from(new Set(kits.map((k) => k.application)))];
  const insts = ["Any", ...Array.from(new Set(kits.flatMap((k) => k.instruments.map((i) => i.name))))];
  const plexes = ["Any", ...Array.from(new Set(kits.map((k) => k.plexLabel)))];

  const shown = useMemo(
    () =>
      kits.filter(
        (k) =>
          (!q || `${k.target} ${k.variant} ${k.name}`.toLowerCase().includes(q.toLowerCase())) &&
          (app === "All" || k.application === app) &&
          (inst === "Any" || k.instruments.some((i) => i.name === inst)) &&
          (plex === "Any" || k.plexLabel === plex),
      ),
    [q, app, inst, plex],
  );

  return (
    <div>
      <div className="filters">
        <label>
          <span className="caps">Target or gene</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. F5, HFE" />
        </label>
        <label>
          <span className="caps">Application</span>
          <select value={app} onChange={(e) => setApp(e.target.value)}>{apps.map((a) => <option key={a}>{a}</option>)}</select>
        </label>
        <label>
          <span className="caps">Instrument</span>
          <select value={inst} onChange={(e) => setInst(e.target.value)}>{insts.map((a) => <option key={a}>{a}</option>)}</select>
        </label>
        <label>
          <span className="caps">Plex level</span>
          <select value={plex} onChange={(e) => setPlex(e.target.value)}>{plexes.map((a) => <option key={a}>{a}</option>)}</select>
        </label>
      </div>
      {shown.length === 0 ? (
        <p className="muted pad">No kits match. <Link href="/#custom" className="ul">Request a custom design</Link></p>
      ) : (
        <ul className="kit-grid">
          {shown.map((k, i) => (
            <li key={k.slug}>
              <Link href={`/kits/${k.slug}`} className="kit-card">
                <div className="kit-meta caps"><span>{String(i + 1).padStart(2, "0")}</span><span>{k.plexLabel}</span></div>
                <MiniCurve peaks={k.genotypes.flatMap((g) => g.peaks).slice(0, 4)} />
                <h3>{k.target} — {k.variant}</h3>
                <p className="muted">{k.summary}</p>
                <p className="small muted code">{k.code} · [{k.status}]</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
