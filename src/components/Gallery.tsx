import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryItems = [
  { src: "/gallery/image1.jpg", alt: "Benak Hills", title: "Villa Benak Hills", desc: "Élégance et raffinement." },
  { src: "/gallery/image2.jpg", alt: "Benak Hills", title: "Volumes Généreux", desc: "Des espaces de vie lumineux." },
  { src: "/gallery/image3.jpg", alt: "Benak Hills", title: "Architecture", desc: "Un design contemporain." },
  { src: "/gallery/image4.jpg", alt: "Benak Hills", title: "Espace Extérieur", desc: "Harmonie avec la nature." },
  { src: "/gallery/image5.jpg", alt: "Benak Hills", title: "Prestige", desc: "Des finitions d'exception." },
  { src: "/gallery/image6.jpg", alt: "Benak Hills", title: "Espace Nuit", desc: "Une atmosphère apaisante." },
  { src: "/gallery/image7.jpg", alt: "Benak Hills", title: "Détails Soignés", desc: "Choix de matériaux nobles." },
  { src: "/gallery/image8.jpg", alt: "Benak Hills", title: "Suite Parentale", desc: "Confort absolu au quotidien." },
  { src: "/gallery/image9.jpg", alt: "Benak Hills", title: "Luminosité", desc: "Oouvertures sur l'extérieur." },
  { src: "/gallery/image10.png", alt: "Benak Hills", title: "Inspiration", desc: "Chaque détail compte." },
  { src: "/gallery/image11.jpg", alt: "Benak Hills", title: "Agencement", desc: "Espaces optimisés." },
  { src: "/gallery/image12.jpg", alt: "Benak Hills", title: "Le Domaine", desc: "Cadre de vie privilégié." },
  { src: "/gallery/image13.jpg", alt: "Benak Hills", title: "Plans", desc: "Conception architecturale." },
  { src: "/gallery/image14.jpg", alt: "Benak Hills", title: "Perspectives", desc: "Une vision de luxe." },
  { src: "/gallery/image15.jpg", alt: "Benak Hills", title: "Intérieur", desc: "Design épuré et moderne." },
  { src: "/gallery/image16.jpg", alt: "Benak Hills", title: "Espaces", desc: "Fluidité de circulation." },
  { src: "/gallery/image17.jpg", alt: "Benak Hills", title: "Master Room", desc: "Une chambre majestueuse." },
  { src: "/gallery/image18.jpg", alt: "Benak Hills", title: "Sérénité", desc: "Lieu de vie unique." },
  { src: "/gallery/image19.jpg", alt: "Benak Hills", title: "Standing", desc: "Prestations haut de gamme." },
  { src: "/gallery/image20.png", alt: "Benak Hills", title: "Confort", desc: "Bien-être et praticité." },
  { src: "/gallery/image21.jpg", alt: "Benak Hills", title: "Mode de Vie", desc: "Luxe et simplicité." },
  { src: "/gallery/image22.jpg", alt: "Benak Hills", title: "Ambiance", desc: "Une douceur de vivre." },
  { src: "/gallery/image23.jpg", alt: "Benak Hills", title: "Excellence", desc: "Signé Benak Hills." },
  { src: "/gallery/image24.jpg", alt: "Benak Hills", title: "Votre Villa", desc: "Votre nouvel écrin." },
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
