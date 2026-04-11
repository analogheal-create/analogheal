
import { AegisNavbar } from "@/components/AegisNavbar";
import { AegisHero } from "@/components/AegisHero";
import { AnalogHealProofLayer } from "@/components/AnalogHealProofLayer";
import { AegisServices } from "@/components/AegisServices";
import { AegisSteps } from "@/components/AegisSteps";
import { AegisTrustStrip } from "@/components/AegisTrustStrip";
import { AegisRecoveryForm } from "@/components/AegisRecoveryForm";
import { AegisTestimonials } from "@/components/AegisTestimonials";
import { AegisKnowledgeHub } from "@/components/AegisKnowledgeHub";
import { AegisContact } from "@/components/AegisContact";
import { AegisFooter } from "@/components/AegisFooter";
import { AegisStickyCTA } from "@/components/AegisStickyCTA";
import { AegisLiveSupport } from "@/components/AegisLiveSupport";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <AegisNavbar />
      <main>
        <AegisHero />
        <AnalogHealProofLayer />
        <AegisServices />
        <AegisSteps />
        <AegisTrustStrip />
        <AegisRecoveryForm />
        <AegisTestimonials />
        <AegisKnowledgeHub />
        <AegisContact />
      </main>
      <AegisFooter />
      <AegisStickyCTA />
      <AegisLiveSupport />
    </div>
  );
}
