"use client";
import { useState } from "react";

export function CustomDesignForm() {
  const [sent, setSent] = useState(false);
  return sent ? (
    <p role="status" className="note">Thanks — this is a front-end demo, so nothing was sent yet. Backend comes later.</p>
  ) : (
    <form
      className="stack"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label><span className="caps">Target region</span><textarea required rows={2} placeholder="Gene, region or sequence" /></label>
      <label><span className="caps">Variants to resolve</span><input required placeholder="e.g. rs6025" /></label>
      <label><span className="caps">Work email</span><input required type="email" autoComplete="email" /></label>
      <button className="btn btn-ink btn-block"><span>Request a design</span><span aria-hidden>→</span></button>
    </form>
  );
}
