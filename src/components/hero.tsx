import Link from "next/link";

const INTRO =
  "Clean, minimal interfaces for product-focused design from Figma to front end.";

export default function Hero() {
  return (
    <section className="flex min-h-[82svh] flex-col bg-black px-5 pb-8 pt-32 sm:min-h-svh sm:px-8 sm:pb-10 sm:pt-40 lg:px-12">
      <style>{`
        @keyframes hero-line {
          from { transform: translateY(105%) }
          to   { transform: translateY(0) }
        }
        @keyframes hero-blur {
          from { opacity: 0; filter: blur(10px); transform: translateY(0.25em) }
          to   { opacity: 1; filter: blur(0);    transform: translateY(0) }
        }
        @keyframes hero-fade {
          from { opacity: 0; transform: translateY(10px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .hero-line { animation: hero-line 900ms cubic-bezier(0.16, 1, 0.3, 1) both }
        .hero-word { display: inline-block; animation: hero-blur 620ms ease-out both }
        .hero-fade { animation: hero-fade 700ms ease-out both }

        @media (prefers-reduced-motion: reduce) {
          .hero-line, .hero-word, .hero-fade { animation: none }
        }
      `}</style>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="font-semibold uppercase leading-[0.88] tracking-[-0.02em] text-white">
            {/* Each line is masked so it rises out of nothing */}
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="hero-line block text-[clamp(2.5rem,10.5vw,9rem)]"
                style={{ animationDelay: "80ms" }}
              >
                UI/UX Designer
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="hero-line block text-[clamp(2.5rem,10.5vw,9rem)] text-white/35"
                style={{ animationDelay: "200ms" }}
              >
                Product Designer
              </span>
            </span>
          </h1>

          {/* Word-by-word blur-in reads as typing without a caret */}
          <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-white/60 sm:mt-12 sm:text-lg">
            {INTRO.split(" ").map((word, i) => (
              <span
                key={`${word}-${i}`}
                className="hero-word mr-[0.28em]"
                style={{ animationDelay: `${620 + i * 30}ms` }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Closing rule ties the hero to the sections below it */}
        <div
          className="hero-fade mt-16 flex items-center justify-between gap-6 border-t border-white/10 pt-6 text-sm text-white/45"
          style={{ animationDelay: "1500ms" }}
        >
          <span>Available for work</span>

          <Link
            href="#work"
            className="group flex items-center gap-2 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Selected work
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none"
            >
              <path d="M12 5v14" />
              <path d="m6 13 6 6 6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}