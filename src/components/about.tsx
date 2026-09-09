"use client";

import { useEffect, useRef, useState } from "react";

import { RESUMES } from "@/lib/chat-answers";

/** Paths live in one place — chat-answers.ts — so both offer the same files */
const CVS = [
  { label: "CV for UAE", href: RESUMES.dubai },
  { label: "CV for Finland", href: RESUMES.helsinki },
];

const STATEMENT = "Designing the experience behind better products.";

const STATS = [
  { value: "2.5", suffix: " yrs", label: "Experience" },
  { value: "20", suffix: "+", label: "Projects completed" },
  { value: "100", suffix: "%", label: "Satisfaction" },
];

/** Newest first. Recognition sits under the role that earned it. */
const EXPERIENCE = [
  {
    role: "UI/UX Designer & Graphic Designer",
    company: "Your Office Partners",
    period: "2025 — 2025",
    note: "Employee of the Month",
  },
];

/** Fires once when the element scrolls into view, then stops observing */
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 4v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M5 20h14" />
    </svg>
  );
}

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const stats = useInView<HTMLDListElement>();
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Clicking away or pressing Escape dismisses the picker
  useEffect(() => {
    if (!pickerOpen) return;

    const onDown = (event: MouseEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) {
        setPickerOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPickerOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [pickerOpen]);

  return (
    <section id="about" className="bg-black px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <style>{`
        @keyframes about-blur {
          from { opacity: 0; filter: blur(12px); transform: translateY(0.3em) }
          to   { opacity: 1; filter: blur(0);    transform: translateY(0) }
        }
        @keyframes about-scale {
          from { opacity: 0; transform: scale(0.94) }
          to   { opacity: 1; transform: scale(1) }
        }
        .about-pre   { opacity: 0 }
        .about-word  { display: inline-block; animation: about-blur 700ms ease-out both }
        .about-scale { animation: about-scale 800ms cubic-bezier(0.16, 1, 0.3, 1) both;
                       transform-origin: left center }
        @keyframes about-rise {
          from { opacity: 0; transform: translateY(20px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .about-rise { animation: about-rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both }

        @media (prefers-reduced-motion: reduce) {
          .about-pre { opacity: 1 }
          .about-word, .about-scale, .about-rise { animation: none }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          About
        </h2>

        <div ref={ref} className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: words blur in one after another */}
          <p className="text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:col-span-7 lg:text-6xl">
            {STATEMENT.split(" ").map((word, i) => (
              <span
                key={`${word}-${i}`}
                className={`${inView ? "about-word" : "about-pre inline-block"} mr-[0.25em]`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {word}
              </span>
            ))}
          </p>

          {/* Right: the whole column settles up to full size */}
          <div
            className={`space-y-8 lg:col-span-5 ${inView ? "about-scale" : "about-pre"}`}
            style={{ animationDelay: "260ms" }}
          >
            <div className="space-y-5 text-base leading-relaxed text-white/70 sm:text-lg">
              <p>
                I&rsquo;m a UI/UX and Product Designer with two years of experience designing and developing digital products.
                I design in Figma (including Figma AI) and bring those designs to life using modern front-end technologies
              </p>
              <p>
                working across both web and mobile platforms. I use AI tools throughout my workflow to move faster without
                compromising quality, allowing me to deliver projects efficiently based on scope and timeline.
              </p>
            </div>

            {/* One button; the choice of market only appears once asked for */}
            <div ref={pickerRef} className="relative w-fit">
              <button
                type="button"
                onClick={() => setPickerOpen((v) => !v)}
                aria-expanded={pickerOpen}
                aria-haspopup="true"
                className="group inline-flex items-center gap-3 rounded-full border border-white/25 py-3 pl-6 pr-5 text-sm text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
              >
                Download CV
                <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none" />
              </button>

              {pickerOpen ? (
                <div className="absolute left-0 top-full z-20 mt-3 w-64 overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0b] p-2 shadow-2xl">
                  <p className="px-3 py-2 text-xs text-white/40">
                    Which version?
                  </p>
                  {CVS.map((cv) => (
                    <a
                      key={cv.label}
                      href={cv.href}
                      download
                      onClick={() => setPickerOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {cv.label}
                      <DownloadIcon className="h-4 w-4 text-white/40" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Roles carry the recognition, so the award has a date and a place */}
        <ol className="mt-16 sm:mt-24">
          {EXPERIENCE.map((job) => (
            <li
              key={`${job.company}-${job.period}`}
              className="grid gap-2 border-t border-white/10 py-7 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8 sm:py-8"
            >
              <span className="text-sm text-white/45">{job.period}</span>

              <div>
                <h3 className="text-base text-white sm:text-lg">{job.role}</h3>
                <p className="mt-1 text-sm text-white/45">{job.company}</p>
              </div>

              {job.note ? (
                <span className="mt-2 justify-self-start rounded-full border border-white/20 px-3 py-1 text-xs text-white/70 sm:mt-0">
                  {job.note}
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        {/* Figures rise one after another as the section comes into view */}
        <dl
          ref={stats.ref}
          className="grid grid-cols-1 gap-10 pt-4 sm:grid-cols-3 sm:gap-8 sm:pt-6"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={stats.inView ? "about-rise" : "about-pre"}
              style={{ animationDelay: `${i * 130}ms` }}
            >
              <dd className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                {stat.value}
                <span className="text-white/45">{stat.suffix}</span>
              </dd>
              <dt className="mt-3 text-sm text-white/45">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}