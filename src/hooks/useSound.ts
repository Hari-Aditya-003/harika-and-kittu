import { useEffect, useRef, useState } from "react";

// Original, quiet bell tones; no recording or external audio request is used.
export function useSound() {
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const context = useRef<AudioContext | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const pending = useRef(false);
  const disposed = useRef(false);
  function stop() {
    window.clearInterval(timer.current);
    timer.current = undefined;
    setPlaying(false);
    if (context.current?.state === "running") void context.current.suspend();
  }
  async function toggle() {
    if (pending.current) return;
    if (playing) return stop();
    pending.current = true;
    try {
      const Audio =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Audio) throw new Error("Web Audio unavailable");
      const audio = context.current || new Audio();
      context.current = audio;
      await audio.resume();
      if (disposed.current || audio.state !== "running" || document.hidden)
        return;
      let step = 0;
      function bell() {
        const notes = [261.63, 392, 329.63, 523.25, 392, 293.66];
        const frequency = notes[step++ % notes.length];
        [1, 2.01, 3.97].forEach((harmonic, index) => {
          const oscillator = audio.createOscillator();
          const gain = audio.createGain();
          oscillator.type = "sine";
          oscillator.frequency.value = frequency * harmonic;
          gain.gain.setValueAtTime(0.0001, audio.currentTime);
          gain.gain.exponentialRampToValueAtTime(
            0.025 / (index + 1),
            audio.currentTime + 0.025,
          );
          gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 3);
          oscillator.connect(gain);
          gain.connect(audio.destination);
          oscillator.start();
          oscillator.stop(audio.currentTime + 3.1);
          oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();
          };
        });
      }
      bell();
      timer.current = window.setInterval(bell, 2400);
      setPlaying(true);
    } catch {
      setUnavailable(true);
      stop();
    } finally {
      pending.current = false;
    }
  }
  useEffect(() => {
    disposed.current = false;
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      disposed.current = true;
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(timer.current);
      if (context.current && context.current.state !== "closed")
        void context.current.close();
    };
  }, []);
  return { playing, unavailable, toggle };
}
