// SAMPLE DATA. Names, SKUs-in-spirit and the GBP 675 / 50-reaction price are modelled on
// primerdesign.co.uk genotyping kits. Melt temperatures, cycling steps, LoD, storage and
// shelf life are illustrative placeholders and must be replaced with verification data.

export type Peak = { tm: number; height: number; sigma: number };
export type Genotype = {
  id: "wt" | "het" | "hom";
  label: string;
  shape: string;
  peaks: Peak[];
  tmText: string;
};

export type Kit = {
  slug: string;
  code: string; // LDX-####
  name: string;
  target: string;
  variant: string;
  application: string;
  plex: number;
  plexLabel: string;
  format: string;
  status: string;
  summary: string;
  description: string;
  price: number;
  packSize: string;
  instruments: { name: string; status: string }[];
  genotypes: Genotype[];
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

const contents = (n: string) => [
  { item: "Primer/probe mix", qty: `${n} rxn` },
  { item: "HRM master mix", qty: "1 × 1 mL" },
  { item: "Genotype controls (WT, Het, Hom)", qty: "100 µL each" },
  { item: "Nuclease-free water", qty: "1 × 1.5 mL" },
];

const performance = {
  lod: "10 copies / rxn",
  input: "10 ng gDNA",
  storage: "−20 °C",
  shelfLife: "18 months",
};

export const kits: Kit[] = [
  {
    slug: "factor-v-leiden-r506q",
    code: "LDX-0101",
    name: "Factor V Leiden (R506Q) HRM Genotyping Kit",
    target: "F5",
    variant: "R506Q (G1691A)",
    application: "SNP genotyping",
    plex: 1,
    plexLabel: "1 plex",
    format: "Singleplex · unlabelled probe",
    status: "RUO",
    summary: "Wild-type, heterozygous and homozygous calls from one melt.",
    description:
      "Calls wild-type, heterozygous and homozygous variant genotypes at F5 R506Q (G1691A) from a single post-PCR melt.",
    price: 675,
    packSize: "50 reactions",
    instruments,
    genotypes: [
      { id: "wt", label: "Wild type", shape: "Single peak", tmText: "81.4", peaks: [{ tm: 81.4, height: 1, sigma: 0.75 }] },
      {
        id: "het",
        label: "Heterozygous",
        shape: "Heteroduplex shoulder",
        tmText: "78.6 / 81.4",
        peaks: [
          { tm: 78.6, height: 0.42, sigma: 0.9 },
          { tm: 81.4, height: 0.62, sigma: 0.75 },
        ],
      },
      { id: "hom", label: "Homozygous variant", shape: "Shifted peak", tmText: "79.4", peaks: [{ tm: 79.4, height: 0.95, sigma: 0.65 }] },
    ],
    cycling,
    contents: contents("50"),
    performance,
  },
  {
    slug: "prothrombin-g20210a",
    code: "LDX-0102",
    name: "Prothrombin (G20210A) HRM Genotyping Kit",
    target: "F2",
    variant: "G20210A",
    application: "SNP genotyping",
    plex: 1,
    plexLabel: "1 plex",
    format: "Singleplex · unlabelled probe",
    status: "RUO",
    summary: "Resolve the G20210A variant in the prothrombin gene from one melt.",
    description:
      "Calls wild-type, heterozygous and homozygous variant genotypes at F2 G20210A from a single post-PCR melt.",
    price: 675,
    packSize: "50 reactions",
    instruments,
    genotypes: [
      { id: "wt", label: "Wild type", shape: "Single peak", tmText: "82.1", peaks: [{ tm: 82.1, height: 1, sigma: 0.7 }] },
      {
        id: "het",
        label: "Heterozygous",
        shape: "Heteroduplex shoulder",
        tmText: "79.3 / 82.1",
        peaks: [
          { tm: 79.3, height: 0.4, sigma: 0.9 },
          { tm: 82.1, height: 0.6, sigma: 0.7 },
        ],
      },
      { id: "hom", label: "Homozygous variant", shape: "Shifted peak", tmText: "80.2", peaks: [{ tm: 80.2, height: 0.95, sigma: 0.65 }] },
    ],
    cycling,
    contents: contents("50"),
    performance,
  },
  {
    slug: "hfe-haemochromatosis",
    code: "LDX-0103",
    name: "Haemochromatosis (HFE) HRM Genotyping Kit",
    target: "HFE",
    variant: "C282Y / H63D",
    application: "SNP genotyping",
    plex: 2,
    plexLabel: "2 plex",
    format: "Duplex · unlabelled probes",
    status: "RUO",
    summary: "C282Y and H63D in the HFE gene, resolved by melt temperature.",
    description:
      "Calls wild-type, heterozygous and homozygous variant genotypes at HFE C282Y and H63D from a single post-PCR melt.",
    price: 675,
    packSize: "50 reactions",
    instruments,
    genotypes: [
      { id: "wt", label: "Wild type", shape: "Single peak", tmText: "80.8", peaks: [{ tm: 80.8, height: 1, sigma: 0.75 }] },
      {
        id: "het",
        label: "Heterozygous",
        shape: "Heteroduplex shoulder",
        tmText: "77.9 / 80.8",
        peaks: [
          { tm: 77.9, height: 0.45, sigma: 0.9 },
          { tm: 80.8, height: 0.6, sigma: 0.75 },
        ],
      },
      { id: "hom", label: "Homozygous variant", shape: "Shifted peak", tmText: "78.9", peaks: [{ tm: 78.9, height: 0.95, sigma: 0.65 }] },
    ],
    cycling,
    contents: contents("50"),
    performance,
  },
];

export const getKit = (slug: string) => kits.find((k) => k.slug === slug);

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

// Home page hero profile (illustrative)
export const heroTargets = [
  { id: "A", label: "Target A", tm: 74.6, height: 0.82, sigma: 0.8, style: "solid" as const },
  { id: "B", label: "Target B", tm: 78.9, height: 1, sigma: 0.8, style: "accent" as const },
  { id: "C", label: "Target C", tm: 82.3, height: 0.85, sigma: 0.75, style: "dashed" as const },
  { id: "D", label: "Target D", tm: 86.8, height: 0.72, sigma: 0.9, style: "grey" as const },
];
