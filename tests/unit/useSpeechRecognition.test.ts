/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from "@testing-library/react";
import { useSpeechRecognition } from "../../src/hooks/useSpeechRecognition";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("useSpeechRecognition", () => {
  let mockSpeechRecognition: any;
  let mockStart: any;
  let mockStop: any;

  beforeEach(() => {
    mockStart = vi.fn();
    mockStop = vi.fn();
    
    mockSpeechRecognition = vi.fn().mockImplementation(() => {
      return {
        continuous: false,
        interimResults: false,
        lang: "",
        start: mockStart,
        stop: mockStop,
        onstart: null,
        onresult: null,
        onerror: null,
        onend: null,
      };
    });

    (window as any).SpeechRecognition = mockSpeechRecognition;
  });

  afterEach(() => {
    delete (window as any).SpeechRecognition;
    delete (window as any).webkitSpeechRecognition;
    vi.clearAllMocks();
  });

  it("should be supported if SpeechRecognition exists in window", () => {
    const { result } = renderHook(() => useSpeechRecognition());
    expect(result.current.isSupported).toBe(true);
  });

  it("should not be supported if SpeechRecognition does not exist", () => {
    delete (window as any).SpeechRecognition;
    const { result } = renderHook(() => useSpeechRecognition());
    expect(result.current.isSupported).toBe(false);
  });

  it("should start listening and set isListening to true", () => {
    const { result } = renderHook(() => useSpeechRecognition());
    
    act(() => {
      result.current.start();
    });

    expect(mockStart).toHaveBeenCalled();

    // simulate onstart event
    act(() => {
      const recognitionInstance = mockSpeechRecognition.mock.results[0].value;
      recognitionInstance.onstart();
    });

    expect(result.current.isListening).toBe(true);
  });

  it("should update transcript and interimTranscript on result", () => {
    const { result } = renderHook(() => useSpeechRecognition());
    
    act(() => {
      const recognitionInstance = mockSpeechRecognition.mock.results[0].value;
      recognitionInstance.onresult({
        resultIndex: 0,
        results: [
          { isFinal: true, 0: { transcript: "Hello" } },
          { isFinal: false, 0: { transcript: " world" } }
        ]
      });
    });

    expect(result.current.transcript).toBe("Hello");
    expect(result.current.interimTranscript).toBe(" world");
  });

  it("should handle permission denial error", () => {
    const { result } = renderHook(() => useSpeechRecognition());
    
    act(() => {
      const recognitionInstance = mockSpeechRecognition.mock.results[0].value;
      recognitionInstance.onerror({ error: "not-allowed" });
    });

    expect(result.current.error).toBe("Microphone access was denied. You can continue typing.");
    expect(result.current.isListening).toBe(false);
  });

  it("should reset properly", () => {
    const { result } = renderHook(() => useSpeechRecognition());
    
    act(() => {
      const recognitionInstance = mockSpeechRecognition.mock.results[0].value;
      recognitionInstance.onresult({
        resultIndex: 0,
        results: [{ isFinal: true, 0: { transcript: "Test" } }]
      });
    });

    expect(result.current.transcript).toBe("Test");

    act(() => {
      result.current.reset();
    });

    expect(result.current.transcript).toBe("");
    expect(result.current.interimTranscript).toBe("");
    expect(result.current.error).toBeNull();
  });
});
