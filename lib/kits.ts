// SAMPLE DATA. The six kit families come from the LookDx mockup; the GBP 675 / 50-reaction price is
// modelled on primerdesign.co.uk genotyping kits. Melt temperatures, cycling steps, LoD, storage and
// shelf life are illustrative placeholders and must be replaced with verification data.

export type Peak = { tm: number; height: number; sigma: number };
export type SeriesStyle = "solid" | "accent" | "dashed" | "grey" | "purple";
export type Series = { id: string; label: string; shape: string; tmText: string; peaks: Peak[]; style: SeriesStyle };

export type Kit = {
  slug: string;
  code: string; // LDX-####
  short: string; // card title
  name: string;
  application: string;
  plexLabel: string;
  format: string;
  status: string;
  summary: string;
  description: string;
  price: number | null; // null = quoted on request
  packSize: string;
  cardPeaks: Peak[]; // thumbnail curve, taken from the mockup
  callsTitle: string;
  series: Series[];
  instruments: { name: string; status: string }[];
  cycling: { step: string; temp: string; time: string; cycles: string }[];
  contents: { item: string; qty: string }[];
  performance: { lod: string; input: string; storage: string; shelfLife: string };
};

const instruments = [
  { name: "LightCycler 480", status: "Verified" },
  { name: "QuantStudio", status: "Verified" },
  { name: "Rotor-Gene Q", status: "Verified" },
  { name: "CFX96", status: "In verification" },
];

const cycling = [
  { step: "Activation", temp: "95 °C", time: "120 s", cycles: "1" },
  { step: "Amplification", temp: "95 °C / 60 °C", time: "10 s / 30 s", cycles: "45" },
  { step: "Hold", temp: "95 °C", time: "60 s", cycles: "1" },
  { step: "HRM ramp", temp: "65 → 95 °C", time: "0.1 °C/s", cycles: "1" },
];

const contents = (extra: { item: string; qty: string }[]) => [
  { item: "Primer/probe mix", qty: "50 rxn" },
  { item: "HRM master mix", qty: "1 × 1 mL" },
  ...extra,
  { item: "Nuclease-free water", qty: "1 × 1.5 mL" },
];

const performance = { lod: "10 copies / rxn", input: "10 ng", storage: "−20 °C", shelfLife: "18 months" };
const P = (tm: number, height: number, sigma = 0.8): Peak => ({ tm, height, sigma });
const S = (id: string, label: string, shape: string, peaks: Peak[], style: SeriesStyle, tmText?: string): Series => ({
  id, label, shape, peaks, style, tmText: tmText ?? peaks.map((p) => p.tm.toFixed(1)).join(" / "),
});

