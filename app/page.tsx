import CtaSection from "@/components/cta-section";
import FeaturesSection from "@/components/feature-section";
import BackgroundPaths from "@/components/ui/bg-path";
export default async function Home() {
  return (
    <main className="flex-1 flex flex-col gap-6">
      <BackgroundPaths title="Bienvenue sur Voltix" />
      <div className="bg-black/40">
        <FeaturesSection />
      </div>
      <div className="px-4">
        <CtaSection />
      </div>
    </main>
  );
}

