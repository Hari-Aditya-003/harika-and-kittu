import { test } from "node:test";
import assert from "node:assert/strict";
import { processionDelay } from "../src/lib/opening.mjs";

test("cached artwork still allows a complete procession cycle", () => {
  assert.equal(processionDelay(true, 0), 4200);
  assert.equal(processionDelay(true, 2000), 2200);
});

test("a slow asset keeps the procession running until it settles", () => {
  assert.equal(processionDelay(false, 5000), 7000);
  assert.equal(processionDelay(true, 5000), 0);
});

test("a stalled request cannot keep a guest in the intro indefinitely", () => {
  assert.equal(processionDelay(false, 11999), 1);
  assert.equal(processionDelay(false, 12000), 0);
  assert.equal(processionDelay(false, 15000), 0);
});

test("settling early preserves the original minimum instead of restarting it", () => {
  assert.equal(processionDelay(true, 4100), 100);
});
