import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const models = [
  {
    id: "01",
    title: "Configuration 5 Chambres",
    description:
      "Cette configuration correspond à l'identique à la configuration 4 chambres avec master-room. Elle est parfaitement pensée pour offrir 5 véritables chambres indépendantes, idéales pour accueillir une grande famille dans le plus grand confort.",
    images: [
      "https://i.postimg.cc/1RTJ9TpL/Screenshot-2026-03-17-at-5-20-37-PM.png",
      "https://i.postimg.cc/6Q0xxXTP/Whats-App-Image-2026-03-16-at-1-00-22-PM-(2).jpg",
      "https://i.postimg.cc/Nj6WRc80/Whats-App-Image-2026-03-16-at-1-00-22-PM.jpg",
    ],
  },
  {
    id: "02",
    title: "4 Chambres avec Master-room",
    description:
      "Première configuration offrant des espaces généreux et une suite majestueuse au rez-de-chaussée. À l'étage, l'espace nuit est complété par des chambres lumineuses pour allier praticité et bien-être au quotidien.",
    images: [
      "https://i.postimg.cc/1RTJ9TpL/Screenshot-2026-03-17-at-5-20-37-PM.png",
      "https://i.postimg.cc/6Q0xxXTP/Whats-App-Image-2026-03-16-at-1-00-22-PM-(2).jpg",
      "https://i.postimg.cc/Kz27L6NF/Whats-App-Image-2026-03-16-at-1-01-16-PM-(2).jpg",
    ],
  },
  {
    id: "03",
    title: "3 Chambres avec Master-room",
    description:
      "Cette troisième configuration permet de profiter d'une pièce de vie particulièrement spacieuse, tout en conservant à l'étage 3 chambres, dont une superbe master room. Les volumes généreux, la luminosité et le confort offrent un espace nuit à la fois élégant, moderne et accueillant.",
    images: [
      "https://i.postimg.cc/FHFMS8B3/Screenshot-2026-03-17-at-5-31-54-PM.png",
      "https://i.postimg.cc/hGgh0cH3/Whats-App-Image-2026-03-16-at-1-01-17-PM-(1).jpg",
      "https://i.postimg.cc/Kz27L6NF/Whats-App-Image-2026-03-16-at-1-01-16-PM-(2).jpg",
    ],
  },
  {
    id: "04",
    title: "4 Chambres Étage",
    description:
      "Cette quatrième configuration permet de profiter d'une pièce de vie particulièrement spacieuse, tout comme l'option 3. À la différence près qu'à l'étage, entièrement dédié à l'espace nuit, vous trouverez 4 chambres, parfaitement pensées pour répondre à vos besoins.",
    images: [
      "https://i.postimg.cc/CKXXW1LX/Screenshot-2026-03-17-at-5-32-30-PM.png",
      "https://i.postimg.cc/TP7L2B4Q/Whats-App-Image-2026-03-16-at-1-01-16-PM.jpg",
      "https://i.postimg.cc/6Q0xxXTP/Whats-App-Image-2026-03-16-at-1-00-22-PM-(2).jpg",
    ],
  },
];

const VillaModels = () => {
  const [active, setActive] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const current = models[active];

  return (
    <section id="modeles" className="py-24 px-4 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">Plans & Architecture</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading text-center mb-6"
        >
          Villas Modulables sur-mesure
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-foreground/70 font-body max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          Votre villa s'adapte à votre style de vie. Découvrez nos 4 configurations
          intelligentes, pensées par nos architectes pour maximiser l'espace, la lumière
          et le confort.
        </motion.p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {models.map((m, i) => (
            <button
              key={m.id}
              onClick={() => {
                setActive(i);
                setActiveImage(0);
              }}
              className={`px-6 py-3 text-xs tracking-wide-luxury font-body border transition-all duration-300 ${
                active === i
                  ? "border-gold bg-primary text-primary-foreground"
                  : "border-border text-foreground/60 hover:border-gold/50 hover:text-foreground"
              }`}
            >
              {m.id} — {m.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden">
                <img
                  src={current.images[activeImage]}
                  alt={current.title}
                  className="w-full h-[400px] object-cover transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-4 py-2">
                  <span className="text-gold font-heading text-2xl">{current.id}</span>
                </div>
              </div>
              <div className="flex gap-3">
                {current.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 h-20 overflow-hidden border-2 transition-all ${
                      activeImage === i ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-2xl md:text-3xl font-heading mb-4">{current.title}</h3>
              <p className="text-foreground/70 font-body leading-relaxed">{current.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VillaModels;
