import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryItems = [
  {
    src: "https://i.postimg.cc/XY36tNqj/IMG-20251016-WA0050.jpg",
    alt: "Design intérieur d'un grand salon de villa",
    title: "Espace de Vie",
    desc: "Lumière naturelle et volumes infinis.",
  },
  {
    src: "https://i.postimg.cc/6Q0xxXTP/Whats-App-Image-2026-03-16-at-1-00-22-PM-(2).jpg",
    alt: "Extérieur avec grande piscine villa Maroc",
    title: "Oasis Privée",
    desc: "Piscine et jardins paysagers.",
  },
  {
    src: "https://i.postimg.cc/1RTJ9TpL/Screenshot-2026-03-17-at-5-20-37-PM.png",
    alt: "Suite parentale décoration de luxe",
    title: "Master Room",
    desc: "Une suite parentale d'un raffinement rare.",
  },
  {
    src: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=800&q=80",
    alt: "Salle de bain en marbre",
    title: "Matériaux Nobles",
    desc: "Marbres, bois massif et équipements premium.",
  },
  {
    src: "https://i.postimg.cc/L6pW8CS4/IMG-20251016-WA0060.jpg",
    alt: "Vue sur le domaine de golf de Marrakech",
    title: "Le Domaine",
    desc: "Une sécurité absolue dans un cadre verdoyant.",
  },
  {
    src: "https://i.postimg.cc/mrvw6k2s/IMG-20251016-WA0062.jpg",
    alt: "Architecture moderne contemporaine Maroc",
    title: "Prestige Architectural",
    desc: "Des lignes contemporaines intemporelles.",
  },
  {
    src: "https://i.postimg.cc/gjN3d2p1/IMG-20251016-WA0063.jpg",
    alt: "Architecture moderne villa Marrakech",
    title: "Façade Moderne",
    desc: "Design contemporain et élégant.",
  },
  {
    src: "https://i.postimg.cc/9fkm33sb/IMG-20251017-WA0074.jpg",
    alt: "Villa contemporaine Marrakech",
    title: "Vue d'ensemble",
    desc: "Architecture harmonieuse et raffinée.",
  },
  {
    src: "https://i.postimg.cc/jdhRxnGZ/IMG-20251020-WA0041.jpg",
    alt: "Intérieur villa luxe Maroc",
    title: "Intérieur Premium",
    desc: "Finitions haut de gamme.",
  },
  {
    src: "https://i.postimg.cc/KjDh8Cs4/IMG-20251020-WA0042.jpg",
    alt: "Villa design Marrakech",
    title: "Design Villa",
    desc: "Esthétique contemporaine unique.",
  },
  {
    src: "https://i.postimg.cc/g2JbGSyc/IMG-20251021-WA0020.jpg",
    alt: "Espace extérieur villa",
    title: "Extérieur",
    desc: "Espaces de vie extérieurs d'exception.",
  },
  {
    src: "https://i.postimg.cc/6q0FXnyR/IMG-20251021-WA0022.jpg",
    alt: "Architecture villa Marrakech",
    title: "Architecture",
    desc: "Lignes pures et modernes.",
  },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="galerie" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">Inspiration Visuelle</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading text-center mb-6"
        >
          Notre Galerie d'Exception
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-foreground/70 font-body max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          Découvrez en images le niveau de finition, le choix des matériaux nobles et la
          qualité de vie qu'offre le domaine Benak Hills à Marrakech.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              onClick={() => setSelected(i)}
              className="group relative overflow-hidden aspect-square"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-500 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <h4 className="font-heading text-lg text-foreground">{item.title}</h4>
                <p className="text-foreground/70 text-sm font-body mt-1">{item.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-foreground hover:text-gold transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={galleryItems[selected].src}
              alt={galleryItems[selected].alt}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
