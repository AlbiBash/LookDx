"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBasket } from "@/lib/basket";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="LookDx home">
      <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden>
        <path d="M1 15 C5 15 6 14 8 8 C9.5 3 10.5 1 11 1 C11.5 1 12.5 3 14 8 C16 14 17 15 21 15" fill="none" stroke="var(--accent)" strokeWidth="1.8" />
      </svg>
      LookDx
    </Link>
  );
}

const nav = [
  { href: "/kits", label: "Kits" },
  { href: "/#custom", label: "Custom design" },
  { href: "/#compatibility", label: "Instruments" },
  { href: "/#method", label: "Method" },
];

export function Header({ bar }: { bar?: React.ReactNode }) {
  const { count } = useBasket();
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="wrap head-row">
        <Logo />
        <nav aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/basket" className={count > 0 ? "btn btn-ink" : "btn btn-outline"}>
          {count > 0 || path === "/basket" ? `Quote basket (${count})` : "Request a quote"}
        </Link>
      </div>
      {bar}
    </header>
  );
}
