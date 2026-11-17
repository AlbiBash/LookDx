"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBasket } from "@/lib/basket";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="LookDx home">
      look<span className="dx">dx.</span>
    </Link>
  );
}

const nav = [
  { href: "/kits", label: "Kits" },
  { href: "/#custom", label: "Custom design" },
  { href: "/#compatibility", label: "Instruments" },
  { href: "/#method", label: "Application notes" },
  { href: "mailto:hello@example.com", label: "Support" },
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
        <Link href="/basket" className="btn btn-ink">
          {count > 0 || path === "/basket" ? `Quote basket (${count})` : "Request a quote"}
        </Link>
      </div>
      {bar}
    </header>
  );
}
