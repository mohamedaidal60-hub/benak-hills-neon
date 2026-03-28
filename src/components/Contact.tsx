import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "../i18n/LanguageContext";

const Contact = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    configuration: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("leads").insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      budget: form.budget,
      configuration: form.configuration,
      message: form.message,
      status: "nouveau",
    });

    setLoading(false);

    if (error) {
      toast({ 
        title: language === 'fr' ? "Erreur" : "Error", 
        description: language === 'fr' ? "Impossible d'envoyer votre demande. Réessayez." : "Failed to send request. Please try again.", 
        variant: "destructive" 
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: t('contact.success'),
      description: t('contact.successDesc'),
    });
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 px-4 bg-dark-surface">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-heading mb-4">{t('contact.success')}</h2>
          <p className="text-foreground/70 font-body">
            {t('contact.successDesc')}
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", email: "", phone: "", budget: "", configuration: "", message: "" });
            }}
            className="mt-8 border border-gold text-gold px-6 py-3 text-xs tracking-wide-luxury font-body hover:bg-gold hover:text-primary-foreground transition-all duration-300"
          >
            {language === 'fr' ? "ENVOYER UNE AUTRE DEMANDE" : "SEND ANOTHER REQUEST"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-4 bg-dark-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="text-gold text-xs tracking-luxury font-body uppercase">{t('contact.badge')}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-heading text-center mb-6"
        >
          {t('contact.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-foreground/70 font-body max-w-2xl mx-auto mb-16"
        >
          {t('contact.description')}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-foreground/60 text-sm font-body">{language === 'fr' ? "Téléphone" : "Phone"}</p>
                <a href="tel:+212786360767" className="text-foreground font-body hover:text-gold transition-colors">
                  +212 786 360 767
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-foreground/60 text-sm font-body">Email</p>
                <a href="mailto:contact@benakhills.com" className="text-foreground font-body hover:text-gold transition-colors">
                  contact@benakhills.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-foreground/60 text-sm font-body">Adresse / Address</p>
                <p className="text-foreground font-body">Marrakech, Maroc</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="md:col-span-2 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t('contact.name')}</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required maxLength={100}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors"
                  placeholder="" />
              </div>
              <div>
                <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t('contact.email')}</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required maxLength={255}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors"
                  placeholder="" />
              </div>
              <div>
                <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t('contact.phone')}</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required maxLength={20}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors"
                  placeholder="" />
              </div>
              <div>
                <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t('contact.budget')}</label>
                <select name="budget" value={form.budget} onChange={handleChange}
                  className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors">
                  <option value="" className="bg-card">{language === 'fr' ? "Sélectionner" : "Select"}</option>
                  <option value="4-5M" className="bg-card">4 - 5 Millions MAD</option>
                  <option value="5-6M" className="bg-card">5 - 6 Millions MAD</option>
                  <option value="6-8M" className="bg-card">6 - 8 Millions MAD</option>
                  <option value="8M+" className="bg-card">8 Millions MAD +</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t('contact.config')}</label>
              <select name="configuration" value={form.configuration} onChange={handleChange}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors">
                <option value="" className="bg-card">{language === 'fr' ? "Sélectionner une configuration" : "Select a configuration"}</option>
                <option value="5-chambres" className="bg-card">{language === 'fr' ? "5 Chambres" : "5 Bedrooms"}</option>
                <option value="4-chambres-master" className="bg-card">{language === 'fr' ? "4 Chambres avec Master-room" : "4 Bedrooms with Master-room"}</option>
                <option value="3-chambres-master" className="bg-card">{language === 'fr' ? "3 Chambres avec Master-room" : "3 Bedrooms with Master-room"}</option>
                <option value="4-chambres-etage" className="bg-card">{language === 'fr' ? "4 Chambres Étage" : "4 Bedrooms Upstairs"}</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-foreground/60 font-body tracking-wide uppercase block mb-2">{t('contact.message')}</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={4} maxLength={1000}
                className="w-full bg-transparent border border-border px-4 py-3 text-foreground font-body focus:border-gold outline-none transition-colors resize-none"
                placeholder="" />
            </div>

            <button type="submit" disabled={loading}
              className="border border-gold text-gold px-8 py-4 text-xs tracking-luxury font-body flex items-center gap-2 hover:bg-gold hover:text-primary-foreground transition-all duration-300 disabled:opacity-50">
              {loading ? t('contact.sending') : t('contact.submit')}
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
