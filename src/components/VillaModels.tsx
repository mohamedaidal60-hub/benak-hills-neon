import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";
import { translations } from "../i18n/translations";

const modelsData = [
  {
    id: "01",
    images: [
      "/gallery/combined-plan.jpeg",
      "/gallery/image1.jpg",
      "/gallery/image2.jpg",
    ],
  },
  {
    id: "02",
    images: [
      "/gallery/combined-plan.jpeg",
      "/gallery/image3.jpg",
      "/gallery/image4.jpg",
    ],
  },
  {
    id: "03",
    images: [
      "/gallery/image13.jpg",
      "/gallery/image5.jpg",
      "/gallery/image6.jpg",
    ],
  },
  {
    id: "04",
    images: [
      "/gallery/image14.jpg",
      "/gallery/image7.jpg",
      "/gallery/image8.jpg",
    ],
  },
];

const VillaModels = () => {
  const [active, setActive] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const { t, language } = useLanguage();

  const currentStrings = translations[language].models.list[active];
  const currentData = modelsData[active];

  return (
    <section id="modeles" className="py-24 px-4 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">{t('models.badge')}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading text-center mb-6"
        >
          {t('models.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-foreground/70 font-body max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          {t('models.description')}
        </motion.p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {modelsData.map((m, i) => (
            <button
              key={m.id}
              onClick={() => {
                setActive(i);
                setActiveImage(0);
              }}
              className={`px-6 py-3 text-xs tracking-wide-luxury font-body border transition-all duration-300 ${
                active === i
                  ? "border-gold bg-gold text-primary-foreground"
                  : "border-border text-foreground/60 hover:border-gold/50 hover:text-foreground"
              }`}
            >
              {m.id} — {translations[language].models.list[i].title}
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
                  src={currentData.images[activeImage]}
                  alt={currentStrings.title}
                  className="w-full h-auto max-h-[500px] object-contain bg-background/5 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur px-4 py-2">
                  <span className="text-gold font-heading text-2xl">{currentData.id}</span>
                </div>
              </div>
              <div className="flex gap-3">
                {currentData.images.map((img, i) => (
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
              <h3 className="text-2xl md:text-3xl font-heading mb-4">{currentStrings.title}</h3>
              <p className="text-foreground/70 font-body leading-relaxed">{currentStrings.desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VillaModels;

