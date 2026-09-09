"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ArrowIcon } from "@/components/project-card";
import { FEATURED_PROJECTS } from "@/lib/projects";

/** Fires once when the list scrolls into view, then stops observing */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function SelectedWork() {
  const { ref, inView } = useInView<HTMLUListElement>();

  return (
    <section id="work" className="bg-black px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <style>{`
        @keyframes work-in {
          from { opacity: 0; transform: translateY(24px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .work-pre { opacity: 0 }
        .work-in  { animation: work-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both }
        @media (prefers-reduced-motion: reduce) {
          .work-pre { opacity: 1 }
          .work-in  { animation: none }
        }
      `}</style>

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

        <ul ref={ref} className="mt-12 border-t border-white/10 sm:mt-16">
          {FEATURED_PROJECTS.map((project, i) => (
            <li
              key={project.slug}
              className={`border-b border-white/10 ${inView ? "work-in" : "work-pre"}`}
              style={{ animationDelay: `${i * 110}ms` }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group grid grid-cols-1 items-center gap-5 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:grid-cols-[13rem_minmax(0,1fr)_auto] sm:gap-8 sm:py-7 lg:grid-cols-[16rem_minmax(0,1fr)_auto]"
              >
                {/* Thumbnail carries the work without dominating the page */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white/[0.04]">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    priority={i < 2}
                    sizes="(min-width: 1024px) 16rem, (min-width: 640px) 13rem, 92vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-medium text-white/85 transition-colors duration-300 group-hover:text-white sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-1.5 truncate text-sm text-white/40">
                    {project.tags.join(" · ")}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-5 sm:justify-end">
                  <span className="text-sm tabular-nums text-white/40">
                    {project.year}
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}