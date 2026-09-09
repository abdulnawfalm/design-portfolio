"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { RESUMES } from "@/lib/chat-answers";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Work", href: "/#work" }, // Selected Work section
  { label: "About", href: "/#about" }, // section on the home page
  { label: "Contact", href: "/contact" },
];

/** Same two files the About section and the chat offer */
const CVS = [
  { label: "CV for India", href: RESUMES.india },
  { label: "CV for UAE", href: RESUMES.dubai },
  { label: "CV for Finland", href: RESUMES.helsinki },
];

const LOCATION = "CHENNAI, INDIA";
const TIME_ZONE = "Asia/Kolkata";

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

/**
 * Live clock for the studio's timezone.
 * Returns null on the first render so server and client markup match,
 * then updates on the client only.
 */
function useLocalTime(timeZone: string): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();

    // Land the first update on the next whole minute, then hold that
    // cadence so the display never sits on a stale minute.
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, 60_000 - (Date.now() % 60_000));

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [timeZone]);

  return time;
}

/** Hash links never count as current — they point at a section, not a route */
function useIsCurrent() {
  const pathname = usePathname();
  return (href: string) => !href.includes("#") && pathname === href;
}

/** Desktop link: the label rolls up and a copy rolls in beneath it. */
function RollingLink({ item, current }: { item: NavItem; current: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={current ? "page" : undefined}
      className={[
        "group block py-1 text-sm transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
        current ? "text-white" : "text-white/70",
      ].join(" ")}
    >
      <span className="relative block overflow-hidden leading-[1.35]">
        <span
          className="block transition-transform duration-[380ms] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
          style={{ transitionTimingFunction: EASE }}
        >
          {item.label}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-[380ms] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:hidden"
          style={{ transitionTimingFunction: EASE }}
        >
          {item.label}
        </span>
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const time = useLocalTime(TIME_ZONE);
  const isCurrent = useIsCurrent();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // A route change should never leave the panel hanging open
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) setCvOpen(false);
  }, [menuOpen]);

  // Escape closes, and the page behind the panel stops scrolling.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <style>{`
        @keyframes header-in {
          from { opacity: 0; transform: translateY(-10px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .header-in { animation: header-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both }
        @media (prefers-reduced-motion: reduce) { .header-in { animation: none } }
      `}</style>

      {/* Meta row: local time left, location right */}
      <div
        className="header-in flex items-baseline justify-between px-5 pt-4 sm:px-8 lg:px-12"
        style={{ animationDelay: "60ms" }}
      >
        <span
          className="inline-block min-w-[4.5rem] font-mono text-[11px] tabular-nums text-white/55 sm:text-xs"
          suppressHydrationWarning
        >
          {time ?? "\u00A0"}
        </span>
        <span className="text-[11px] text-white/55 sm:text-xs">{LOCATION}</span>
      </div>

      {/* Identity row: wordmark left, navigation right */}
      <div className="mt-2.5 flex items-center justify-between px-5 pb-4 sm:mt-3 sm:px-8 lg:px-12">
        <Link
          href="/"
          style={{ animationDelay: "160ms" }}
          className="header-in relative z-50 text-sm font-semibold text-white transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
        >
          ABDUL NAWFAL
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {NAV.map((item, i) => (
              <li
                key={item.href}
                className="header-in"
                style={{ animationDelay: `${260 + i * 70}ms` }}
              >
                <RollingLink item={item} current={isCurrent(item.href)} />
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          style={{ animationDelay: "260ms" }}
          className="header-in group relative z-50 -mr-1 flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-6">
            {/* Top bar: drops to centre, then crosses */}
            <span
              className={[
                "absolute left-0 top-0 block h-px w-full origin-center bg-white",
                "transition-transform duration-[300ms] motion-reduce:transition-none",
                menuOpen ? "translate-y-[6px] rotate-45" : "translate-y-0 rotate-0",
              ].join(" ")}
              style={{ transitionTimingFunction: EASE }}
            />
            {/* Bottom bar: short at rest, full width on hover, crosses a beat later */}
            <span
              className={[
                "absolute bottom-0 left-0 block h-px origin-center bg-white",
                "transition-[transform,width] duration-[300ms] motion-reduce:transition-none",
                menuOpen
                  ? "w-full -translate-y-[6px] -rotate-45"
                  : "w-2/3 translate-y-0 rotate-0 group-hover:w-full group-focus-visible:w-full",
              ].join(" ")}
              style={{
                transitionTimingFunction: EASE,
                transitionDelay: menuOpen ? "40ms" : "0ms",
              }}
            />
          </span>
        </button>
      </div>

      {/* Mobile panel: a curtain that wipes down, links staggered in behind it */}
      <div
        id="mobile-nav"
        ref={panelRef}
        aria-hidden={!menuOpen}
        className={[
          "fixed inset-0 z-40 flex flex-col justify-between bg-black/95 px-5 pb-10 pt-28 backdrop-blur-xl md:hidden",
          "transition-[clip-path,visibility] duration-[420ms] motion-reduce:transition-none",
          menuOpen
            ? "visible [clip-path:inset(0_0_0_0)]"
            : "invisible pointer-events-none [clip-path:inset(0_0_100%_0)]",
        ].join(" ")}
        style={{ transitionTimingFunction: EASE }}
      >
        <nav aria-label="Primary mobile">
          <ul className="border-t border-white/10">
            {NAV.map((item, i) => (
              <li key={item.href} className="overflow-hidden border-b border-white/10">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? undefined : -1}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={[
                    "flex items-center justify-between py-5 text-3xl font-medium tracking-tight",
                    isCurrent(item.href) ? "text-white" : "text-white/85",
                    "transition-[transform,opacity] duration-[380ms] motion-reduce:transition-none",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                  ].join(" ")}
                  style={{
                    transitionTimingFunction: EASE,
                    transitionDelay: menuOpen ? `${90 + i * 55}ms` : "0ms",
                  }}
                >
                  {item.label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-5 w-5 text-white/30"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={[
            "transition-opacity duration-300 motion-reduce:transition-none",
            menuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ transitionDelay: menuOpen ? "260ms" : "0ms" }}
        >
          {/* Availability, then the one thing worth taking away from the menu */}
          <p className="flex items-center gap-2.5 text-sm text-white/60">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300/70 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-300" />
            </span>
            Open to opportunities
          </p>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => setCvOpen((v) => !v)}
              aria-expanded={cvOpen}
              tabIndex={menuOpen ? undefined : -1}
              className="group flex w-full items-center justify-between rounded-full border border-white/25 py-3 pl-6 pr-3 text-base text-white transition-colors duration-300 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
            >
              Download resume
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-300 ${cvOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>

            {cvOpen ? (
              <div className="mt-2 space-y-1">
                {CVS.map((cv) => (
                  <a
                    key={cv.label}
                    href={cv.href}
                    download
                    tabIndex={menuOpen ? undefined : -1}
                    className="flex items-center justify-between rounded-2xl px-6 py-3 text-sm text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {cv.label}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-4 w-4 text-white/40"
                    >
                      <path d="M12 4v11" />
                      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
                      <path d="M5 20h14" />
                    </svg>
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-8 flex items-baseline justify-between text-[11px] text-white/35">
            <span
              className="inline-block min-w-[4.5rem] font-mono tabular-nums"
              suppressHydrationWarning
            >
              {time ?? "\u00A0"}
            </span>
            <span>{LOCATION}</span>
          </div>
        </div>
      </div>
    </header>
  );
}