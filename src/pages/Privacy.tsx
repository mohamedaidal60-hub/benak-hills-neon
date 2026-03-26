import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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

        <h1 className="text-4xl font-heading mb-8">Politique de Confidentialité</h1>

        <div className="space-y-8 text-foreground/70 font-body leading-relaxed">
          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">1. Collecte des données</h2>
            <p>
              Benak Hills collecte les données personnelles que vous nous fournissez volontairement via notre formulaire de contact : nom, adresse e-mail, numéro de téléphone, budget estimé, configuration souhaitée et message. Ces informations sont nécessaires pour traiter votre demande et vous recontacter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">2. Utilisation des données</h2>
            <p>Vos données personnelles sont utilisées exclusivement pour :</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Répondre à vos demandes d'information</li>
              <li>Vous accompagner dans votre projet immobilier</li>
              <li>Vous tenir informé de nos offres et actualités (avec votre consentement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">3. Protection des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">4. Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pendant la durée nécessaire au traitement de votre demande, et au maximum pendant 3 ans à compter de votre dernier contact avec nous.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">5. Vos droits</h2>
            <p>
              Conformément à la loi 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification de vos données</li>
              <li>Droit de suppression de vos données</li>
              <li>Droit d'opposition au traitement de vos données</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading text-foreground mb-4">6. Contact</h2>
            <p>
              Pour exercer vos droits ou pour toute question relative à la protection de vos données, vous pouvez nous contacter à l'adresse : <a href="mailto:contact@benakhills.com" className="text-gold hover:underline">contact@benakhills.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
