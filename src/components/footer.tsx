import Link from "next/link";

/** Replace with the real address and profiles */
const EMAIL = "hello@abdulnawfal.com";

const MENU = [
  { label: "Work", href: "/work" },
  { label: "About", href: "#about" },
];

const ELSEWHERE = [
  { label: "LinkedIn", href: "https://linkedin.com/in/" },
  { label: "GitHub", href: "https://github.com/" },
  { label: "Dribbble", href: "https://dribbble.com/" },
  { label: "Behance", href: "https://behance.net/" },
];

function LinkList({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs uppercase text-white/35">{heading}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => {
          const external = link.href.startsWith("http");

          return (
            <li key={link.label}>
              <Link
                href={link.href}
                {...(external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black pb-10 pt-20 sm:pb-12 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Statement and the one action, side by side */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Let&rsquo;s work together.
          </h2>

          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-white py-4 pl-7 pr-4 text-base font-medium text-black transition-colors duration-300 hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          >
            Say hello
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45 motion-reduce:transition-none">
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
          </Link>
        </div>

        {/* Everything else stays small and out of the way */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:mt-20 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-2">
            <h3 className="text-xs uppercase text-white/35">Email</h3>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 block break-all text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {EMAIL}
            </a>
            <p className="mt-2 text-sm text-white/35">Chennai, India</p>
          </div>

          <LinkList heading="Menu" links={MENU} />
          <LinkList heading="Elsewhere" links={ELSEWHERE} />
        </div>

        <div className="mt-14 flex items-center justify-between text-xs text-white/35 sm:mt-16">
          <span>© {year} Abdul Nawfal</span>

          <Link
            href="#top"
            className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Back to top
          </Link>
        </div>
      </div>

    </footer>
  );
}