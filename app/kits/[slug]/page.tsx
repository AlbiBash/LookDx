import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKit, priceText, kits } from "@/lib/kits";
import { KitChart } from "@/components/KitChart";
import { AddToQuote } from "@/components/AddToQuote";
import { InfoBar } from "@/components/InfoBar";

export function generateStaticParams() {
  return kits.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const k = getKit((await params).slug);
  return { title: k?.name ?? "Kit" };
}

export default async function KitPage({ params }: { params: Promise<{ slug: string }> }) {
  const kit = getKit((await params).slug);
  if (!kit) notFound();

  return (
    <main id="main">
      <InfoBar
        items={[
          <span key="b"><Link href="/kits" className="ul">Kits</Link> / <Link href="/kits" className="ul">{kit.application}</Link></span>,
          kit.code,
          kit.format,
          <span className="accent-text" key="s">[{kit.status} / IVD STATUS]</span>,
        ]}
      />
      <section className="wrap hero">
        <h1 className="display display-sm">{kit.name}</h1>
        <div className="hero-grid">
          <div>
            <p className="lead">{kit.description}</p>
            <div className="buy">
              <label className="field"><span className="caps">Pack size</span>
                <select defaultValue={kit.packSize}><option>{kit.packSize}</option></select>
              </label>
              <p className="price-row"><span className="caps">Price</span><strong>{priceText(kit.price)}</strong></p>
              <AddToQuote slug={kit.slug} label={kit.price === null ? "Request a quote" : "Add to quote"} />
              <p><a href="#" className="ul small">Buy through a distributor</a></p>
            </div>
            <h2 className="caps docs-h">Documents</h2>
            <ul className="rows">
              <li><span>Instructions for use</span><a href="#">PDF ↓</a></li>
              <li><span>Safety data sheet</span><a href="#">PDF ↓</a></li>
              <li><span>Certificate of analysis</span><span>By lot</span></li>
              <li><span>Analysis template</span><span>Per instrument</span></li>
            </ul>
          </div>
          <KitChart kit={kit} />
        </div>
      </section>

      <section className="wrap section">
        <div className="section-grid">
          <h2 className="caps">01 — Specification</h2>
          <div className="spec-grid">
            <div>
              <h3 className="h3">{kit.callsTitle}</h3>
              <table className="table">
                <thead><tr><th>Call</th><th>Tm °C</th><th>Shape</th></tr></thead>
                <tbody>{kit.series.map((g) => <tr key={g.id}><th scope="row">{g.label}</th><td>{g.tmText}</td><td>{g.shape}</td></tr>)}</tbody>
              </table>
            </div>
            <div>
              <h3 className="h3">Cycling and melt</h3>
              <table className="table">
                <thead><tr><th>Step</th><th>Temp</th><th>Time</th><th>Cycles</th></tr></thead>
                <tbody>{kit.cycling.map((c) => <tr key={c.step}><th scope="row">{c.step}</th><td>{c.temp}</td><td>{c.time}</td><td>{c.cycles}</td></tr>)}</tbody>
              </table>
            </div>
            <div>
              <h3 className="h3">Kit contents</h3>
              <ul className="rows">{kit.contents.map((c) => <li key={c.item}><span>{c.item}</span><span>{c.qty}</span></li>)}</ul>
            </div>
            <div>
              <h3 className="h3">Performance and storage</h3>
              <dl className="perf">
                <div><dt className="caps">Limit of detection</dt><dd>{kit.performance.lod}</dd></div>
                <div><dt className="caps">Input</dt><dd>{kit.performance.input}</dd></div>
                <div><dt className="caps">Storage</dt><dd>{kit.performance.storage}</dd></div>
                <div><dt className="caps">Shelf life</dt><dd>{kit.performance.shelfLife}</dd></div>
              </dl>
              <a href="#" className="ul small">Verification report →</a>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-grid">
          <h2 className="caps">02 — Verified instruments</h2>
          <ul className="inst-grid">
            {kit.instruments.map((i) => (
              <li key={i.name}><strong>{i.name}</strong><small className="muted">{i.status} · <a href="#" className="ul">template ↓</a></small></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-grid">
          <span />
          <div className="cta-row">
            <h2 className="h1">Need a neighbouring variant?</h2>
            <Link href="/#custom" className="btn btn-outline"><span>Request a custom design</span><span aria-hidden>→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
