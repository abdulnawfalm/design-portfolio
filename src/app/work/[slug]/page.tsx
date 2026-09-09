import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/footer";
import SiteHeader from "@/components/site-header";
import { PROJECTS, getNextProject, getProject } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

/** Pre-renders every case study at build time — navigation is then instant */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Abdul Nawfal`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);

  const meta = [
    ["Client", project.client],
    ["Role", project.role],
    ["Duration", project.duration],
    ["Year", project.year],
  ];

  return (
    <>
      <SiteHeader />

      <main className="bg-black pb-24 pt-32 sm:pb-32 sm:pt-40">
        {/* Title block sits in the text column, not the full width */}
        <header className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            href="/work"
            className="text-sm text-white/40 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            ← Work
          </Link>

          <h1 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl">
            {project.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl">
            {project.summary}
          </p>

          {/* One quiet line rather than a four-column table of labels */}
          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {meta.map(([label, value]) => (
              <div key={label} className="flex gap-2">
                <dt className="text-white/35">{label}</dt>
                <dd className="text-white/70">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Full-bleed: the work gets the whole viewport, nothing beside it */}
        <div className="relative mt-16 aspect-[16/10] w-full bg-white/[0.04] sm:mt-20">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <article className="mx-auto max-w-3xl px-5 sm:px-8">
          {/* Overview reads as the opening statement — no label needed */}
          <p className="mt-16 text-xl leading-[1.55] text-white/85 sm:mt-24 sm:text-2xl">
            {project.overview}
          </p>

          <section className="mt-16 sm:mt-24">
            <h2 className="text-sm text-white/35">The challenge</h2>
            <p className="mt-5 text-base leading-relaxed text-white/65 sm:text-lg">
              {project.challenge}
            </p>
          </section>

          <section className="mt-16 sm:mt-24">
            <h2 className="text-sm text-white/35">What I did</h2>
            <ul className="mt-6 space-y-5">
              {project.work.map((item) => (
                <li
                  key={item}
                  className="border-t border-white/10 pt-5 text-base leading-relaxed text-white/85 sm:text-lg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 sm:mt-24">
            <h2 className="text-sm text-white/35">Outcome</h2>
            <dl className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {project.outcome.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-sm text-white/45">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </section>

          <p className="mt-16 text-sm text-white/40 sm:mt-20">
            {project.tags.join(" · ")}
          </p>
        </article>

        {/* Next case study — the only action at the end of the page */}
        <div className="mx-auto mt-24 max-w-3xl px-5 sm:mt-32 sm:px-8">
          <Link
            href={`/work/${next.slug}`}
            className="group block border-t border-white/10 pt-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <p className="text-sm text-white/35">Next project</p>
            <div className="mt-4 flex items-center justify-between gap-6">
              <h2 className="text-3xl font-semibold tracking-tight text-white transition-opacity duration-300 group-hover:opacity-70 sm:text-4xl">
                {next.title}
              </h2>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
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
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}