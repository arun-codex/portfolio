import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

vi.mock("server-only", () => ({}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    value: ResizeObserverMock,
  });

  Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
    writable: true,
    value: vi.fn(),
  });

  Object.defineProperty(window, "scrollTo", {
    writable: true,
    value: vi.fn(),
  });

  vi.mock("framer-motion", () => {
    const motionProps = new Set([
      "initial",
      "animate",
      "exit",
      "transition",
      "whileHover",
      "whileTap",
      "variants",
      "layout",
      "drag",
      "dragConstraints",
    ]);

    const createMotionComponent = (tag: string) => {
      const Component = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) => {
        const domProps = Object.fromEntries(
          Object.entries(props).filter(([key]) => !motionProps.has(key))
        );

        return React.createElement(tag, { ref, ...domProps }, children);
      });
      Component.displayName = `Motion(${tag})`;
      return Component;
    };

    const motion = new Proxy(
      {},
      {
        get: (_, tag: string) => createMotionComponent(tag),
      }
    );

    return {
      AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
      motion,
    };
  });

  vi.mock("next/image", () => ({
    default: (props: Record<string, unknown>) => {
      return React.createElement("img", props);
    },
  }));
});