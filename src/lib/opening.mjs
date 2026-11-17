export const MIN_PROCESSION_MS = 4200;
export const MAX_PROCESSION_MS = 12000;

// Recalculate from the original start when assets settle, without restarting it.
export function processionDelay(assetsSettled, elapsed) {
  return Math.max(
    0,
    (assetsSettled ? MIN_PROCESSION_MS : MAX_PROCESSION_MS) - elapsed,
  );
}
