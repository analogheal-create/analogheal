
import { AegisNavbar } from "@/components/AegisNavbar";
import { AegisHero } from "@/components/AegisHero";
import { AegisServices } from "@/components/AegisServices";
import { AegisSteps } from "@/components/AegisSteps";
import { AegisTrustStrip } from "@/components/AegisTrustStrip";
import { AegisRecoveryForm } from "@/components/AegisRecoveryForm";
import { AegisTestimonials } from "@/components/AegisTestimonials";
import { AegisKnowledgeHub } from "@/components/AegisKnowledgeHub";
import { AegisContact } from "@/components/AegisContact";
import { AegisFooter } from "@/components/AegisFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <AegisNavbar />
      <main>
        <AegisHero />
        <AegisServices />
        <AegisSteps />
        <AegisTrustStrip />
        <AegisRecoveryForm />
        <AegisTestimonials />
        <AegisKnowledgeHub />
        <AegisContact />
      </main>
      <AegisFooter />
    </div>
  );
}
