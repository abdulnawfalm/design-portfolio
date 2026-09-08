"use client";

import { useState } from "react";

const SUBJECTS = [
  "UI/UX Design",
  "Product Design",
  "Development",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const FIELD =
  "w-full border-0 border-b border-white/15 bg-transparent pb-3 pt-2 text-lg text-white placeholder:text-white/25 focus:border-white focus:outline-none focus:ring-0 transition-colors";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [errors, setErrors] = useState<Errors>({});

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
          subject,
          message: data.get("message"),
        }),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[22rem] flex-col justify-center border-t border-white/10 pt-10">
        <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Message sent.
        </p>
        <p className="mt-4 max-w-[36ch] text-base text-white/55">
          Thanks for reaching out — I&rsquo;ll get back to you within a day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 w-fit text-sm text-white/50 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-12">
      {/* Chips instead of a select — the options are short and worth seeing */}
      <fieldset>
        <legend className="text-xs uppercase text-white/35">
          What&rsquo;s it about
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {SUBJECTS.map((option) => {
            const active = option === subject;

            return (
              <button
                key={option}
                type="button"
                onClick={() => setSubject(option)}
                aria-pressed={active}
                className={[
                  "rounded-full px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none",
                  active
                    ? "bg-white text-black"
                    : "border border-white/15 text-white/65 hover:border-white/40 hover:text-white",
                ].join(" ")}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

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
          className="group inline-flex w-full items-center justify-between gap-4 rounded-full bg-white py-3 pl-7 pr-3 text-base font-medium text-black transition-colors duration-300 hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:opacity-60 motion-reduce:transition-none sm:w-auto sm:justify-start"
        >
          {status === "sending" ? "Sending" : "Send message"}
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none">
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
          </span>
        </button>

        <p aria-live="polite" className="text-sm text-white/50">
          {status === "error"
            ? "Something went wrong. Email me directly instead."
            : ""}
        </p>
      </div>
    </form>
  );
}