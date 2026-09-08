"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "WORK", href: "/#work" }, // Selected Work section
  { label: "ABOUT", href: "/#about" }, // section on the home page
  { label: "CONTACT", href: "/contact" },
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
        "group block py-1 text-xs transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
        current ? "text-white" : "text-white/70",
      ].join(" ")}
    >
      <span className="relative block overflow-hidden leading-[1.35]">
        <span
          className="block transition-transform duration-[450ms] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
          style={{ transitionTimingFunction: EASE }}
        >
          {item.label}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-[450ms] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:hidden"
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
  const [scrolled, setScrolled] = useState(false);
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

  // Frost the bar once the page moves, so it stays legible over the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && !menuOpen
          ? "border-b border-white/10 bg-black/40 backdrop-blur-xl"
          : "border-b border-transparent",
      ].join(" ")}
    >
      {/* Meta row: local time left, location right */}
      <div className="flex items-baseline justify-between px-5 pt-4 sm:px-8 lg:px-12">
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
          className="relative z-50 text-sm font-semibold text-white transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
        >
          ABDUL NAWFAL
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {NAV.map((item) => (
              <li key={item.href}>
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
          className="group relative z-50 -mr-1 flex h-10 w-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-6">
            {/* Top bar: drops to centre, then crosses */}
            <span
              className={[
                "absolute left-0 top-0 block h-px w-full origin-center bg-white",
                "transition-transform duration-[450ms] motion-reduce:transition-none",
                menuOpen ? "translate-y-[6px] rotate-45" : "translate-y-0 rotate-0",
              ].join(" ")}
              style={{ transitionTimingFunction: EASE }}
            />
            {/* Bottom bar: short at rest, full width on hover, crosses a beat later */}
            <span
              className={[
                "absolute bottom-0 left-0 block h-px origin-center bg-white",
                "transition-[transform,width] duration-[450ms] motion-reduce:transition-none",
                menuOpen
                  ? "w-full -translate-y-[6px] -rotate-45"
                  : "w-2/3 translate-y-0 rotate-0 group-hover:w-full group-focus-visible:w-full",
              ].join(" ")}
              style={{
                transitionTimingFunction: EASE,
                transitionDelay: menuOpen ? "60ms" : "0ms",
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
          "transition-[clip-path,visibility] duration-[600ms] motion-reduce:transition-none",
          menuOpen
            ? "visible [clip-path:inset(0_0_0_0)]"
            : "invisible pointer-events-none [clip-path:inset(0_0_100%_0)]",
        ].join(" ")}
        style={{ transitionTimingFunction: EASE }}
      >
        <nav aria-label="Primary mobile">
          <ul className="flex flex-col gap-1">
            {NAV.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? undefined : -1}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={[
                    "block py-3 text-3xl font-semibold",
                    isCurrent(item.href) ? "text-white" : "text-white/80",
                    "transition-[transform,opacity] duration-[550ms] motion-reduce:transition-none",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                  ].join(" ")}
                  style={{
                    transitionTimingFunction: EASE,
                    transitionDelay: menuOpen ? `${180 + i * 80}ms` : "0ms",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={[
            "flex items-baseline justify-between text-[11px] text-white/45",
            "transition-opacity duration-500 motion-reduce:transition-none",
            menuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ transitionDelay: menuOpen ? "440ms" : "0ms" }}
        >
          <span
            className="inline-block min-w-[4.5rem] font-mono tabular-nums"
            suppressHydrationWarning
          >
            {time ?? "\u00A0"}
          </span>
          <span>{LOCATION}</span>
        </div>
      </div>
    </header>
  );
}