import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import Domain from "@/components/Domain";
import DomainFeatures from "@/components/DomainFeatures";
import VillaModels from "@/components/VillaModels";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Concept />
      <Domain />
      <DomainFeatures />
      <VillaModels />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
