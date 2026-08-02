"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Heart, Volume2 } from "lucide-react";
import { normalizeAnswer } from "@/lib/answer-normalization";

export function AccessGate() {
  const router = useRouter();
  const [passphrase, setPassphrase] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
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
    setAuthorized(true);
  }
  function continueStory(event: FormEvent) {
    event.preventDefault();
    if (normalizeAnswer(answer) !== "switzerland") {
      setError("A small hint: think snow-covered mountains.");
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    router.replace("/story");
  }
  return (
    <main className="access-shell">
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
        {!authorized ? (
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
              {busy ? (
                "Opening…"
              ) : (
                <>
                  Open my story <ArrowRight aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={continueStory} className="access-form">
            <p className="success">Unlocked. One small question first.</p>
            <label htmlFor="destination">What is our dream destination?</label>
            <input
              id="destination"
              autoComplete="off"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              required
            />
            <button className="primary">
              Continue <ArrowRight aria-hidden="true" />
            </button>
          </form>
        )}
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
