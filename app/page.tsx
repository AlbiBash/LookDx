import Link from "next/link";
import { HeroChart } from "@/components/HeroChart";
import { KitFinder } from "@/components/KitFinder";
import { CustomDesignForm } from "@/components/CustomDesignForm";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "/LookDx";

const steps = [
  { n: 1, t: "Amplify", d: "Primer and probe sets designed so each amplicon lands in its own temperature window. One master mix, one tube." },
  { n: 2, t: "Melt", d: "A high-resolution ramp on your existing instrument. Ramp rates and acquisition settings ship with every kit." },
  { n: 3, t: "Call", d: "Compare against the kit's reference melt profiles. Normalisation windows and clustering parameters are published per platform." },
];

const compat = [
  ["LightCycler 480", "[SOFTWARE]", "[STATUS]"],
  ["QuantStudio", "[SOFTWARE]", "[STATUS]"],
  ["Rotor-Gene Q", "[SOFTWARE]", "[STATUS]"],
  ["CFX96", "[SOFTWARE]", "[STATUS]"],
  ["[OTHER PLATFORM]", "[SOFTWARE]", "[STATUS]"],
];

export default function Home() {
  return (
    <main id="main">
      <div className="banner" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/img/hero-heat.png`} alt="" />
      </div>

      <section className="wrap hero">
        <h1 className="display">See the difference in every degree</h1>
        <div className="hero-grid">
          <div>
            <p className="lead">Multiplexed targets in a single tube, resolved by melt temperature and read on the real-time instrument you already run.</p>
            <Link href="/kits" className="btn btn-accent btn-block"><span>Find a kit</span><span aria-hidden>→</span></Link>
            <Link href="/#custom" className="btn btn-outline btn-block"><span>Design a custom assay</span><span aria-hidden>→</span></Link>
          </div>
          <HeroChart />
        </div>
      </section>

      <section className="wrap section" id="kits">
        <div className="section-grid">
          <h2 className="caps">01  |  Kit finder</h2>
          <div>
            <h2 className="h1">Every kit has a signature</h2>
            <KitFinder />
          </div>
        </div>
      </section>

      <section className="wrap section" id="method">
        <div className="section-grid">
          <h2 className="caps">02  |  Method</h2>
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.n}>
                <h3>{s.t}</h3>
                <p className="muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section" id="compatibility">
        <div className="section-grid">
          <h2 className="caps">03  |  Compatibility</h2>
          <div>
            <h2 className="h1">Runs on the bench you have</h2>
            <table className="table">
              <thead><tr><th>Instrument</th><th>HRM software</th><th>Status</th></tr></thead>
              <tbody>
                {compat.map((r) => (
                  <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="band" id="custom">
        <div className="wrap section-grid">
          <h2 className="caps">04  |  Custom design</h2>
          <div className="custom-grid">
            <div>
              <h2 className="h1">Send a sequence.<br />Get back a melt</h2>
              <ul className="ticks">
                <li>In silico design and predicted ΔTm for every target</li>
                <li>Wet-lab verification on your instrument model</li>
                <li>Turnaround: [TURNAROUND]</li>
              </ul>
            </div>
            <CustomDesignForm />
          </div>
        </div>
      </section>
    </main>
  );
}
