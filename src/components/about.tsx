/** Put the file at /public/abdul-nawfal-cv.pdf, or point this at wherever it lives */
const CV_PATH = "/abdul-nawfal-cv.pdf";

const STATS = [
  { value: "2.5", suffix: " yrs", label: "Experience" },
  { value: "20", suffix: "+", label: "Projects completed" },
  { value: "100", suffix: "%", label: "Satisfaction" },
];

/** Newest first. Recognition sits under the role that earned it. */
const EXPERIENCE = [
  {
    role: "UI/UX Designer",
    company: "Company name",
    period: "2023 — 2025",
    note: "Employee of the Month",
  },
];

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
  return (
    <section id="about" className="bg-black px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          About
        </h2>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-16">
          <p className="text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:col-span-7 lg:text-6xl">
            Most handoffs lose something. Mine has nowhere to go.
          </p>

          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-5 text-base leading-relaxed text-white/70 sm:text-lg">
              <p>
                I design interfaces and then write the code that ships them. The
                spacing in the mockup is the spacing in production, and the hard
                edge cases surface while they are still cheap to change.
              </p>
              <p>
                Most of my work is early product — the first real version of
                something, or the redesign that has to hold up as a team grows
                around it.
              </p>
            </div>

            <a
              href={CV_PATH}
              download
              className="group inline-flex items-center gap-3 rounded-full border border-white/25 py-3 pl-6 pr-5 text-sm text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
            >
              Download CV
              <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:transition-none" />
            </a>
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

        {/* Figures sit on their own rule so they read as a set, not as decoration */}
        <dl className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-white/10 py-8 sm:border-b-0 sm:border-r sm:border-white/10 sm:py-10 sm:pr-8 sm:last:border-r-0 lg:py-12"
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