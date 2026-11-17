const INDIA_OFFSET = "+05:30";

export function eventTimestamp(event) {
  // An unconfirmed ceremony time counts to the start of the date in India.
  return new Date(
    `${event.date}T${event.time || "00:00"}:00${INDIA_OFFSET}`,
  ).getTime();
}

export function countdownParts(target, now = Date.now()) {
  const remaining = Math.max(0, Math.floor((target - now) / 1000));
  return {
    days: Math.floor(remaining / 86400),
    hours: Math.floor((remaining % 86400) / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
    complete: target <= now,
  };
}

export function safeMapsUrl(value, embedded = false) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const googleHost = /^(www\.)?google\.(com|co\.in)$/.test(url.hostname);
    if (embedded)
      return googleHost && url.pathname.startsWith("/maps/embed")
        ? url.href
        : null;
    const mapsHost = ["maps.google.com", "maps.app.goo.gl", "goo.gl"].includes(
      url.hostname,
    );
    return mapsHost || (googleHost && url.pathname.startsWith("/maps"))
      ? url.href
      : null;
  } catch {
    return null;
  }
}
