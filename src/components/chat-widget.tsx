"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { QUICK_PROMPTS, getAnswer, type Answer } from "@/lib/chat-answers";

type Message = { id: number; from: "user" | "bot"; answer: Answer };

const GREETING: Answer = {
  match: [],
  text:
    "Hi there! I'm Abdul Nawfal, a UI/UX and product designer, open to new opportunities. Ask me anything, or pick a question below.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "bot", answer: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Closing wipes the thread, so every visit starts fresh
  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => {
      setMessages([{ id: 0, from: "bot", answer: GREETING }]);
      setInput("");
      setTyping(false);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Escape closes and returns focus to the launcher
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep the newest message in view, scrolling the panel only
  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [messages, typing, open]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || typing) return;

    const history = messages.map((m) => ({ from: m.from, text: m.answer.text }));

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "user", answer: { match: [], text } },
    ]);
    setInput("");
    setTyping(true);

    // Local match still supplies the buttons (resume, contact) whatever
    // wording the model returns
    const local = getAnswer(text);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, history }),
      });

      const data = await response.json().catch(() => ({}));

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "bot",
          // Fall back to the written answer if the model is unavailable
          answer: { ...local, text: data.text || local.text },
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", answer: local },
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes chat-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(8px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .chat-panel { animation: chat-in 420ms cubic-bezier(0.16, 1, 0.3, 1) both }

        /* Thin dark scrollbar for the thread */
        .chat-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.18) transparent }
        .chat-scroll::-webkit-scrollbar { width: 6px }
        .chat-scroll::-webkit-scrollbar-track { background: transparent }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.18);
          border-radius: 9999px;
        }
        .chat-scroll:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3) }

        /* Swipeable, no visible bar */
        .no-bar { scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch }
        .no-bar::-webkit-scrollbar { display: none }
        .msg-in     { animation: msg-in 320ms ease-out both }
        @media (prefers-reduced-motion: reduce) {
          .chat-panel, .msg-in { animation: none }
        }
      `}</style>

      {/* Launcher */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        className="group fixed bottom-5 right-5 z-40 flex h-12 items-center gap-3 rounded-full border border-lime-300/40 bg-black/80 pl-4 pr-5 text-sm text-white backdrop-blur-md transition-colors duration-300 hover:border-lime-300 hover:bg-lime-300 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300 motion-reduce:transition-none sm:bottom-8 sm:right-8"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300/70 group-hover:bg-black/40 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300 group-hover:bg-black" />
        </span>
        {open ? "Close" : "Ask about me"}
      </button>

      {/* Panel */}
      {open ? (
        <div
          id="chat-panel"
          ref={panelRef}
          role="dialog"
          aria-label="Ask about Abdul Nawfal"
          className="chat-panel fixed bottom-24 right-4 z-40 flex h-[min(34rem,75vh)] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-white/12 bg-[#0a0a0a] sm:bottom-28 sm:right-8 sm:w-[24rem]"
        >
          <header className="shrink-0 border-b border-white/10 p-5">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className="mb-4 text-white/50 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="sr-only">Close</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <p className="text-base font-semibold text-white">Abdul Nawfal</p>
            <p className="mt-0.5 text-sm text-white/50">UI/UX &amp; Product Designer</p>

            <p className="mt-3 flex items-center gap-2 text-sm text-white/60">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300/70 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
              </span>
              Available for full-time roles
            </p>
          </header>

          <div className="chat-scroll flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`msg-in ${m.from === "user" ? "flex justify-end" : ""}`}
              >
                <div
                  className={
                    m.from === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-sm text-black"
                      : "max-w-[92%] rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3 text-sm leading-relaxed text-white/85"
                  }
                >
                  {m.answer.text}

                  {m.answer.links?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.answer.links.map((link) =>
                        link.download ? (
                          <a
                            key={link.label}
                            href={link.href}
                            download
                            className="rounded-full bg-lime-300 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-lime-200"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-white hover:text-white"
                          >
                            {link.label}
                          </Link>
                        ),
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {typing ? (
              <div className="msg-in flex gap-1.5 px-1" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
            ) : null}

            <div ref={endRef} />
          </div>

          {/* Fixed strip: always reachable, and never pushes the thread around */}
          <div className="w-full shrink-0 border-t border-white/10 px-3 pb-1 pt-3">
            {/* Wrapped, not scrolled — every option visible without a gesture */}
            <div className="flex flex-wrap gap-2 pb-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  type="button"
                  onClick={() => ask(prompt.question)}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/65 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex shrink-0 items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              aria-label="Ask a question"
              className="min-w-0 flex-1 rounded-full bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-300 text-black transition-colors hover:bg-lime-200 disabled:opacity-40"
            >
              <span className="sr-only">Send</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M12 19V5" />
                <path d="m6 11 6-6 6 6" />
              </svg>
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}