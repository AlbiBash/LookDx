"use client";
import { useEffect, useState, useCallback } from "react";

const KEY = "lookdx.basket.v1";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const EVENT = "lookdx:basket";

export type BasketItem = { slug: string; qty: number };
type Stored = { items: BasketItem[]; expires: number };

function read(): BasketItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const s = JSON.parse(raw) as Stored;
    if (!s.expires || s.expires < Date.now()) {
      localStorage.removeItem(KEY);
      return [];
    }
    return Array.isArray(s.items) ? s.items : [];
  } catch {
    return [];
  }
}

function write(items: BasketItem[]) {
  try {
    if (items.length === 0) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify({ items, expires: Date.now() + TTL_MS } satisfies Stored));
  } catch {
    /* storage unavailable */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useBasket() {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    setReady(true);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((slug: string, qty = 1) => {
    const cur = read();
    const hit = cur.find((i) => i.slug === slug);
    if (hit) hit.qty = Math.min(99, hit.qty + qty);
    else cur.push({ slug, qty });
    write(cur);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    write(read().map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i)));
  }, []);

  const remove = useCallback((slug: string) => write(read().filter((i) => i.slug !== slug)), []);
  const clear = useCallback(() => write([]), []);

  return { items, ready, count: items.reduce((n, i) => n + i.qty, 0), add, setQty, remove, clear };
}
