/**
 * PLACEHOLDER COPY — replace every quote and name with real ones before
 * this goes live, and get the person's permission to publish it.
 */
const TESTIMONIALS = [
  {
    quote:
      "He came in to design the interface and ended up shaping how we thought about the product. The smoothest handoff we've had, because there wasn't really a handoff.",
    name: "Full Name",
    role: "Managing Director",
    company: "Company",
  },
  {
    quote:
      "Fast, but not careless. He caught edge cases in the flows that the rest of us only found once we started building, which saved us a full sprint.",
    name: "Full Name",
    role: "Team Lead",
    company: "Company",
  },
  {
    quote:
      "Reliable on deadlines and easy to work with across teams. He explains design decisions in a way non-designers can actually act on.",
    name: "Full Name",
    role: "Manager",
    company: "Company",
  },
];

/** The middle card takes a violet tint so the row isn't three of the same */
const ACCENT_INDEX = 1;

export default function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden bg-black px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      {/* Light behind the glass — without this, backdrop-blur has nothing to do */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 h-[34rem] w-[34rem] -translate-x-1/3 rounded-full blur-[120px]"
        style={{
          top: "12%",
          left: "8%",
          background:
            "radial-gradient(circle, rgba(110,45,232,0.5), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 h-[28rem] w-[28rem] translate-x-1/4 rounded-full blur-[120px]"
        style={{
          bottom: "6%",
          right: "6%",
          background:
            "radial-gradient(circle, rgba(150,92,255,0.34), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Testimonials
        </h2>

        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-3 lg:gap-6">
          {TESTIMONIALS.map((item, i) => {
            const accent = i === ACCENT_INDEX;

            return (
              <figure
                key={item.role}
                className={[
                  "group relative flex h-full flex-col rounded-3xl border p-8 backdrop-blur-2xl transition-[transform,background-color,border-color] duration-500 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-10",
                  accent
                    ? "border-white/20 bg-[#6e2de8]/25 hover:bg-[#6e2de8]/35"
                    : "border-white/12 bg-white/[0.06] hover:bg-white/[0.09]",
                  "hover:border-white/30",
                ].join(" ")}
              >
                {/* Hairline along the top edge, the way light catches real glass */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />

                <blockquote className="flex-1 text-lg leading-[1.45] text-white/90 sm:text-xl">
                  {item.quote}
                </blockquote>

                <figcaption className="mt-10 border-t border-white/15 pt-6">
                  <span className="block text-base font-medium text-white">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-sm text-white/55">
                    {item.role}, {item.company}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}