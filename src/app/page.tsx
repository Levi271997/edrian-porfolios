import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Showreel from "@/components/Showreel";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/ui/Cursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Work />
        <Showreel />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
