import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  weddingConfig as config,
  type Celebration,
} from "./src/config/wedding";
import { safeMapsUrl } from "./src/lib/date.mjs";

const escapeHTML = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
const label = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: config.timezone,
  }).format(new Date(`${date}T12:00:00+05:30`));
const names = `${config.couple.bride} & ${config.couple.groom}`;
const destination = new URL(config.siteUrl);
const qrEntry = new URL(config.qrEntryUrl);
if (destination.protocol !== 'https:') throw new Error('siteUrl must use HTTPS');
const scriptString = (value: string) => JSON.stringify(value).replaceAll('<', '\\u003c');
const redirect = destination.href === qrEntry.href ? '' : `<script>if(location.origin===${scriptString(qrEntry.origin)}&&(location.pathname===${scriptString(qrEntry.pathname)}||location.pathname===${scriptString(qrEntry.pathname+'index.html')})){location.replace(${scriptString(destination.href)}+location.hash)}</script>`;
const description = `${config.invitation.introduction} Wedding: ${label(config.wedding.date)}. Reception: ${label(config.reception.date)}.${config.datesConfirmed ? "" : " Dates and details to be confirmed."}`;
const fallbackEvent = (name: string, event: Celebration) => {
  const maps = safeMapsUrl(event.mapsUrl);
  const address = [event.venue, event.address, event.city]
    .filter(Boolean)
    .map((value) => `<p>${escapeHTML(value)}</p>`)
    .join("");
  return `<section><h2>${name}</h2><p>${label(event.date)}</p><p>${event.time ? `${escapeHTML(event.time)} IST` : "Time to be announced"}</p>${address}${maps ? `<p><a href="${escapeHTML(maps)}" target="_blank" rel="noopener noreferrer">Get directions</a></p>` : "<p>Location coming soon</p>"}</section>`;
};
const metadata = {
  __WEDDING_REDIRECT__: redirect,
  __WEDDING_TITLE__: escapeHTML(`${names} | The Wedding Invitation`),
  __WEDDING_DESCRIPTION__: escapeHTML(description),
  __WEDDING_URL__: escapeHTML(config.siteUrl.replace(/\/?$/, "/")),
  __WEDDING_FALLBACK__: `<main style="max-width:600px;margin:60px auto;padding:30px;text-align:center;font-family:Georgia,serif;color:#6e1724"><p lang="hi">${escapeHTML(config.religious.salutation)}</p><h1>${escapeHTML(names)}</h1><p>${escapeHTML(config.invitation.introduction)}</p>${fallbackEvent("The Wedding", config.wedding)}${fallbackEvent("The Reception", config.reception)}${config.datesConfirmed ? "" : "<p>Dates to be confirmed.</p>"}<p>${escapeHTML(config.invitation.closing)}</p><p>Enable JavaScript to enjoy the animated invitation and live countdown.</p></main>`,
};

export default defineConfig({
  plugins: [
    react(),
    {
      name: "wedding-metadata",
      transformIndexHtml(html) {
        return Object.entries(metadata).reduce(
          (result, [key, value]) => result.replaceAll(key, value),
          html,
        );
      },
    },
  ],
  base: "./",
  build: { target: "es2020" },
});
