import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { useState } from "react";
import { ChatInput } from "@/components/ui/AskArun/ChatInput";
import { ChatMessage } from "@/components/ui/AskArun/ChatMessage";
import { QuickPrompts } from "@/components/ui/AskArun/QuickPrompts";
vi.mock("@/components/providers/ThemeProvider", () => ({
  useThemeContext: () => ({
    theme: "dark",
    setTheme: vi.fn(),
    cycleTheme: vi.fn(),
    toggleTheme: vi.fn(),
    mounted: true,
  }),
}));
import { Button } from "@/components/ui/Button";
import { render } from "@testing-library/react";

function ChatInputHarness({ onSend }: { onSend: (value: string) => void }) {
  const [value, setValue] = useState("");

  return <ChatInput value={value} onChange={setValue} onSend={onSend} />;
}

describe("Ask Arun UI building blocks", () => {
  it("sends messages from the input with Enter", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();

    render(<ChatInputHarness onSend={onSend} />);

    const input = screen.getByLabelText(/type your message/i);
    await user.type(input, "Who is Arun?{enter}");

    expect(onSend).toHaveBeenCalledWith("Who is Arun?");
    expect(input).toHaveValue("");
  });

  it("renders assistant responses safely", () => {
    const { container } = render(
      <ChatMessage
        message={{
          id: "1",
          role: "assistant",
          content:
            'Try <script>alert(1)</script> [safe](https://example.com) [bad](javascript:alert(1)) and `code`.',
          timestamp: Date.now(),
          status: "complete",
        }}
      />
    );

    expect(container.querySelector("script")).toBeNull();
    expect(screen.getByRole("link", { name: /safe/i })).toHaveAttribute("href", "https://example.com");
    expect(screen.queryByRole("link", { name: /bad/i })).toBeNull();
    expect(screen.getByText(/code/i)).toBeInTheDocument();
  });

  it("renders quick prompts and forwards the selected prompt", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(<QuickPrompts onSelect={onSelect} />);
    await user.click(screen.getByText(/what cybersecurity projects has arun built/i));

    expect(onSelect).toHaveBeenCalledWith("What cybersecurity projects has Arun built?");
  });

  it("renders themed buttons as usable links", () => {
    render(
      <Button href="#projects" variant="ghost">
        View Projects
      </Button>
    );

    expect(screen.getByRole("link", { name: /view projects/i })).toHaveAttribute("href", "#projects");
  });
});