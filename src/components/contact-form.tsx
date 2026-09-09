"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";
type ServerError = { error?: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

/** Shown as a fallback when sending fails */
const EMAIL = "abdulnawfal11011@gmail.com";

const FIELD =
  "w-full border-0 border-b border-white/15 bg-transparent pb-3 pt-2 text-lg text-white placeholder:text-white/25 focus:border-white focus:outline-none focus:ring-0 transition-colors";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState("");

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That email doesn't look right.";
    if (message.length < 10) next.message = "A little more detail helps.";

    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: "Portfolio enquiry",
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      if (!response.ok) {
        // The route explains what it rejected — log it and show it,
        // rather than a blanket "something went wrong"
        const detail = (await response.json().catch(() => ({}))) as ServerError;
        console.error("Contact API:", response.status, detail);

        setFailure(
          response.status === 429
            ? "Too many messages just now. Please try again shortly."
            : (detail.error ?? `Request failed (${response.status})`),
        );
        setStatus("error");
        return;
      }

      setStatus("sent");
      setFailure("");
      form.reset();
    } catch (error) {
      console.error("Contact request failed:", error);
      setFailure("Couldn't reach the server. Check your connection.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[22rem] flex-col justify-center border-t border-white/10 pt-10">
        <style>{`
          @keyframes sent-in {
            from { opacity: 0; transform: translateY(14px) }
            to   { opacity: 1; transform: translateY(0) }
          }
          .sent-in { animation: sent-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both }
          @media (prefers-reduced-motion: reduce) { .sent-in { animation: none } }
        `}</style>

        <span
          aria-hidden="true"
          className="sent-in mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m5 13 4 4L19 7" />
          </svg>
        </span>

        <p
          className="sent-in text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          style={{ animationDelay: "90ms" }}
        >
          Message sent.
        </p>
        <p
          className="sent-in mt-4 max-w-[36ch] text-base text-white/55"
          style={{ animationDelay: "180ms" }}
        >
          Thanks for reaching out — I&rsquo;ll get back to you within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          style={{ animationDelay: "270ms" }}
          className="sent-in mt-8 w-fit text-sm text-white/50 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-12">
      <p className="flex items-center gap-2.5 text-sm text-white/60">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Open to new opportunities
      </p>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs uppercase text-white/35">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${FIELD} ${errors.name ? "border-red-400/70" : ""}`}
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 text-sm text-red-400/90">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="text-xs uppercase text-white/35">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${FIELD} ${errors.email ? "border-red-400/70" : ""}`}
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-sm text-red-400/90">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-xs uppercase text-white/35">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="What are you building, and what do you need?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${FIELD} resize-none ${errors.message ? "border-red-400/70" : ""}`}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-red-400/90">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex w-full items-center justify-between gap-4 rounded-full bg-white py-3 pl-7 pr-3 text-base font-medium text-black transition-colors duration-300 hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none sm:w-auto sm:justify-start"
        >
          {status === "sending" ? "Sending\u2026" : "Send message"}
          <span
            className={[
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 motion-reduce:transition-none",
              status === "sending" ? "" : "group-hover:rotate-45",
            ].join(" ")}
          >
            {status === "sending" ? (
              // Ring with a gap, spinning — reads as work in progress
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 animate-spin">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeOpacity="0.25"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
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
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            )}
          </span>
        </button>

        <p aria-live="polite" className="text-sm text-white/60">
          {status === "error" ? (
            <>
              {failure}{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="underline underline-offset-4 hover:text-white"
              >
                Email me directly
              </a>
              .
            </>
          ) : (
            ""
          )}
        </p>
      </div>
    </form>
  );
}