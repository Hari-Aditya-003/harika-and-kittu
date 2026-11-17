import { useEffect, useState } from "react";
import { weddingConfig as config } from "../config/wedding";
import { countdownParts, eventTimestamp } from "../lib/date.mjs";
import { dateLabel } from "./Celebrations";
import { Flourish } from "./Artwork";

export function Countdown() {
  const [time, setTime] = useState(() =>
    countdownParts(eventTimestamp(config.wedding)),
  );
  useEffect(() => {
    const target = eventTimestamp(config.wedding);
    const timer = window.setInterval(
      () => setTime(countdownParts(target)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section
      className="countdown-section"
      id="countdown"
      aria-labelledby="countdown-title"
    >
      <div className="countdown-frame" />
      <div className="reveal">
        <p className="eyebrow">EVERY MOMENT BRINGS US CLOSER</p>
        <h2 id="countdown-title">
          Counting Down to
          <br />
          <i>Our Big Day</i>
        </h2>
        <Flourish light />
        {time.complete ? (
          <p className="celebration-message" role="status">
            Our wedding day is here.
            <br />
            Let the celebrations begin!
          </p>
        ) : (
          <div
            className="countdown"
            role="timer"
            aria-label={`${time.days} days, ${time.hours} hours, ${time.minutes} minutes until the wedding`}
          >
            {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
              <div className="countdown-unit" key={unit}>
                <span
                  className="countdown-number"
                  key={`${unit}-${time[unit]}`}
                >
                  {String(time[unit]).padStart(2, "0")}
                </span>
                <span className="countdown-label">{unit}</span>
              </div>
            ))}
          </div>
        )}
        <p className="countdown-target">{dateLabel(config.wedding.date)}</p>
        <p className="countdown-note">
          {!config.wedding.time
            ? "Counting to the wedding date · Indian Standard Time"
            : "Counting to the ceremony · Indian Standard Time"}
        </p>
      </div>
    </section>
  );
}
