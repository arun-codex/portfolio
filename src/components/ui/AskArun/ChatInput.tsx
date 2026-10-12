"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { Mic, Square } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

const MAX_LENGTH = 1500;

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}

/**
 * Textarea + send button for composing messages.
 *
 * - Enter key sends the message
 * - Shift+Enter inserts a newline
 * - Empty or whitespace-only messages are rejected
 * - Messages over MAX_LENGTH are blocked
 */
export function ChatInput({ onSend, disabled = false, value, onChange }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    start,
    stop,
    reset,
  } = useSpeechRecognition();

  const [baseValue, setBaseValue] = useState("");

  // Compute the current text to display in the input
  const displayValue = isListening
    ? baseValue +
      (baseValue && (transcript || interimTranscript) ? " " : "") +
      transcript +
      interimTranscript
    : value;

  // Commit the voice transcript when listening stops naturally or manually
  useEffect(() => {
    if (!isListening && transcript) {
      const finalResult =
        baseValue +
        (baseValue ? " " : "") +
        transcript;
      onChange(finalResult);
      reset();
    }
  }, [isListening, transcript, onChange, reset, baseValue]);

  const handleSend = useCallback(() => {
    const trimmed = displayValue.trim();
    if (!trimmed || disabled) return;
    if (trimmed.length > MAX_LENGTH) return;

    if (isListening) {
      stop();
      reset();
    }

    onSend(trimmed);
    onChange("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [displayValue, disabled, onSend, onChange, isListening, stop, reset]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (isListening) {
        // If the user manually types while listening, cancel voice mode and take their typed input
        stop();
        reset();
      }
      onChange(e.target.value);

      // Auto-grow textarea
      const ta = e.target;
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
    },
    [onChange, isListening, stop, reset]
  );

  const toggleListening = useCallback(() => {
    if (isListening) {
      stop();
    } else {
      setBaseValue(value);
      start();
    }
  }, [isListening, start, stop, value]);

  const overLimit = displayValue.length > MAX_LENGTH;
  const canSend = displayValue.trim().length > 0 && !disabled && !overLimit;

  // Auto-focus on mount, when re-enabled (after AI response), or when voice stops
  useEffect(() => {
    if (!disabled && textareaRef.current && !isListening) {
      textareaRef.current.focus({ preventScroll: true });
    }
  }, [disabled, isListening]);

  return (
    <div className="ask-arun-input-area">
      {/* Voice Recognition Error Message */}
      {error && (
        <div className="ask-arun-voice-error" aria-live="polite">
          {error}
        </div>
      )}

      <div className={`ask-arun-input-wrapper${overLimit ? " ask-arun-input-wrapper--error" : ""}`}>
        <textarea
          ref={textareaRef}
          className="ask-arun-textarea"
          placeholder="Ask something about Arun..."
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          maxLength={MAX_LENGTH + 50} // allow slight overrun so user sees counter
          aria-label="Type your message"
          aria-describedby="ask-arun-char-count"
          autoComplete="off"
          spellCheck={false}
        />

        {/* Voice Input Button */}
        {isSupported && (
          <button
            className={`ask-arun-mic-btn${isListening ? " ask-arun-mic-btn--listening" : ""}`}
            onClick={toggleListening}
            disabled={disabled}
            aria-label={isListening ? "Stop voice input" : "Use voice input"}
            title={isListening ? "Stop voice input" : "Use voice input"}
            type="button"
          >
            {isListening ? <Square size={16} className="ask-arun-pulse-icon" /> : <Mic size={16} />}
          </button>
        )}

        <button
          className="ask-arun-send-btn"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          type="button"
        >
          <SendIcon />
        </button>
      </div>

      {/* Character counter — only visible near limit */}
      {displayValue.length > MAX_LENGTH * 0.8 && (
        <p
          id="ask-arun-char-count"
          className={`ask-arun-char-count${overLimit ? " ask-arun-char-count--error" : ""}`}
          aria-live="polite"
        >
          {displayValue.length}/{MAX_LENGTH}
        </p>
      )}
    </div>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M14.5 8L2 2L5 8L2 14L14.5 8Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}
