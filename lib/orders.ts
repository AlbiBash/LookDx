import { getKit } from "@/lib/kits";

// STUB. Validates an order against the catalogue and returns an order number.
// Runs in the browser while the site is a static export (GitHub Pages).
// TODO (backend phase, Amplify): move to a server route, persist to DynamoDB, send via SES,
// and re-check prices on the server.

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export type OrderInput = {
  items: { slug: string; qty: number }[];
  contact: Record<string, unknown>;
};

export type OrderResult =
  | { ok: true; orderNumber: string; total: number }
  | { ok: false; error: string };

export function submitOrder(input: OrderInput): OrderResult {
  const c = input.contact;
  const contact = {
    name: str(c.name, 120),
    organisation: str(c.organisation, 160),
    email: str(c.email, 200),
    address: str(c.address, 600),
  };
  if (!contact.name || !contact.organisation || !contact.address || !emailRe.test(contact.email))
    return { ok: false, error: "Please complete all required contact details." };

  const items = input.items.slice(0, 50).flatMap((i) => {
    const kit = getKit(String(i.slug));
    const qty = Math.floor(Number(i.qty));
    return kit && qty >= 1 && qty <= 99 ? [{ qty, unitPrice: kit.price ?? 0 }] : [];
  });
  if (items.length === 0) return { ok: false, error: "Your basket is empty." };

  const total = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const orderNumber = `LDX-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  return { ok: true, orderNumber, total };
}
