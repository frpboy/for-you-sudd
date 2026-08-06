"use client";

import { useEffect, useRef } from "react";

const unlockEvents = ["pointerdown", "touchstart", "keydown", "focusin", "wheel", "scroll"] as const;

export function AmbientAudio() {
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    let started = false;
    let starting = false;
    const removeListeners = () => unlockEvents.forEach((event) => document.removeEventListener(event, start, true));
    const start = () => {
      if (started || starting) return;
      starting = true;
      void player.play().then(() => {
        started = true;
        document.dispatchEvent(new Event("ambientstarted"));
        removeListeners();
      }).catch(() => { starting = false; });
    };
    unlockEvents.forEach((event) => document.addEventListener(event, start, { capture: true, passive: true }));
    return removeListeners;
  }, []);

  return <audio id="ambient-audio" ref={audio} src="/api/media/ambient" loop preload="metadata" />;
}
