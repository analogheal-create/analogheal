import { AnalogNavbar } from "@/components/AnalogNavbar";
import { AnalogHero } from "@/components/AnalogHero";
import { AnalogHealProofLayer } from "@/components/AnalogHealProofLayer";
import { AnalogServices } from "@/components/AnalogServices";
import { AnalogHealMethodology } from "@/components/AnalogHealMethodology";
import { AnalogSteps } from "@/components/AnalogSteps";
import { AnalogHealGuarantee } from "@/components/AnalogHealGuarantee";
import { AnalogTrustStrip } from "@/components/AnalogTrustStrip";
import { AnalogRecoveryForm } from "@/components/AnalogRecoveryForm";
import { AnalogTestimonials } from "@/components/AnalogTestimonials";
import { AnalogKnowledgeHub } from "@/components/AnalogKnowledgeHub";
import { AnalogContact } from "@/components/AnalogContact";
import { AnalogFooter } from "@/components/AnalogFooter";
import { AnalogStickyCTA } from "@/components/AnalogStickyCTA";
import { AnalogLiveSupport } from "@/components/AnalogLiveSupport";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <AnalogNavbar />
      <main>
        <AnalogHero />
        <AnalogHealProofLayer />
        <AnalogServices />
        <AnalogHealMethodology />
        <AnalogSteps />
        <AnalogHealGuarantee />
        <AnalogTrustStrip />
        <AnalogRecoveryForm />
        <AnalogTestimonials />
        <AnalogKnowledgeHub />
        <AnalogContact />
      </main>
      <AnalogFooter />
      <AnalogStickyCTA />
      <AnalogLiveSupport />
    </div>
  );
}
