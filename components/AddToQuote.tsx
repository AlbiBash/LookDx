"use client";
import Link from "next/link";
import { useState } from "react";
import { useBasket } from "@/lib/basket";

export function AddToQuote({ slug }: { slug: string }) {
  const { add } = useBasket();
  const [added, setAdded] = useState(false);
  return (
    <>
      <button
        className="btn btn-accent btn-block"
        onClick={() => {
          add(slug);
          setAdded(true);
        }}
      >
        <span>{added ? "Added to quote" : "Add to quote"}</span>
        <span aria-hidden>→</span>
      </button>
      {added && (
        <p className="small" role="status">
          <Link href="/basket" className="ul">View quote basket</Link>
        </p>
      )}
    </>
  );
}
