import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export function renderWithTheme(ui: ReactNode) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}