export type Project = {
  /** Used for the case study route: /work/[slug] */
  slug: string;
  title: string;
  /** Put files in /public/projects/ or swap for a remote URL */
  image: string;
  /** Describe the work shown, not the fact that it's a screenshot */
  alt: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "fleet-operations-platform",
    title: "Fleet Operations Platform",
    image: "/projects/fleet-operations.jpg",
    alt: "Vessel scheduling board with a fleet status sidebar",
  },
  {
    slug: "hr-dashboard-redesign",
    title: "HR Dashboard Redesign",
    image: "/projects/hr-dashboard.jpg",
    alt: "Employee directory and leave approval queue",
  },
  {
    slug: "field-service-app",
    title: "Field Service App",
    image: "/projects/field-service.jpg",
    alt: "Mobile job card with checklist and photo capture",
  },
  {
    slug: "property-listings",
    title: "Property Listings",
    image: "/projects/property-listings.jpg",
    alt: "Search results grid with map and filter panel",
  },
  {
    slug: "banking-onboarding",
    title: "Banking Onboarding",
    image: "/projects/banking-onboarding.jpg",
    alt: "Multi-step account opening flow with document upload",
  },
  {
    slug: "studio-brand-system",
    title: "Studio Brand System",
    image: "/projects/brand-system.jpg",
    alt: "Wordmark, colour ramp and type specimen sheet",
  },
];

/** How many appear on the home page before "All projects" */
export const FEATURED_COUNT = 4;

export const FEATURED_PROJECTS = PROJECTS.slice(0, FEATURED_COUNT);