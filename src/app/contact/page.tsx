import type { Metadata } from "next";
import Link from "next/link";

import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact — Abdul Nawfal",
  description:
    "Get in touch about product design, interface design and front-end work.",
};

const EMAIL = "abdulnawfal11011@gmail.com";

const DETAILS = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Location", value: "Chennai, India", href: null },
  { label: "Response", value: "Within a day", href: null },
];

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <main
        id="top"
        className="min-h-svh bg-black px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
            {/* Left column stays put while the form scrolls beside it */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
               Let’s connect.
              </h1>
              <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-white/55 sm:text-lg">
                Open to UI/UX and Product Design opportunities, collaborations, 
                and conversations focused on building better products and creating meaningful career growth.
              </p>

              <dl className="mt-12 space-y-6">
                {DETAILS.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-xs uppercase text-white/35">
                      {detail.label}
                    </dt>
                    <dd className="mt-1.5 text-base text-white/80">
                      {detail.href ? (
                        <Link
                          href={detail.href}
                          className="break-all transition-colors hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                          {detail.value}
                        </Link>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}