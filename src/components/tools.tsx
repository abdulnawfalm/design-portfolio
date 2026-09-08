"use client";

import { useState } from "react";

type Tool = { name: string; slug: string };

/**
 * Icons load from /public/tools/<slug>.svg.
 * Any that are missing fall back to a monogram tile, so the row is
 * never broken while you collect the files.
 */
const TOOLS: Tool[] = [
  { name: "Figma", slug: "figma" },
  { name: "Figma AI", slug: "figma-ai" },
  { name: "Claude", slug: "claude" },
  { name: "Lovable", slug: "lovable" },
  { name: "Adobe InDesign", slug: "indesign" },
  { name: "Framer", slug: "framer" },
  { name: "ChatGPT", slug: "chatgpt" },
  { name: "Stitch AI", slug: "stitch-ai" },
  { name: "Adobe Illustrator", slug: "illustrator" },
  { name: "Visual Studio Code", slug: "vscode" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Vercel", slug: "vercel" },
];

/** Seconds for one full pass — raise it to slow the row down */
const DURATION_S = 44;

function monogram(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

function ToolIcon({ tool }: { tool: Tool }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/10 text-[10px] font-semibold text-white/70"
      >
        {monogram(tool.name)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/tools/${tool.slug}.svg`}
      alt=""
      width={24}
      height={24}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-6 w-6 shrink-0 object-contain"
    />
  );
}

function ToolPill({ tool }: { tool: Tool }) {
  return (
    <li className="mr-3 flex shrink-0 items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] py-3 pl-4 pr-5 sm:mr-4">
      <ToolIcon tool={tool} />
      <span className="whitespace-nowrap text-sm text-white/75 sm:text-base">
        {tool.name}
      </span>
    </li>
  );
}

export default function Tools() {
  return (
    <section className="bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Tools
        </h2>
      </div>

      <style>{`
        @keyframes tools-marquee {
          from { transform: translate3d(0, 0, 0) }
          to   { transform: translate3d(-50%, 0, 0) }
        }
        .tools-track { animation: tools-marquee ${DURATION_S}s linear infinite }
        .tools-row:hover .tools-track,
        .tools-row:focus-within .tools-track { animation-play-state: paused }
        @media (prefers-reduced-motion: reduce) {
          .tools-track { animation: none }
          .tools-viewport { overflow-x: auto }
        }
      `}</style>

      <div className="tools-row mt-10 sm:mt-14">
        <div
          className="tools-viewport overflow-hidden"
          style={{
            // Fade both edges so pills enter and leave instead of being cut
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="tools-track flex w-max">
            {/* Second copy is the seam — identical, and hidden from assistive tech */}
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center"
              >
                {TOOLS.map((tool) => (
                  <ToolPill key={`${copy}-${tool.slug}`} tool={tool} />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}