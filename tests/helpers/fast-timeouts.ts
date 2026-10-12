import { vi } from "vitest";

export function makeSetTimeoutImmediate() {
  return vi.spyOn(globalThis, "setTimeout").mockImplementation((callback, _delay, ...args) => {
    if (typeof callback === "function") {
      callback(...args);
    }
    return 0 as never;
  });
}