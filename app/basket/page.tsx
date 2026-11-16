import type { Metadata } from "next";
import { BasketView } from "@/components/BasketView";
import { InfoBar } from "@/components/InfoBar";

export const metadata: Metadata = { title: "Quote basket" };

export default function Basket() {
  return (
    <main id="main">
      <InfoBar items={["Quote basket", "Invoice after review", "No online payment", <span className="accent-text" key="s">[RUO / IVD STATUS]</span>]} />
      <section className="wrap hero">
        <h1 className="display">Your quote.</h1>
        <BasketView />
      </section>
    </main>
  );
}
