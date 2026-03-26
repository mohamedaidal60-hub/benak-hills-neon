import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";

const Domain = () => {
  return (
    <section id="domaine" className="py-24 px-4 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">Environnement Premium</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading text-center mb-16"
        >
          Domaine & Localisation
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://i.postimg.cc/t4p6C3B0/domaine.jpg"
              alt="Localisation Marrakech immobilier prestige"
              className="w-full h-[500px] object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-heading">Une adresse rare et privilégiée</h3>
            <p className="text-foreground/70 font-body leading-relaxed">
              Située dans l'un des quartiers les plus prestigieux de Marrakech, à seulement
              10 minutes de la mythique place Jamaa el Fna et du centre-ville, notre
              résidence vous place au cœur du triangle d'or de l'élégance marocaine.
            </p>
            <ul className="space-y-3 text-foreground/70 font-body">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                <span>Attenant au majestueux Golf Royal et au Domaine Al Maaden.</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                <span>À quelques pas seulement du Golf Amelkis et du luxueux Mandarin Oriental.</span>
              </li>
            </ul>
            <a
              href="https://maps.app.goo.gl/WbU6prfD8nKoUUcP8?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold text-gold px-6 py-3 text-xs tracking-wide-luxury font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300 mt-4"
            >
              Voir sur Google Maps
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Domain;
