import { test } from "node:test";
import assert from "node:assert/strict";
import { processionDelay } from "../src/lib/opening.mjs";

test("cached artwork still allows a complete procession cycle", () => {
  assert.equal(processionDelay(true, 0), 2800);
  assert.equal(processionDelay(true, 2000), 800);
});

test("a slow asset keeps the procession running until it settles", () => {
  assert.equal(processionDelay(false, 5000), 1000);
  assert.equal(processionDelay(true, 5000), 0);
});

test("a stalled request cannot keep a guest in the intro indefinitely", () => {
  assert.equal(processionDelay(false, 5999), 1);
  assert.equal(processionDelay(false, 6000), 0);
  assert.equal(processionDelay(false, 15000), 0);
});

test("settling early preserves the original minimum instead of restarting it", () => {
  assert.equal(processionDelay(true, 2700), 100);
});
