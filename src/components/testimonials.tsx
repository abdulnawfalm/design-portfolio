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

/** The middle card carries the accent so the row isn't three of the same */
const ACCENT_INDEX = 1;

export default function Testimonials() {
  return (
    <section className="bg-black px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Testimonials
        </h2>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:gap-5">
          {TESTIMONIALS.map((item, i) => {
            const accent = i === ACCENT_INDEX;

            return (
              <figure
                key={item.role}
                className={[
                  "flex h-full flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-10",
                  accent ? "bg-[#6e2de8]" : "bg-[#f3f1ec]",
                ].join(" ")}
              >
                <blockquote
                  className={[
                    "flex-1 text-lg leading-[1.45] sm:text-xl",
                    accent ? "text-white" : "text-black/80",
                  ].join(" ")}
                >
                  {item.quote}
                </blockquote>

                <figcaption
                  className={[
                    "mt-10 border-t pt-6",
                    accent ? "border-white/25" : "border-black/12",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "block text-base font-medium",
                      accent ? "text-white" : "text-black",
                    ].join(" ")}
                  >
                    {item.name}
                  </span>
                  <span
                    className={[
                      "mt-1 block text-sm",
                      accent ? "text-white/70" : "text-black/50",
                    ].join(" ")}
                  >
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