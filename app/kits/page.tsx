import type { Metadata } from "next";
import Link from "next/link";
import { KitFinder } from "@/components/KitFinder";
import { InfoBar } from "@/components/InfoBar";

export const metadata: Metadata = { title: "Kits" };

export default function Kits() {
  return (
    <main id="main">
      <InfoBar items={[<Link key="a" href="/" className="ul">Home</Link>, "Kit catalogue", "3 kits", <span className="accent-text" key="s">[RUO / IVD STATUS]</span>]} />
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
