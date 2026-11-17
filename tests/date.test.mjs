import { test } from "node:test";
import assert from "node:assert/strict";
import {
  countdownParts,
  eventTimestamp,
  safeMapsUrl,
} from "../src/lib/date.mjs";

test("an unconfirmed start time counts to midnight in India, regardless of guest timezone", () => {
  assert.equal(
    eventTimestamp({ date: "2026-11-23", time: "" }),
    Date.parse("2026-11-22T18:30:00Z"),
  );
});
test("the configured ceremony time uses Indian Standard Time", () => {
  assert.equal(
    eventTimestamp({ date: "2026-11-23", time: "10:30" }),
    Date.parse("2026-11-23T05:00:00Z"),
  );
});
test("countdown handles day, minute and second boundaries", () => {
  assert.deepEqual(countdownParts(90061000, 0), {
    days: 1,
    hours: 1,
    minutes: 1,
    seconds: 1,
    complete: false,
  });
  assert.equal(countdownParts(60000, 1000).seconds, 59);
});
test("an elapsed wedding date celebrates without negative numbers", () => {
  assert.deepEqual(countdownParts(1000, 2000), {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    complete: true,
  });
  assert.equal(countdownParts(1000, 1000).complete, true);
});
test("wedding and reception map destinations remain independent", () => {
  const wedding = "https://www.google.com/maps/dir/?api=1&destination=Wedding";
  const reception = "https://maps.app.goo.gl/reception";
  assert.equal(safeMapsUrl(wedding), wedding);
  assert.equal(safeMapsUrl(reception), reception);
  assert.notEqual(safeMapsUrl(wedding), safeMapsUrl(reception));
});
test("missing, invalid, unsafe, and lookalike map URLs cannot become navigation links", () => {
  for (const value of [
    "",
    "not a url",
    "javascript:alert(1)",
    "http://maps.google.com/",
    "https://google.com.evil.com/maps",
    "https://www.google.com/search?q=venue",
  ])
    assert.equal(safeMapsUrl(value), null);
});
test("only Google Maps embed URLs can become embedded maps", () => {
  const embed = "https://www.google.com/maps/embed?pb=example";
  assert.equal(safeMapsUrl(embed, true), embed);
  assert.equal(safeMapsUrl("https://maps.app.goo.gl/example", true), null);
  assert.equal(safeMapsUrl("https://example.com/maps/embed", true), null);
});

test("the invitation counts to the confirmed 23 December wedding in Indian time", async () => {
  const { weddingConfig } = await import("../src/config/wedding.ts");
  assert.equal(weddingConfig.wedding.date, "2026-12-23");
  assert.deepEqual(
    countdownParts(
      eventTimestamp(weddingConfig.wedding),
      Date.parse("2026-11-17T17:45:04+05:30"),
    ),
    {
      days: 35,
      hours: 6,
      minutes: 14,
      seconds: 56,
      complete: false,
    },
  );
});
