import { ClipboardList, Search, Settings, CheckCircle, Clock } from "lucide-react";

const steps = [
  {
    title: "Submit Request",
    description: "Provide case details via our secure form. Your file is immediately assigned to a forensic agent.",
    benefit: "Instant secure intake & encryption",
    icon: ClipboardList,
  },
  {
    title: "Free Assessment",
    description: "Experts review your case. You'll receive a clear recovery probability estimate and roadmap.",
    benefit: "Detailed Probability Report",
    icon: Search,
  },
  {
    title: "Recovery Process",
    description: "We execute blockchain tracing, forensic analysis, and legal intercept protocols.",
    benefit: "Active Forensic Investigation",
    icon: Settings,
  },
  {
    title: "Asset Restored",
    description: "Successful reclamation and transfer of assets back to your verified wallet or bank.",
    benefit: "Verified Asset Settlement",
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
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm max-w-[240px] leading-relaxed mb-4">
                  {step.description}
                </p>
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-wider">
                  {step.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              <strong className="text-foreground">Average Resolution Time:</strong> Most cases are fully resolved within 3–14 business days.
            </span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground italic">
            *Complex multi-jurisdictional cases may require additional forensic cycles.
          </p>
        </div>
      </div>
    </section>
  );
}
