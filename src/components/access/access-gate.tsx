"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, Heart, Volume2 } from "lucide-react";

export function AccessGate() {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState(0);
  const errorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage(1), 2500),
      window.setTimeout(() => setStage(2), 5900),
      window.setTimeout(() => setStage(3), 10300),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, []);
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
      {stage < 3 && <section className={`access-prologue stage-${stage}`} aria-live="polite"><div className="prologue-dust" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div><Heart className="prologue-heart" fill="currentColor" aria-hidden="true" />{stage === 1 && <p>Every love story<br />has a beginning.</p>}{stage === 2 && <p>Ours started<br />with a single message.</p>}</section>}
      <div className="grain" aria-hidden="true" />
      <section className={`access-content${stage === 3 ? " is-ready" : ""}`} aria-labelledby="access-title">
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
