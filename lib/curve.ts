export type Gauss = { tm: number; height: number; sigma: number };

export const T_MIN = 70;
export const T_MAX = 90;

export const gaussSum = (g: Gauss[], t: number) =>
  g.reduce((s, p) => s + p.height * Math.exp(-((t - p.tm) ** 2) / (2 * p.sigma ** 2)), 0);

/** Normalised melt: fluorescence falls from 1 to 0 as peaks pass (cumulative of derivative). */
export function normalisedAt(g: Gauss[], t: number, step = 0.05) {
  const total = g.reduce((s, p) => s + p.height * p.sigma * Math.sqrt(2 * Math.PI), 0);
  let acc = 0;
  for (let x = T_MIN - 10; x < t; x += step) acc += gaussSum(g, x) * step;
  return 1 - acc / total;
}

export function pathFor(
  g: Gauss[],
  w: number,
  h: number,
  mode: "derivative" | "normalised",
  tMin = T_MIN,
  tMax = T_MAX,
  yMax = 1.1,
) {
  const pts: string[] = [];
  for (let i = 0; i <= 160; i++) {
    const t = tMin + ((tMax - tMin) * i) / 160;
    const v = mode === "derivative" ? gaussSum(g, t) / yMax : normalisedAt(g, t) * 0.9;
    pts.push(`${i === 0 ? "M" : "L"}${((i / 160) * w).toFixed(1)},${(h - v * h).toFixed(1)}`);
  }
  return pts.join(" ");
}
