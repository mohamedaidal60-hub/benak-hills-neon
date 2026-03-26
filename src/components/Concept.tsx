import { motion } from "framer-motion";

const Concept = () => {
  return (
    <section id="concept" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">Le Concept</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading text-center mb-12"
        >
          La Villa Signature 2
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-foreground/80 font-body leading-relaxed">
              Superbe maison de <span className="text-gold font-semibold">240 m²</span>, avec piscine privée, édifiée sur une parcelle de
              <span className="text-gold font-semibold"> 300 m²</span> et plus, offrant un cadre de vie unique et prestigieux.
            </p>
            <p className="text-foreground/70 font-body leading-relaxed">
              Avec des terrains titrés et entièrement viabilisés, votre acquisition est
              totalement sécurisée. Modulable selon vos envies avec 4 plans architecturaux
              distincts.
            </p>
            <p className="text-foreground/70 font-body leading-relaxed">
              Investir dans l'immobilier de luxe à Marrakech n'a jamais été aussi serein.
              Benak Hills redéfinit le haut de gamme marocain en alliant architecture
              contemporaine et finitions nobles.
            </p>

            {/* Price */}
            <div className="pt-6 border-t border-border">
              <p className="text-foreground/60 font-body text-sm tracking-wide">Offre de lancement</p>
              <p className="text-2xl md:text-3xl font-heading mt-2">
                <span className="text-foreground">À partir de </span>
                <span className="text-gold font-semibold">4.400.000 MAD</span>
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1080&q=80"
              alt="Architecture extérieure villa luxe Maroc"
              className="w-full h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 border border-gold/20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Concept;
