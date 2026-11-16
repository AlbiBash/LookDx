"use client";
import Link from "next/link";
import { useState } from "react";
import { useBasket } from "@/lib/basket";
import { getKit, priceText } from "@/lib/kits";
import { submitOrder } from "@/lib/orders";

type Done = { orderNumber: string; email: string };

export function BasketView() {
  const { items, ready, setQty, remove, clear } = useBasket();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);

  const lines = items.flatMap((i) => {
    const k = getKit(i.slug);
    return k ? [{ ...i, kit: k }] : [];
  });
  const total = lines.reduce((s, l) => s + (l.kit.price ?? 0) * l.qty, 0);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const f = new FormData(e.currentTarget);
    try {
      const result = submitOrder({
        items: items.map(({ slug, qty }) => ({ slug, qty })),
        contact: Object.fromEntries(f.entries()),
      });
      if (!result.ok) throw new Error(result.error);
      clear();
      setDone({ orderNumber: result.orderNumber, email: String(f.get("email")) });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <div className="note" role="status">
        <p className="caps">Order received</p>
        <h2 className="h2">{done.orderNumber}</h2>
        <p>A confirmation will be sent to {done.email}. We will review your order and send an invoice; kits ship once it is paid.</p>
        <p className="small muted">Demo mode: the order was validated but not stored or emailed yet.</p>
        <Link href="/kits" className="btn btn-outline">Back to kits</Link>
      </div>
    );

  if (!ready) return <p className="muted">Loading basket…</p>;
  if (lines.length === 0)
    return (
      <p className="muted">
        Your quote basket is empty. <Link href="/kits" className="ul">Browse kits</Link>
      </p>
    );

  return (
    <div className="basket-grid">
      <section aria-labelledby="items-h">
        <h2 id="items-h" className="caps rule-top">01 — Basket</h2>
        <ul className="lines">
          {lines.map((l) => (
            <li key={l.slug}>
              <div>
                <Link href={`/kits/${l.slug}`} className="strong">{l.kit.name}</Link>
                <div className="small muted code">{l.kit.code} · {l.kit.packSize} · [{l.kit.status}]</div>
              </div>
              <div className="qty">
                <button aria-label={`Decrease ${l.kit.name}`} onClick={() => setQty(l.slug, l.qty - 1)}>−</button>
                <span aria-live="polite">{l.qty}</span>
                <button aria-label={`Increase ${l.kit.name}`} onClick={() => setQty(l.slug, l.qty + 1)}>+</button>
              </div>
              <div className="price">{l.kit.price === null ? "On request" : priceText(l.kit.price * l.qty)}</div>
              <button className="ul small" onClick={() => remove(l.slug)}>Remove</button>
            </li>
          ))}
        </ul>
        <p className="total"><span className="caps">Estimated total (ex. VAT & shipping)</span><strong>{priceText(total)}</strong></p>
        <p className="small muted">Basket is saved in this browser for 30 days. Prices are confirmed by our server when you submit.</p>
      </section>

      <section aria-labelledby="contact-h">
        <h2 id="contact-h" className="caps rule-top">02 — Contact details</h2>
        <form className="stack" onSubmit={submit}>
          <label><span className="caps">Full name</span><input name="name" required autoComplete="name" /></label>
          <label><span className="caps">Organisation</span><input name="organisation" required autoComplete="organization" /></label>
          <label><span className="caps">Email</span><input name="email" type="email" required autoComplete="email" /></label>
          <label><span className="caps">Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>
          <label><span className="caps">Delivery & invoice address</span><textarea name="address" rows={3} required autoComplete="street-address" /></label>
          <label><span className="caps">Notes</span><textarea name="notes" rows={2} /></label>
          {error && <p role="alert" className="error">{error}</p>}
          <button className="btn btn-accent btn-block" disabled={busy}>
            <span>{busy ? "Submitting…" : "Submit order"}</span><span aria-hidden>→</span>
          </button>
          <p className="small muted">No payment is taken online. We email an invoice after reviewing your order.</p>
        </form>
      </section>
    </div>
  );
}
