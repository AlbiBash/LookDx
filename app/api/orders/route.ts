import { NextResponse } from "next/server";
import { getKit } from "@/lib/kits";

// STUB. Validates against the server-side catalogue and returns an order number.
// TODO (backend phase): persist to DynamoDB and send notifications through SES.

const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const contact = {
    name: str(body?.contact?.name, 120),
    organisation: str(body?.contact?.organisation, 160),
    email: str(body?.contact?.email, 200),
    phone: str(body?.contact?.phone, 40),
    address: str(body?.contact?.address, 600),
    notes: str(body?.contact?.notes, 1000),
  };
  if (!contact.name || !contact.organisation || !contact.address || !email.test(contact.email))
    return NextResponse.json({ error: "Please complete all required contact details." }, { status: 400 });

  const rawItems: unknown[] = Array.isArray(body?.items) ? body.items.slice(0, 50) : [];
  const items = rawItems.flatMap((i: any) => {
    const kit = getKit(String(i?.slug));
    const qty = Math.floor(Number(i?.qty));
    return kit && qty >= 1 && qty <= 99 ? [{ slug: kit.slug, code: kit.code, qty, unitPrice: kit.price }] : [];
  });
  if (items.length === 0) return NextResponse.json({ error: "Your basket is empty." }, { status: 400 });

  const total = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const orderNumber = `LDX-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  return NextResponse.json({ orderNumber, total, items });
}
