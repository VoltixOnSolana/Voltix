import CtaSection from "@/components/cta-section";
import FeaturesSection from "@/components/feature-section";
import { HeroSection } from "@/components/hero-section";

export default async function Home() {
  return (
    <main className="flex-1 flex flex-col gap-6">
      <div className="px-4">
        <HeroSection />
      </div>
      <div className="bg-black/40">
        <FeaturesSection />
      </div>
      <div className="px-4">
        <CtaSection />
      </div>
    </main>
  );
}

