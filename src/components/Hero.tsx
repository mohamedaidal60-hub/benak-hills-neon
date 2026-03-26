import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
          alt="Villa de luxe Marrakech Benak Hills"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-normal tracking-luxury"
        >
          <span className="text-foreground">BENAK </span>
          <span className="gold-text-gradient">HILLS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl font-heading italic text-foreground/90 mt-4"
        >
          Votre villa en toute sérénité
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-sm md:text-base text-foreground/70 max-w-2xl mt-6 font-body leading-relaxed"
        >
          Découvrez des villas élégantes et modulables pensées pour votre confort et
          votre style de vie au cœur de Marrakech. Votre villa. Votre choix. Votre
          tranquillité.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={() => scrollTo("#concept")}
          className="mt-10 border border-gold text-gold px-8 py-4 text-xs tracking-luxury font-body flex items-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-500 group"
        >
          DÉCOUVRIR LE PROJET
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;
