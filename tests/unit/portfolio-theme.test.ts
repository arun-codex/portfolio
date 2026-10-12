import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { getStoredTheme, setStoredTheme } from "@/lib/utils";
import { useTheme, type Theme } from "@/hooks/useTheme";

describe("Main Portfolio Theme Engine", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("stores and retrieves liquid-glass theme in localStorage", () => {
    setStoredTheme("liquid-glass");
    expect(getStoredTheme()).toBe("liquid-glass");
  });

  it("applies liquid-glass class to document.documentElement when selected", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("liquid-glass");
    });

    expect(result.current.theme).toBe("liquid-glass");
    expect(document.documentElement.classList.contains("liquid-glass")).toBe(true);
    expect(localStorage.getItem("portfolio-theme")).toBe("liquid-glass");
  });

  it("cycles correctly through all 6 themes including liquid-glass", () => {
    const { result } = renderHook(() => useTheme());
    const expectedOrder: Theme[] = ["dark", "light", "cyberpunk", "terminal", "colobus", "liquid-glass"];

    let current = result.current.theme;
    for (let i = 0; i < expectedOrder.length; i++) {
      act(() => {
        result.current.cycleTheme();
      });
      const nextExpected = expectedOrder[(expectedOrder.indexOf(current) + 1) % expectedOrder.length];
      expect(result.current.theme).toBe(nextExpected);
      current = nextExpected;
    }
  });
});
