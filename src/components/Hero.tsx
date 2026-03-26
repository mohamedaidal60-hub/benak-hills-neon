import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="relative flex flex-col md:block min-h-[100dvh] md:h-screen w-full overflow-hidden bg-[#0e1116] md:bg-transparent">
      {/* Background Image: Fixes mobile zoom by rendering inline 50vh, and absolutely on desktop */}
      <div className="relative h-[55dvh] shrink-0 md:h-auto md:absolute md:inset-0 w-full z-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
          alt="Villa de luxe Marrakech Benak Hills"
          className="w-full h-full object-cover object-[50%_35%] md:object-center"
          loading="eager"
        />
        {/* Shadow to fade nicely into background block on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1116] via-[#0e1116]/30 to-transparent md:hidden" />
        {/* Subtle overlay everywhere */}
        <div className="absolute inset-0 hero-overlay-extra-light" />
      </div>

      {/* Content Block: Flow naturally below on mobile, absolute centered on desktop */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 md:h-full pt-4 md:pt-0 pb-12 md:pb-0">
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gold text-xs md:text-sm font-body tracking-luxury uppercase mb-3 md:mb-6"
        >
          Votre villa en toute sérénité
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-7xl lg:text-8xl font-heading font-normal tracking-luxury mb-4 md:mb-0"
        >
          <span className="text-foreground">BENAK </span>
          <span className="gold-text-gradient">HILLS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-sm md:text-base text-foreground/80 max-w-2xl mt-2 md:mt-8 font-body leading-relaxed max-md:max-w-[90%] mx-auto"
        >
          Découvrez des villas élégantes et modulables pensées pour votre confort et votre style de vie au cœur de Marrakech. Votre villa. Votre choix. Votre tranquillité.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={() => scrollTo("#concept")}
          className="mt-8 md:mt-12 border border-gold text-gold px-8 py-4 text-xs tracking-luxury font-body flex items-center gap-2 hover:bg-gold hover:text-black transition-all duration-500 group"
        >
          DÉCOUVRIR LE PROJET
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Scroll indicator (desktop only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;
