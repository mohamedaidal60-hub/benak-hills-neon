import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gold text-sm font-body tracking-wide hover:opacity-80 transition-opacity mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-heading mb-8">Mentions Légales</h1>

        <div className="space-y-8 text-foreground/70 font-body leading-relaxed">
          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">1. Éditeur du site</h2>
            <p>
              <strong className="text-foreground">Benak Hills</strong><br />
              Société de promotion immobilière<br />
              Siège social : Marrakech, Maroc<br />
              Email : <a href="mailto:contact@benakhills.com" className="text-gold hover:underline">contact@benakhills.com</a><br />
              Téléphone : +212 786 360 767
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">2. Hébergement</h2>
            <p>
              Le site est hébergé par des services cloud sécurisés avec une disponibilité garantie et des sauvegardes régulières.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, illustrations, logos, plans architecturaux) est protégé par le droit d'auteur et la propriété intellectuelle. Toute reproduction, représentation ou diffusion, en tout ou partie, du contenu de ce site est interdite sans l'autorisation préalable écrite de Benak Hills.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">4. Responsabilité</h2>
            <p>
              Les informations contenues sur ce site sont données à titre indicatif. Benak Hills s'efforce de fournir des informations aussi précises que possible, mais ne saurait être tenue responsable des erreurs, omissions ou des résultats qui pourraient être obtenus par un mauvais usage de ces informations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">5. Cookies</h2>
            <p>
              Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Ces cookies ne collectent aucune donnée personnelle à des fins publicitaires.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">6. Droit applicable</h2>
            <p>
              Le présent site est soumis au droit marocain. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux de Marrakech, Maroc.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Legal;
