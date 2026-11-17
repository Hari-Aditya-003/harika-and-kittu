import { useEffect, useRef, useState } from "react";
import { weddingConfig as config } from "../config/wedding";
import { Botanical, Flourish, Ganesh, Procession, TempleArt } from "./Artwork";
import { WeddingProcession, processionImages } from "./WeddingProcession";
import { processionDelay } from "../lib/opening.mjs";

type Stage = "sealed" | "releasing" | "procession" | "temple" | "opening";
const STAGE_TIMING: Partial<Record<Stage, [number, Stage | "done"]>> = {
  releasing: [650, "procession"],
  procession: [2800, "temple"],
  temple: [1300, "opening"],
  opening: [2800, "done"],
};

export function Opening({
  onComplete,
  reducedMotion,
}: {
  onComplete: () => void;
  reducedMotion: boolean;
}) {
  const [stage, setStage] = useState<Stage>("sealed");
  const [assets, setAssets] = useState<Record<string, "loaded" | "failed">>({});
  const artworkReady = Object.keys(assets).length === 3;
  const processionReady = assets.procession === "loaded";
  const templeReady = assets.temple === "loaded";
  const stageStart = useRef({ stage, time: performance.now() });
  const sealRef = useRef<HTMLButtonElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    sealRef.current?.focus({ preventScroll: true });
    let active = true;
    const sources = {
      ...processionImages,
      temple: `${import.meta.env.BASE_URL}images/opening/temple-gold.webp`,
      mandap: `${import.meta.env.BASE_URL}images/mandap.webp`,
    };
    const images = Object.entries(sources).map(([key, src]) => {
      const image = new Image();
      image.fetchPriority = "low";
      if (key === "mandap") {
        image.sizes = "(max-width: 700px) calc(100vw - 20px), 780px";
        image.srcset = `${import.meta.env.BASE_URL}images/mandap-480.webp 480w, ${import.meta.env.BASE_URL}images/mandap-800.webp 800w, ${import.meta.env.BASE_URL}images/mandap.webp 1400w`;
      }
      const settle = (status: "loaded" | "failed") => {
        if (active) setAssets((current) => ({ ...current, [key]: status }));
      };
      image.onload = () => {
        image.decode().then(
          () => settle("loaded"),
          () => settle("failed"),
        );
      };
      image.onerror = () => settle("failed");
      image.src = src;
      return image;
    });
    return () => {
      active = false;
      images.forEach((image) => {
        image.onload = image.onerror = null;
      });
    };
  }, []);
  useEffect(() => {
    if (stage === "sealed") return;
    if (reducedMotion) {
      onComplete();
      return;
    }
    if (stageStart.current.stage !== stage)
      stageStart.current = { stage, time: performance.now() };
    const [defaultDuration, next] = STAGE_TIMING[stage]!;
    const elapsed = performance.now() - stageStart.current.time;
    const remaining =
      stage === "procession"
        ? processionDelay(artworkReady, elapsed)
        : Math.max(0, defaultDuration - elapsed);
    const timer = window.setTimeout(
      () => (next === "done" ? onComplete() : setStage(next)),
      remaining,
    );
    return () => window.clearTimeout(timer);
  }, [stage, onComplete, artworkReady, reducedMotion]);
  function reveal() {
    if (reducedMotion) return onComplete();
    skipRef.current?.focus({ preventScroll: true });
    setStage("releasing");
  }
  return (
    <div
      className={`opening stage-${stage}`}
      role="dialog"
      aria-modal="true"
      aria-label="Open Harika and Dharmendra’s wedding invitation"
      onKeyDown={(event) => {
        if (event.key === "Escape") onComplete();
        if (event.key === "Tab") {
          event.preventDefault();
          if (stage === "sealed" && document.activeElement === skipRef.current)
            sealRef.current?.focus();
          else skipRef.current?.focus();
        }
      }}
    >
      <div className="opening-frame" aria-hidden="true" />
      <div className="opening-brand">
        H <span>&</span> D
      </div>
      <p className="opening-edition">A CELEBRATION OF LOVE & TRADITION</p>
      <Botanical className="opening-botanical left" />
      <Botanical className="opening-botanical right" />
      <div className="seal-scene" aria-hidden={stage !== "sealed"}>
        <div className="envelope">
          <div className="envelope-border" />
          <div className="envelope-flap">
            <span>AN INVITATION, SEALED WITH LOVE</span>
          </div>
          <div className="envelope-bottom" />
          <Botanical className="envelope-botanical left" />
          <Botanical className="envelope-botanical right" />
          <div className="seal-content">
            <p className="tap-label">Tap to Reveal</p>
            <button
              ref={sealRef}
              className="wax-seal"
              onClick={reveal}
              tabIndex={stage === "sealed" ? 0 : -1}
              disabled={stage !== "sealed"}
              aria-label="Tap to reveal the wedding invitation"
            >
              <span className="seal-inner">
                <Ganesh />
              </span>
            </button>
            <Flourish />
            <p className="shubh-vivah hindi" lang="hi">
              {config.religious.heading}
            </p>
            <div className="opening-verse hindi" lang="hi">
              {config.religious.verse.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="opening-couple">
          {config.couple.bride} <i>&</i> {config.couple.groom}
        </div>
        <p className="opening-caption">
          A sacred beginning. A lifetime of togetherness.
        </p>
      </div>
      {stage === "procession" && (
        <div className="procession-scene" role="status">
          <h2>
            A celebration
            <br />
            <i>is on its way.</i>
          </h2>
          <Flourish />
          {processionReady ? <WeddingProcession /> : <Procession />}
          <p className="loading-copy">
            {artworkReady
              ? "A beautiful beginning awaits"
              : "Bringing our invitation to life…"}
          </p>
          <div
            className={`loading-line ${artworkReady ? "is-ready" : ""}`}
            role="progressbar"
            aria-label="Invitation artwork prepared"
            aria-valuemin={0}
            aria-valuemax={3}
            aria-valuenow={Object.keys(assets).length}
          >
            <span
              style={{ width: `${(Object.keys(assets).length / 3) * 100}%` }}
            />
          </div>
        </div>
      )}
      {(stage === "temple" || stage === "opening") && (
        <div className="temple-scene" role="status">
          <p className="eyebrow">MAY THIS BEGINNING BE BLESSED</p>
          <div
            className={`temple-composition ${templeReady ? "temple-reference" : "temple-fallback"}`}
          >
            <div className="temple-light" />
            {!templeReady && <TempleArt />}
            <div className={templeReady ? "temple-reveal" : "temple-doorway"}>
              <div className="temple-interior">
                <img
                  src={`${import.meta.env.BASE_URL}images/mandap.webp`}
                  srcSet={`${import.meta.env.BASE_URL}images/mandap-480.webp 480w, ${import.meta.env.BASE_URL}images/mandap-800.webp 800w, ${import.meta.env.BASE_URL}images/mandap.webp 1400w`}
                  sizes="(max-width: 700px) calc(100vw - 20px), 780px"
                  alt=""
                />
              </div>
              <div className="temple-door door-left" aria-hidden="true" />
              <div className="temple-door door-right" aria-hidden="true" />
            </div>
          </div>
          <p className="temple-caption hindi" lang="hi">
            {config.religious.salutation}
          </p>
        </div>
      )}
      <button ref={skipRef} className="skip-intro" onClick={onComplete}>
        {stage === "sealed" ? "Open without animation" : "Skip introduction"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
      <div className="opening-petals" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            style={{ left: `${9 + i * 12}%`, animationDelay: `${-i * 1.7}s` }}
          />
        ))}
      </div>
    </div>
  );
}
