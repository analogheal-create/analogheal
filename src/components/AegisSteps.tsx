
import { ClipboardList, Search, Settings, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Submit Request",
    description: "Provide details of your case via our secure encrypted form.",
    icon: ClipboardList,
  },
  {
    title: "Free Assessment",
    description: "Our experts review your case to determine recovery feasibility.",
    icon: Search,
  },
  {
    title: "Recovery Process",
    description: "We execute custom forensics strategies to reclaim your assets.",
    icon: Settings,
  },
  {
    title: "Asset Restored",
    description: "Successful recovery and transfer of assets back to your control.",
    icon: CheckCircle,
  },
];

export function AegisSteps() {
  return (
    <section id="process" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl lg:text-5xl font-headline font-bold mb-6">Recovery in 4 Simple Steps</h2>
          <p className="text-muted-foreground text-lg">
            We make the complex simple. Our transparent process keeps you informed from initial assessment to successful recovery.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex flex-col items-center text-center relative group">
                <div className="w-20 h-20 rounded-full bg-background border-4 border-white/5 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-all shadow-xl">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg">
                    {idx + 1}
                  </span>
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm max-w-[200px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
