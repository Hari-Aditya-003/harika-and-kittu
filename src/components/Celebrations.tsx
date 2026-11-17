import { weddingConfig as config, type Celebration } from "../config/wedding";
import { safeMapsUrl } from "../lib/date.mjs";
import { Flourish, Icon, Lamp, Lotus } from "./Artwork";

export function dateLabel(date: string, options?: Intl.DateTimeFormatOptions) {
  if (!date) return "Date to be announced";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: config.timezone,
    ...options,
  }).format(new Date(`${date}T12:00:00+05:30`));
}
export function timeLabel(time: string) {
  if (!time) return "Time to be announced";
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"} IST`;
}
export function Celebrations() {
  return (
    <section
      className="section celebrations-section"
      id="celebrations"
      aria-labelledby="celebrations-title"
    >
      <div className="section-heading reveal">
        <p className="eyebrow">TWO BEAUTIFUL DAYS. A LIFETIME OF MEMORIES.</p>
        <h2 id="celebrations-title">The Celebrations</h2>
        <Flourish />
      </div>
      <div className="event-grid">
        <EventCard
          event={config.wedding}
          name="The Wedding"
          subtitle="THE SACRED BEGINNING"
          index="01"
        />
        <EventCard
          event={config.reception}
          name="The Reception"
          subtitle="AN EVENING OF JOY"
          index="02"
          reception
        />
      </div>
      {!config.reception.dateConfirmed && (
        <p className="provisional-note">
          Reception date and venue details will be announced here.
        </p>
      )}
    </section>
  );
}
function EventCard({
  event,
  name,
  subtitle,
  index,
  reception = false,
}: {
  event: Celebration;
  name: string;
  subtitle: string;
  index: string;
  reception?: boolean;
}) {
  return (
    <article
      className={`event-card reveal ${reception ? "reception-card" : ""}`}
    >
      <span className="event-index">{index}</span>
      <div className="event-art">
        {reception ? (
          <>
            <Lamp />
            <Lamp />
          </>
        ) : (
          <Lotus />
        )}
      </div>
      <p className="eyebrow">{subtitle}</p>
      <h3>{name}</h3>
      <Flourish />
      <p className="event-weekday" hidden={!event.date}>
        {dateLabel(event.date, {
          weekday: "long",
          day: undefined,
          month: undefined,
          year: undefined,
        })}
      </p>
      <p className="event-date">{dateLabel(event.date)}</p>
      <p className="event-time">{timeLabel(event.time)}</p>
      <p className="event-note">{event.note}</p>
      <a
        className="text-link"
        href={`#${reception ? "reception-location" : "wedding-location"}`}
      >
        Venue & details <Icon name="arrow" />
      </a>
    </article>
  );
}
export function Locations() {
  return (
    <section
      className="section locations-section"
      id="directions"
      aria-labelledby="directions-title"
    >
      <div className="section-heading reveal">
        <p className="eyebrow">WE LOOK FORWARD TO WELCOMING YOU</p>
        <h2 id="directions-title">Find Your Way to Us</h2>
        <Flourish />
      </div>
      <div className="locations-grid">
        <LocationCard
          event={config.wedding}
          name="Wedding Ceremony"
          id="wedding-location"
        />
        <LocationCard
          event={config.reception}
          name="Wedding Reception"
          id="reception-location"
        />
      </div>
    </section>
  );
}
function LocationCard({
  event,
  name,
  id,
}: {
  event: Celebration;
  name: string;
  id: string;
}) {
  const maps = safeMapsUrl(event.mapsUrl);
  const embedded = safeMapsUrl(event.embedUrl, true);
  return (
    <article className="location-card reveal" id={id}>
      <div className="location-icon">
        <Icon name="location" />
      </div>
      <div className="location-copy">
        <p className="eyebrow">{dateLabel(event.date)}</p>
        <h3>{name}</h3>
        <p className="venue-name">
          {event.venue || "A beautiful setting awaits"}
        </p>
        {event.address && <p>{event.address}</p>}
        {event.city && <p>{event.city}</p>}
        <p className="location-time">{timeLabel(event.time)}</p>
        {maps ? (
          <a
            href={maps}
            className="button button-maroon"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions <Icon name="arrow" />
          </a>
        ) : (
          <p className="location-pending">
            <span />
            Location coming soon
          </p>
        )}
      </div>
      {embedded && (
        <iframe
          className="map-embed"
          src={embedded}
          title={`${name} map`}
          loading="lazy"
          referrerPolicy="no-referrer"
          allowFullScreen
        />
      )}
    </article>
  );
}
