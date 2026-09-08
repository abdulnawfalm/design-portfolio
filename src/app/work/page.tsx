import type { Metadata } from "next";

import Footer from "@/components/footer";
import ProjectCard from "@/components/project-card";
import SiteHeader from "@/components/site-header";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Abdul Nawfal",
  description: "Product design, interface design and front-end projects.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-svh bg-black px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Work
          </h1>
          <p className="mt-4 max-w-[46ch] text-base text-white/55 sm:text-lg">
            {PROJECTS.length} projects across product design, interfaces and
            front-end.
          </p>

          <div className="mt-14 grid gap-x-6 gap-y-12 sm:mt-20 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i < 2} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}