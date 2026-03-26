import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" className="text-gold">
                <rect x="8" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.7" />
                <rect x="14" y="12" width="4" height="24" rx="1" fill="currentColor" opacity="0.85" />
                <rect x="20" y="4" width="4" height="32" rx="1" fill="currentColor" />
                <rect x="26" y="12" width="4" height="24" rx="1" fill="currentColor" opacity="0.85" />
                <rect x="32" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.7" />
              </svg>
              <div className="flex flex-col">
                <span className="text-foreground font-body text-sm font-semibold tracking-luxury">BENAK</span>
                <span className="text-gold text-xs font-body tracking-luxury">HILLS</span>
              </div>
            </div>
            <p className="text-foreground/60 font-body text-sm leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg mb-6 italic">{t('footer.contactAgency')}</h4>
            <div className="space-y-4">
              <a
                href="tel:+212786360767"
                className="flex items-center gap-3 text-foreground/70 hover:text-gold transition-colors font-body"
              >
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                +212 786 360 767
              </a>
              <a
                href="mailto:contact@benakhills.com"
                className="flex items-center gap-3 text-foreground/70 hover:text-gold transition-colors font-body"
              >
                <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                contact@benakhills.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/40 text-xs font-body tracking-wide">
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/mentions-legales"
              className="text-foreground/40 text-xs font-body tracking-wide hover:text-gold transition-colors"
            >
              {t('footer.legal')}
            </Link>
            <Link
              to="/confidentialite"
              className="text-foreground/40 text-xs font-body tracking-wide hover:text-gold transition-colors"
            >
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

