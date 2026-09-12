import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { AskArunPanel } from "@/components/ui/AskArun/AskArunPanel";
import { render } from "@testing-library/react";

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockImplementation((input: RequestInfo | URL) => {
    const url = String(input);

    if (url.includes("/api/conversations")) {
      return Promise.resolve(
        new Response(JSON.stringify({ messages: [], conversationId: null }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
      );
    }

    if (url.includes("/api/chat")) {
      return Promise.resolve(
        new Response(JSON.stringify({ answer: "Arun Kumar is a BCA student in India.", conversationId: null }), {
          status: 200,
          headers: { "content-type": "application/json" },
        })
      );
    }

    return Promise.reject(new Error(`Unexpected fetch: ${url}`));
  });

  vi.stubGlobal("fetch", fetchMock);
});

describe("Ask Arun panel", () => {
  it("sends a message, shows the response, and clears local history", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<AskArunPanel isOpen={true} onClose={onClose} />);

    expect(screen.getByRole("dialog", { name: /ask arun/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText(/type your message/i)).toBeEnabled();
    });

    const input = screen.getByLabelText(/type your message/i);
    fireEvent.change(input, { target: { value: "Who is Arun?" } });
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/who is arun\?/i)).toBeInTheDocument();
    expect(await screen.findByText(/arun kumar is a bca student in india/i)).toBeInTheDocument();

    expect(sessionStorage.getItem("ask-arun-history")).toContain("Who is Arun?");

    await user.click(screen.getByRole("button", { name: /start a new chat/i }));

    await waitFor(() => {
      expect(sessionStorage.getItem("ask-arun-history")).toBeNull();
    });
    expect(screen.queryByText(/who is arun\?/i)).toBeNull();
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not send blank or whitespace-only messages", async () => {
    render(<AskArunPanel isOpen={true} onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/type your message/i)).toBeEnabled();
    });

    fireEvent.change(screen.getByLabelText(/type your message/i), { target: { value: "   " } });

    expect(screen.getByRole("button", { name: /send message/i })).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("shows a friendly error when the API fails", async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/conversations")) {
        return Promise.resolve(
          new Response(JSON.stringify({ messages: [], conversationId: null }), { status: 200 })
        );
      }

      return Promise.resolve(new Response(JSON.stringify({ error: "Server failure" }), { status: 500 }));
    });

    const user = userEvent.setup();
    render(<AskArunPanel isOpen={true} onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByLabelText(/type your message/i)).toBeEnabled();
    });

    fireEvent.change(screen.getByLabelText(/type your message/i), { target: { value: "Who is Arun?" } });
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await screen.findByText(/i'm having trouble right now/i);
    expect(screen.queryByText(/Server failure/i)).toBeNull();
  });
});