import CtaSection from "@/components/cta-section";
import { HeroText } from "@/components/HeroText";
import BackgroundPaths from "@/components/ui/bg-path";
import { TiltedScroll } from "@/components/ui/tilted-scroll";

const features = [
  { id: '1', icon: '💹', text: 'Trading ultra-rapide : Achetez et vendez en un instant grâce à notre moteur de matching avancé.' },
  { id: '2', icon: '🔒', text: 'Sécurité de pointe : Protection des fonds avec stockage à froid et authentification 2FA.' },
  { id: '3', icon: '📊', text: 'Analyse en temps réel : Graphiques interactifs et outils de suivi des tendances.' },
  { id: '4', icon: '🪙', text: 'Large choix de cryptos : Accédez à des centaines d’actifs numériques.' },
  { id: '5', icon: '📱', text: 'Application mobile : Gérez vos investissements où que vous soyez.' },
];


export default async function Home() {
  return (
    <main className="flex-1 flex flex-col gap-6">
      <BackgroundPaths title="Bienvenue sur Voltix" />
      <h2 className="text-2xl font-bold text-center w-full">💡 Pourquoi choisir Voltix ?</h2>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="space-y-8 w-1/2 h-full">
          <TiltedScroll
            items={features}
            className="mt-8"
          />
        </div>
          <div className="w-1/2">
          <HeroText />
        </div>
      </div>
      <div className="px-4">
        <CtaSection />
      </div>
    </main>
  );
}

