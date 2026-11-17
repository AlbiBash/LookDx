import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-grid">
        <div>
          <span className="logo" style={{ fontWeight: 700 }}>LookDx</span>
          <p className="small muted">
            [COMPANY NAME]
            <br />
            [REGISTERED ADDRESS]
          </p>
        </div>
        <div>
          <h3 className="caps">Products</h3>
          <ul>
            <li><Link href="/kits">Kit catalogue</Link></li>
            <li><Link href="/#custom">Custom design</Link></li>
            <li><Link href="/kits">Controls</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="caps">Resources</h3>
          <ul>
            <li><a href="#">IFUs &amp; SDS</a></li>
            <li><a href="#">Application notes</a></li>
            <li><a href="#">Analysis settings</a></li>
          </ul>
        </div>
        <div>
          <h3 className="caps">Company</h3>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Distributors</a></li>
            <li><a href="mailto:hello@example.com">Contact</a></li>
          </ul>
        </div>
        <p className="ruo">[RUO / IVD STATEMENT]</p>
      </div>
    </footer>
  );
}
