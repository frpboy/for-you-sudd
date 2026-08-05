"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, Heart, Volume2 } from "lucide-react";

export function AccessGate() {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [opening, setOpening] = useState(true);
  const errorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => { const timer = window.setTimeout(() => setOpening(false), 3100); return () => window.clearTimeout(timer); }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const passphrase = String(new FormData(event.currentTarget).get("passphrase") ?? "");
    const result = await fetch("/api/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passphrase }),
    });
    setBusy(false);
    if (!result.ok) {
      setError(
        ((await result.json().catch(() => ({}))) as { error?: string }).error ??
          "Unable to continue.",
      );
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    localStorage.removeItem("for-u-sudd-progress");
    window.location.assign("/story");
  }
  return (
    <main className="access-shell">
      {opening && <section className="access-prologue" aria-live="polite"><Heart className="prologue-heart" fill="currentColor" aria-hidden="true" /><p>Every love story has a beginning.</p><span>Ours started with a single message.</span></section>}
      <div className="grain" aria-hidden="true" />
      <section className="access-content" aria-labelledby="access-title">
        <Heart className="mark" aria-hidden="true" fill="currentColor" />
        <p className="eyebrow">FOR U SUDD</p>
        <h1 id="access-title">
          A little world,
          <br />
          made with love.
        </h1>
        <p className="lede">
          This story is only for you. Enter the passphrase to begin.
        </p>
        <form onSubmit={submit} className="access-form">
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              name="passphrase"
              type="password"
              autoComplete="current-password"
              value={passphrase}
              onChange={(event) => setPassphrase(event.target.value)}
              required
            />
            <button className="primary" disabled={busy}>
              {busy ? "Unlocking…" : (
                <>
                  Open the next memory <ArrowRight aria-hidden="true" />
                </>
              )}
            </button>
        </form>
        <p className="form-error" ref={errorRef} tabIndex={-1} role="alert">
          {error}
        </p>
        <p className="sound-note">
          <Volume2 size={16} aria-hidden="true" /> You can choose music or
          silence after you enter.
        </p>
      </section>
    </main>
  );
}
