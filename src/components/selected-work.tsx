import Link from "next/link";

import ProjectCard, { ArrowIcon } from "@/components/project-card";
import { FEATURED_PROJECTS } from "@/lib/projects";

export default function SelectedWork() {
  return (
    <section id="work" className="bg-black px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Selected work
          </h2>

          <Link
            href="/work"
            className="group flex shrink-0 items-center gap-2 text-sm text-white/60 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            All projects
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-white/60">
              <ArrowIcon className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:mt-16 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}