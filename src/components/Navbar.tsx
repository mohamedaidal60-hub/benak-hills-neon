import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: "ACCUEIL", href: "#accueil" },
    { label: t('nav.domaine').toUpperCase(), href: "#domaine" },
    { label: t('nav.modeles').toUpperCase(), href: "#modeles" },
    { label: t('nav.galerie').toUpperCase(), href: "#galerie" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("#accueil")} className="flex items-center gap-3 group text-left">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gold">
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
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-foreground/80 hover:text-gold text-xs font-body tracking-wide-luxury transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-foreground/60 hover:text-gold text-xs font-body tracking-wide-luxury transition-colors duration-300 border border-border px-3 py-2"
          >
            <Globe size={14} />
            {language.toUpperCase()}
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="border border-gold text-gold px-6 py-2 text-xs tracking-wide-luxury font-body hover:bg-gold hover:text-primary-foreground transition-all duration-300"
          >
            {t('nav.contact').toUpperCase()}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="text-foreground/60 hover:text-gold text-[10px] font-body transition-colors border border-border px-2 py-1"
          >
            {language.toUpperCase()}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-foreground">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
          <div className="flex flex-col items-center py-6 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-foreground/80 hover:text-gold text-sm font-body tracking-wide-luxury transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="border border-gold text-gold px-6 py-2 text-xs tracking-wide-luxury font-body hover:bg-gold hover:text-primary-foreground transition-all duration-300 mt-2"
            >
              {t('nav.contact').toUpperCase()}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

