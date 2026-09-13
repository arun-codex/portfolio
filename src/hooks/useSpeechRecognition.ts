/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useSpeechRecognition() {
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Use 'any' since standard DOM types don't include SpeechRecognition yet
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript("");
      setInterimTranscript("");
    };

    recognition.onresult = (event: any) => {
      let currentFinal = "";
      let currentInterim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          currentFinal += result[0].transcript;
        } else {
          currentInterim += result[0].transcript;
        }
      }

      if (currentFinal) {
        setTranscript((prev) => prev + currentFinal);
      }
      setInterimTranscript(currentInterim);
    };

    recognition.onerror = (event: any) => {
      let errorMessage = "Voice recognition error occurred.";
      switch (event.error) {
        case "not-allowed":
        case "service-not-allowed":
          errorMessage = "Microphone access was denied. You can continue typing.";
          break;
        case "audio-capture":
          errorMessage = "No microphone was found.";
          break;
        case "network":
          errorMessage = "Network error occurred during speech recognition.";
          break;
        case "no-speech":
          errorMessage = "No speech was detected.";
          break;
        case "aborted":
          errorMessage = "Speech recognition was aborted.";
          break;
        default:
          errorMessage = `Recognition error: ${event.error}`;
      }
      setError(errorMessage);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript(""); // Clear interim when stopped
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const start = useCallback(() => {
    if (recognitionRef.current) {
      try {
        setTranscript("");
        setInterimTranscript("");
        setError(null);
        recognitionRef.current.start();
      } catch {
        // Safely handle already-started errors
      }
    }
  }, []);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
    setError(null);
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    start,
    stop,
    reset,
  };
}
