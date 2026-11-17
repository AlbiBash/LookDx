import type { Metadata } from "next";
import { BasketView } from "@/components/BasketView";

export const metadata: Metadata = { title: "Quote basket" };

export default function Basket() {
  return (
    <main id="main">
      <section className="wrap hero">
        <h1 className="display">Your quote</h1>
        <BasketView />
      </section>
    </main>
  );
}
