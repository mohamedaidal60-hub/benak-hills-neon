import { motion } from "framer-motion";
import { TreePine, Dumbbell, Bike, Baby } from "lucide-react";

const features = [
  {
    icon: TreePine,
    title: "Jardins Luxuriants",
    desc: "Un aménagement paysager tropical et soigné.",
  },
  {
    icon: Dumbbell,
    title: "Padel & Sport",
    desc: "Des courts de Padel et équipements premium exclusifs.",
  },
  {
    icon: Bike,
    title: "Mobilité Douce",
    desc: "Des pistes cyclables sécurisées au sein du domaine.",
  },
  {
    icon: Baby,
    title: "Vie de Famille",
    desc: "Aires de jeux pour enfants et commerces de proximité.",
  },
];

const DomainFeatures = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">Domaine Benakil</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-foreground/70 font-body max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          Une propriété de luxe conçue comme un véritable havre de paix. Un domaine
          entièrement sécurisé doté d'infrastructures haut de gamme pour garantir un
          quotidien exceptionnel.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-dark-surface border border-border p-8 text-center group hover:border-gold/40 transition-colors duration-500"
            >
              <f.icon className="w-10 h-10 text-gold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="font-heading text-lg mb-2">{f.title}</h4>
              <p className="text-foreground/60 font-body text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainFeatures;
