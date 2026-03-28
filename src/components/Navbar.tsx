import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "ACCUEIL", href: "#accueil" },
  { label: "LE DOMAINE", href: "#domaine" },
  { label: "LES MODÈLES", href: "#modeles" },
  { label: "GALERIE", href: "#galerie" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent backdrop-blur-[2px] md:backdrop-blur-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("#accueil")} className="flex items-center gap-3 group">
          <img src="/logo_old.png" alt="Benak Hills Logo" className="h-[40px] w-auto object-contain" />
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

        {/* Contact Button */}
        <button
          onClick={() => scrollTo("#contact")}
          className="hidden md:block border border-gold text-gold px-6 py-2 text-xs tracking-wide-luxury font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          CONTACT
        </button>

        {/* Mobile menu toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
              className="border border-gold text-gold px-6 py-2 text-xs tracking-wide-luxury font-body hover:bg-primary hover:text-primary-foreground transition-all duration-300 mt-2"
            >
              CONTACT
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