export const kits: Kit[] = [
  {
    slug: "snp-genotyping",
    code: "LDX-0101",
    short: "SNP genotyping",
    name: "SNP Genotyping HRM Kit",
    application: "SNP genotyping",
    plexLabel: "1–2 plex",
    format: "Singleplex · unlabelled probe",
    status: "RUO",
    summary: "Wild-type, heterozygous and homozygous calls from one melt.",
    description: "Calls wild-type, heterozygous and homozygous variant genotypes at [VARIANT] from a single post-PCR melt.",
    price: 675,
    packSize: "50 reactions",
    cardPeaks: [P(78, 0.62, 0.55), P(80.2, 1, 0.5)],
    callsTitle: "Genotype calls",
    series: [
      S("wt", "Wild type", "Single peak", [P(81.4, 1, 0.75)], "solid"),
      S("het", "Heterozygous", "Heteroduplex shoulder", [P(78.6, 0.42, 0.9), P(81.4, 0.62, 0.75)], "accent", "78.6 / 81.4"),
      S("hom", "Homozygous variant", "Shifted peak", [P(79.4, 0.95, 0.65)], "dashed"),
    ],
    instruments,
    cycling,
    contents: contents([{ item: "Genotype controls (WT, Het, Hom)", qty: "100 µL each" }]),
    performance,
  },
  {
    slug: "pathogen-id-panel",
    code: "LDX-0102",
    short: "Pathogen ID panel",
    name: "Pathogen ID Panel HRM Kit",
    application: "Pathogen ID",
    plexLabel: "4 plex",
    format: "4-plex · unlabelled probes",
    status: "RUO",
    summary: "Species-level identification by amplicon Tm in a single tube.",
    description: "Identifies up to four pathogen species in a single tube by the melt temperature of each amplicon.",
    price: 920,
    packSize: "50 reactions",
    cardPeaks: [P(74.6, 0.78, 0.7), P(78.9, 1, 0.7), P(82.3, 0.88, 0.7), P(86.8, 0.74, 0.7)],
    callsTitle: "Species calls",
    series: [
      S("a", "Species A", "Single peak", [P(74.6, 0.82, 0.8)], "solid"),
      S("b", "Species B", "Single peak", [P(78.9, 1, 0.8)], "accent"),
      S("c", "Species C", "Single peak", [P(82.3, 0.85, 0.75)], "dashed"),
      S("d", "Species D", "Single peak", [P(86.8, 0.72, 0.9)], "grey"),
    ],
    instruments,
    cycling,
    contents: contents([{ item: "Species controls (A–D)", qty: "100 µL each" }]),
    performance,
  },
  {
    slug: "resistance-markers",
    code: "LDX-0103",
    short: "Resistance markers",
    name: "Resistance Markers HRM Kit",
    application: "Resistance markers",
    plexLabel: "3 plex",
    format: "3-plex · unlabelled probes",
    status: "RUO",
    summary: "Known resistance-associated variants alongside an internal control.",
    description: "Detects known resistance-associated variants alongside an internal control, resolved by melt temperature in one tube.",
    price: 840,
    packSize: "50 reactions",
    cardPeaks: [P(76, 1, 0.7), P(80, 0.72, 0.7), P(84, 0.95, 0.7)],
    callsTitle: "Marker calls",
    series: [
      S("ic", "Internal control", "Single peak", [P(76.2, 0.9, 0.75)], "solid"),
      S("v1", "Marker 1", "Single peak", [P(80.1, 1, 0.75)], "accent"),
      S("v2", "Marker 2", "Single peak", [P(84.3, 0.88, 0.8)], "dashed"),
    ],
    instruments,
    cycling,
    contents: contents([{ item: "Marker controls (1–2)", qty: "100 µL each" }, { item: "Internal control", qty: "100 µL" }]),
    performance,
  },
  {
    slug: "methylation-screen",
    code: "LDX-0104",
    short: "Methylation screen",
    name: "Methylation Screen HRM Kit",
    application: "Methylation screen",
    plexLabel: "1 plex",
    format: "Singleplex · bisulfite-converted input",
    status: "RUO",
    summary: "Methylated and unmethylated templates separated after bisulfite conversion.",
    description: "Separates methylated and unmethylated templates after bisulfite conversion from a single post-PCR melt.",
    price: 780,
    packSize: "50 reactions",
    cardPeaks: [P(77.5, 0.62, 1.2), P(82, 1, 1.0)],
    callsTitle: "Methylation calls",
    series: [
      S("u", "Unmethylated", "Lower, broad peak", [P(78, 0.7, 1.2)], "solid"),
      S("m", "Methylated", "Higher, shifted peak", [P(82.2, 1, 1.0)], "accent"),
      S("mix", "Mixed template", "Two peaks", [P(78, 0.4, 1.2), P(82.2, 0.55, 1.0)], "dashed", "78.0 / 82.2"),
    ],
    instruments,
    cycling,
    contents: contents([{ item: "Methylation controls (0 %, 100 %)", qty: "100 µL each" }]),
    performance: { ...performance, input: "10 ng bisulfite-converted DNA" },
  },
  {
    slug: "species-verification",
    code: "LDX-0105",
    short: "Species verification",
    name: "Species Verification HRM Kit",
    application: "Species verification",
    plexLabel: "2 plex",
    format: "Duplex · unlabelled probes",
    status: "RUO",
    summary: "Confirm identity of culture or sample material against a reference melt.",
    description: "Confirms the identity of culture or sample material by comparing its melt against a reference profile.",
    price: 760,
    packSize: "50 reactions",
    cardPeaks: [P(78, 1, 0.55), P(82, 0.7, 0.55)],
    callsTitle: "Verification calls",
    series: [
      S("s1", "Reference species", "Single peak", [P(78.2, 1, 0.7)], "solid"),
      S("s2", "Alternative species", "Shifted peak", [P(82.0, 0.72, 0.7)], "accent"),
    ],
    instruments,
    cycling,
    contents: contents([{ item: "Reference controls (2)", qty: "100 µL each" }]),
    performance,
  },
  {
    slug: "custom-set",
    code: "LDX-0106",
    short: "Custom set",
    name: "Custom HRM Set",
    application: "Custom design",
    plexLabel: "Any",
    format: "Designed to order",
    status: "RUO",
    summary: "Your targets, designed into clear temperature windows and verified on your instrument.",
    description: "Your targets, designed into clear temperature windows and verified on your instrument model. Priced on request.",
    price: null,
    packSize: "Quoted per design",
    cardPeaks: [P(74.5, 0.5, 0.55), P(78, 0.5, 0.55), P(81.5, 0.5, 0.55), P(85, 0.5, 0.55)],
    callsTitle: "Design windows",
    series: [
      S("t1", "Target 1", "Predicted peak", [P(74.5, 0.55, 0.7)], "solid"),
      S("t2", "Target 2", "Predicted peak", [P(78, 0.55, 0.7)], "accent"),
      S("t3", "Target 3", "Predicted peak", [P(81.5, 0.55, 0.7)], "dashed"),
      S("t4", "Target 4", "Predicted peak", [P(85, 0.55, 0.7)], "grey"),
    ],
    instruments,
    cycling,
    contents: [
      { item: "Primer/probe mix", qty: "Per design" },
      { item: "HRM master mix", qty: "Per order" },
      { item: "Target controls", qty: "Per design" },
      { item: "Nuclease-free water", qty: "1 × 1.5 mL" },
    ],
    performance: { ...performance, lod: "Verified per design", shelfLife: "[MONTHS]" },
  },
];

export const getKit = (slug: string) => kits.find((k) => k.slug === slug);

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

export const priceText = (n: number | null) => (n === null ? "On request" : gbp(n));

// Home page hero profile (illustrative)
export const heroTargets = [
  { id: "A", label: "Target A", tm: 74.6, height: 0.82, sigma: 0.8, style: "solid" as const },
  { id: "B", label: "Target B", tm: 78.9, height: 1, sigma: 0.8, style: "accent" as const },
  { id: "C", label: "Target C", tm: 82.3, height: 0.85, sigma: 0.75, style: "dashed" as const },
  { id: "D", label: "Target D", tm: 86.8, height: 0.72, sigma: 0.9, style: "grey" as const },
];
