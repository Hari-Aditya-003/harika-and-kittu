import { useCallback, useEffect, useRef, useState } from "react";
import { weddingConfig as config } from "./config/wedding";
import { Opening } from "./components/Opening";
import {
  Botanical,
  Fire,
  Flourish,
  Ganesh,
  Icon,
  Lamp,
  Lotus,
  Procession,
} from "./components/Artwork";
import { Countdown } from "./components/Countdown";
import { Celebrations, dateLabel, Locations } from "./components/Celebrations";
import { useSound } from "./hooks/useSound";

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}
export default function App() {
  const [opened, setOpened] = useState(false);
  const [guiding, setGuiding] = useState(false);
  const reducedMotion = useReducedMotion();
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const scrollAnimation = useRef(0);
  const sound = useSound();
  const complete = useCallback(() => {
    setOpened(true);
    window.scrollTo(0, 0);
    window.setTimeout(
      () => heroTitle.current?.focus({ preventScroll: true }),
      50,
    );
  }, []);
  useEffect(() => {
    document.body.classList.toggle("intro-active", !opened);
    return () => document.body.classList.remove("intro-active");
  }, [opened]);
  useEffect(() => {
    document.title = `${config.couple.bride} & ${config.couple.groom} | The Wedding Invitation`;
    const description = `${config.invitation.introduction} Wedding: ${dateLabel(config.wedding.date)}. Reception: ${dateLabel(config.reception.date)}.${config.datesConfirmed ? "" : " Dates and details to be confirmed."}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", config.siteUrl);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", config.siteUrl);
  }, []);
  useEffect(() => {
    if (!opened) return;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [opened, reducedMotion]);
  useEffect(() => {
    const cancel = () => {
      window.cancelAnimationFrame(scrollAnimation.current);
      setGuiding(false);
    };
    const keyCancel = (event: KeyboardEvent) => {
      if (
        event.key === " " &&
        event.target instanceof Element &&
        event.target.closest(".scroll-explore,.pause-journey")
      )
        return;
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
          "Escape",
          "Tab",
        ].includes(event.key)
      )
        cancel();
    };
    const pointerCancel = (event: PointerEvent) => {
      if (
        !(event.target instanceof Element) ||
        !event.target.closest(".scroll-explore,.pause-journey")
      )
        cancel();
    };
    const touchCancel = (event: TouchEvent) => {
      if (
        !(event.target instanceof Element) ||
        !event.target.closest(".scroll-explore,.pause-journey")
      )
        cancel();
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", touchCancel, { passive: true });
    window.addEventListener("pointerdown", pointerCancel, { passive: true });
    window.addEventListener("keydown", keyCancel);
    return () => {
      window.cancelAnimationFrame(scrollAnimation.current);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", touchCancel);
      window.removeEventListener("pointerdown", pointerCancel);
      window.removeEventListener("keydown", keyCancel);
    };
  }, []);
  function explore() {
    if (guiding) {
      window.cancelAnimationFrame(scrollAnimation.current);
      setGuiding(false);
      return;
    }
    if (reducedMotion)
      return document.getElementById("blessings")?.scrollIntoView();
    const start = window.scrollY;
    const finish = document.documentElement.scrollHeight - window.innerHeight;
    const duration = Math.min(36000, Math.max(12000, (finish - start) * 8));
    const begin = performance.now();
    setGuiding(true);
    const step = (now: number) => {
      const progress = Math.min((now - begin) / duration, 1);
      const ease =
        progress < 0.1
          ? (progress * progress) / 0.1
          : progress > 0.9
            ? 1 - ((1 - progress) * (1 - progress)) / 0.1
            : progress;
      window.scrollTo({
        top: start + (finish - start) * ease,
        behavior: "instant",
      });
      if (progress < 1)
        scrollAnimation.current = window.requestAnimationFrame(step);
      else setGuiding(false);
    };
    scrollAnimation.current = window.requestAnimationFrame(step);
  }
  function replay() {
    window.cancelAnimationFrame(scrollAnimation.current);
    setGuiding(false);
    setOpened(false);
    window.scrollTo(0, 0);
  }
  return (
    <>
      {!opened && (
        <Opening onComplete={complete} reducedMotion={reducedMotion} />
      )}
      {opened && (
        <div className="invitation is-open">
          <a href="#main" className="skip-link">
            Skip to invitation
          </a>
          <nav className="navigation" aria-label="Wedding navigation">
            <a
              href="#home"
              className="monogram"
              aria-label="Harika and Dharmendra, home"
            >
              H<span>&</span>D
            </a>
            <span className="nav-caption">THE WEDDING INVITATION</span>
            <div className="nav-links">
              <a href="#blessings">Our invitation</a>
              <a href="#celebrations">Celebrations</a>
              <a href="#directions">Directions</a>
            </div>
            <button
              className={`sound-toggle ${sound.playing ? "playing" : ""}`}
              onClick={sound.toggle}
              aria-pressed={sound.playing}
              disabled={sound.unavailable}
              aria-label={
                sound.unavailable
                  ? "Sound unavailable in this browser"
                  : sound.playing
                    ? "Turn sound off"
                    : "Turn sound on"
              }
            >
              <Icon name={sound.playing ? "sound" : "muted"} />
              <span>
                {sound.unavailable
                  ? "Unavailable"
                  : sound.playing
                    ? "Sound on"
                    : "Sound off"}
              </span>
            </button>
          </nav>
          <main id="main">
            <header className="hero" id="home">
              <Botanical className="hero-botanical" />
              <div className="hero-copy">
                <p className="hero-salutation hindi" lang="hi">
                  {config.religious.salutation}
                </p>
                <p className="eyebrow">THE WEDDING CELEBRATION OF</p>
                <h1 ref={heroTitle} tabIndex={-1}>
                  <span>{config.couple.bride}</span>
                  <em>&</em>
                  <span>{config.couple.groom}</span>
                </h1>
                <Flourish />
                <p className="hero-introduction">
                  {config.invitation.introduction}
                </p>
                <div className="hero-date">
                  <span className="date-day">
                    {dateLabel(config.wedding.date, {
                      day: "2-digit",
                      month: undefined,
                      year: undefined,
                    })}
                  </span>
                  <span className="date-month">
                    {dateLabel(config.wedding.date, {
                      day: undefined,
                      month: "long",
                      year: undefined,
                    })}
                    <small>
                      {dateLabel(config.wedding.date, {
                        day: undefined,
                        month: undefined,
                        year: "numeric",
                      })}
                    </small>
                  </span>
                  <span className="date-weekday">
                    {dateLabel(config.wedding.date, {
                      day: undefined,
                      month: undefined,
                      year: undefined,
                      weekday: "long",
                    })}
                    <small>WITH LOVE & BLESSINGS</small>
                  </span>
                </div>
                {!config.datesConfirmed && (
                  <p className="date-pending">Date to be confirmed</p>
                )}
                <a
                  className="button button-maroon hero-button"
                  href="#celebrations"
                >
                  Explore the celebrations <Icon name="arrow" />
                </a>
              </div>
              <div className="hero-art">
                <div className="art-arch" aria-hidden="true">
                  <span />
                  <span />
                </div>
                <div className="art-caption">
                  TWO HEARTS. ONE SACRED BEGINNING.
                </div>
                <img
                  className="mandap-image"
                  src={`${import.meta.env.BASE_URL}images/mandap.webp`}
                  srcSet={`${import.meta.env.BASE_URL}images/mandap-480.webp 480w, ${import.meta.env.BASE_URL}images/mandap-800.webp 800w, ${import.meta.env.BASE_URL}images/mandap.webp 1400w`}
                  sizes="(max-width: 700px) calc(100vw - 20px), (max-width: 1500px) 52vw, 780px"
                  width="1200"
                  height="800"
                  fetchPriority="high"
                  alt="An original hand-painted floral Hindu mandap, with a bride and groom seated beside the sacred wedding fire"
                />
                <Fire />
                <div className="hero-art-footer">
                  <span>॥</span> A LIFETIME OF TOGETHERNESS <span>॥</span>
                </div>
              </div>
              <button className="scroll-explore" onClick={explore}>
                {guiding ? "Pause the journey" : "Scroll to Explore"}
                <span aria-hidden="true">↓</span>
              </button>
            </header>
            <section
              className="blessings-section section"
              id="blessings"
              aria-labelledby="blessings-title"
            >
              <Botanical className="blessing-botanical left" />
              <Botanical className="blessing-botanical right" />
              <div className="blessings-content reveal">
                <Ganesh className="blessings-ganesh" />
                <p className="eyebrow">AN AUSPICIOUS BEGINNING</p>
                <h2 id="blessings-title">With Divine Blessings</h2>
                <div className="blessings-verse hindi" lang="hi">
                  {config.religious.verse.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <Flourish />
                <p className="blessings-message">
                  Two souls, brought together by love.
                  <br />
                  Two families, united in celebration.
                </p>
                <p className="blessings-subtext">
                  With grateful hearts and the blessings of our families,
                  <br className="desktop-break" /> we begin a beautiful new
                  chapter — and we would love you to be a part of it.
                </p>
                <div className="couple-signature">
                  {config.couple.bride} <span>&</span> {config.couple.groom}
                </div>
              </div>
            </section>
            <Countdown />
            <Celebrations />
            <div className="procession-divider" aria-hidden="true">
              <Procession />
              <span>LOVE, LAUGHTER & A LITTLE CELEBRATION</span>
            </div>
            <Locations />
            <section className="family-section" aria-labelledby="family-title">
              <Lamp className="family-lamp left" />
              <Lamp className="family-lamp right" />
              <div className="reveal">
                <p className="eyebrow">AN INVITATION FROM OUR HEARTS</p>
                <h2 id="family-title">
                  Some moments are more beautiful
                  <br />
                  <i>when shared with you.</i>
                </h2>
                <Flourish light />
                <p className="family-message">{config.invitation.message}</p>
                <p className="family-presence">{config.invitation.presence}</p>
                <p className="family-signature">With love, our families</p>
              </div>
            </section>
            <footer className="closing-section">
              <Lotus />
              <p className="eyebrow">UNTIL WE CELEBRATE TOGETHER</p>
              <h2>
                {config.couple.bride} <i>&</i> {config.couple.groom}
              </h2>
              <p>{config.invitation.closing}</p>
              <Flourish />
              <div className="footer-actions">
                <button className="text-link" onClick={replay}>
                  <Icon name="replay" /> Replay the invitation
                </button>
                <a className="text-link" href="#home">
                  Back to the beginning <span aria-hidden="true">↑</span>
                </a>
              </div>
              <p className="footer-note">
                MADE WITH LOVE, FOR A LIFETIME OF LOVE
              </p>
            </footer>
          </main>
          <nav className="mobile-navigation" aria-label="Quick navigation">
            <a href="#home">
              <span className="mini-monogram">H & D</span>
              <span>Invitation</span>
            </a>
            <a href="#celebrations">
              <Icon name="calendar" />
              <span>Celebrations</span>
            </a>
            <a href="#directions">
              <Icon name="location" />
              <span>Directions</span>
            </a>
          </nav>
          {guiding && (
            <button className="pause-journey" onClick={explore}>
              Pause guided scroll <Icon name="close" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
