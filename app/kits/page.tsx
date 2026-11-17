import type { Metadata } from "next";
import Link from "next/link";
import { KitFinder } from "@/components/KitFinder";
import { kits } from "@/lib/kits";

export const metadata: Metadata = { title: "Kits" };

export default function Kits() {
  return (
    <main id="main">
      <section className="wrap hero">
        <h1 className="display">Kits.</h1>
        <div className="section-grid">
          <span />
          <KitFinder />
        </div>
      </section>
    </main>
  );
}
