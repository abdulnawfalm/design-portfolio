import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/lib/projects";

export function ArrowIcon({ className = "" }: { className?: string }) {
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
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

type Props = {
  project: Project;
  /** Feed the first couple of cards to the browser early */
  priority?: boolean;
};

export default function ProjectCard({ project, priority = false }: Props) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-white"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white/[0.04]">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 46vw, (min-width: 640px) 48vw, 92vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        {/* Reads as a button, but stays a span — a button inside a link is invalid */}
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none sm:-translate-y-1"
        >
          <ArrowIcon className="h-4 w-4" />
        </span>
      </div>

      <h3 className="mt-4 text-base font-medium text-white/85 transition-colors group-hover:text-white sm:text-lg">
        {project.title}
      </h3>
    </Link>
  );
}