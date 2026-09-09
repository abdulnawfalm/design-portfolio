"use client";

import { useEffect, useRef, useState } from "react";

/**
 * DRAFT quotes for cards 1 and 3 — written from the work, not from the person.
 * Replace with their own words, and get permission, before this goes live.
 */
const TESTIMONIALS = [
  {
    quote:
      "Abdul took on our ship chartering and HR products and delivered work well beyond what we expected at his level. He asks the right questions early, learns an unfamiliar domain quickly, and hands over designs the development team can build from without a long back and forth. Dependable, and genuinely invested in the outcome.",
    name: "Mohamed Saleem",
    role: "Managing Director",
    company: "Your Office Partners",
  },
  {
    quote:
      "I had the opportunity to work with Nawfal, and I was impressed by his creativity and willingness to learn. He contributed well to UI/UX design, social media creatives, and website design, while also taking the initiative to learn programming alongside his design work. His valuable ideas and proactive approach made him a great addition to the team.",
    name: "Mohamed Azath",
    role: "Team Lead",
    company: "Your Office Partners",
  },
  {
    quote:
      "Abdul worked across several client projects with us, from a vendor management platform to an internal banking dashboard. He turned complicated requirements into interfaces our clients found easy to use, met his deadlines consistently, and explained his design decisions in a way non-designers could act on. A genuine asset to the team.",
    name: "Aananth Kirshnamoorthy",
    role: "Senior Manager",
    company: "NGEN LABS",
  },
];

/** Fires once when the row scrolls into view, then stops observing */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export default function Testimonials() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="bg-black px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(24px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .card-pre { opacity: 0 }
        .card-in  { animation: card-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both }
        @media (prefers-reduced-motion: reduce) {
          .card-pre { opacity: 1 }
          .card-in  { animation: none }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Testimonials
        </h2>

        <div
          ref={ref}
          className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-3 lg:gap-6"
        >
          {TESTIMONIALS.map((item, i) => (
            // The animation lives on this wrapper, never on the card itself —
            // the card's hover lift uses transform, and a filled animation on
            // the same element would win and kill the hover.
            <div
              key={item.name}
              className={`h-full ${inView ? "card-in" : "card-pre"}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
            <figure
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b0b0b] p-8 transition-[border-color,background-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-[#101010] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-9"
            >
              {/* Light catching the top edge — the card's only ornament */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent transition-opacity duration-500 group-hover:via-white/50"
              />

              {/* Attribution leads, so the eye lands on who said it first */}
              <figcaption className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-sm font-medium tracking-wide text-white/70 transition-colors duration-500 group-hover:border-white/30 group-hover:text-white"
                >
                  {initials(item.name)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-base font-medium text-white">
                    {item.name}
                  </span>
                  <span className="block truncate text-sm text-white/45">
                    {item.role}, {item.company}
                  </span>
                </span>
              </figcaption>

              <hr className="my-7 border-white/[0.08]" />

              <blockquote className="text-base leading-[1.6] text-white/75 transition-colors duration-500 group-hover:text-white/90 sm:text-lg">
                {item.quote}
              </blockquote>

              {/* Index sits at the foot, quiet, tying the three together */}
              <span
                aria-hidden="true"
                className="mt-auto block pt-10 text-xs tabular-nums text-white/20"
              >
                {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}