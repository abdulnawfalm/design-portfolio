import About from "@/components/about";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import SelectedWork from "@/components/selected-work";
import SiteHeader from "@/components/site-header";
import Testimonials from "@/components/testimonials";
import Tools from "@/components/tools";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top" className="bg-black text-white">
        <Hero />
        <SelectedWork />
        <About />
        <Tools />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}