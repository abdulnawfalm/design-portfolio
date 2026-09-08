import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-[82svh] flex-col bg-black px-5 pb-8 pt-32 sm:min-h-svh sm:px-8 sm:pb-10 sm:pt-40 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <h1 className="font-semibold uppercase leading-[0.88] tracking-[-0.02em] text-white">
            <span className="block text-[clamp(2.5rem,10.5vw,9rem)]">
              UI/UX Designer
            </span>
            <span className="block text-[clamp(2.5rem,10.5vw,9rem)] text-white/35">
              Product Designer
            </span>
          </h1>

          <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-white/60 sm:mt-12 sm:text-lg">
            I design interfaces and write the code that ships them. Product
            design and front-end, built together — from the first flow to the
            deployed build.
          </p>
        </div>

        {/* Closing rule ties the hero to the sections below it */}
        <div className="mt-16 flex items-center justify-between gap-6 border-t border-white/10 pt-6 text-sm text-white/45">
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