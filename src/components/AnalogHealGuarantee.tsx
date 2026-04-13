
"use client";

import { ShieldCheck, Scale, Lock, Zap, CheckCircle2, AlertCircle } from "lucide-react";

const guarantees = [
  {
    title: "Upfront Honesty",
    description: "If our initial forensic analysis shows a low probability of success, we will tell you immediately. We do not provide false hope or waste your time.",
    icon: AlertCircle,
  },
  {
    title: "Performance-Based Options",
    description: "For many qualifying scam cases, we operate on a no-recovery, no-fee initial assessment basis. Our incentives are perfectly aligned with your success.",
    icon: Zap,
  },
  {
    title: "Absolute Confidentiality",
    description: "Your case data is stored on encrypted Swiss-based servers. Your identity and the details of your loss remain 100% private under strict privacy laws.",
    icon: Lock,
  },
  {
    title: "Legal & Forensic Accuracy",
    description: "We don't use 'black magic' or 'hacking'. We use certified blockchain forensics and established legal intercept protocols recognized by global authorities.",
    icon: Scale,
  },
];

export function AnalogHealGuarantee() {
  return (
    <section className="py-24 bg-card/30 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3 h-3" />
            The AnalogHeal Commitment
          </div>
          <h2 className="text-3xl lg:text-5xl font-headline font-bold mb-6">Our Ironclad Guarantee</h2>
          <p className="text-muted-foreground text-lg">
            Crypto recovery is a high-stakes industry often clouded by misinformation. We aim to be the most transparent partner in your journey back to financial security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {guarantees.map((item) => (
            <div key={item.title} className="flex gap-6 p-8 rounded-3xl bg-background border border-white/10 hover:border-primary/50 transition-all group">
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-secondary/5 border border-secondary/20 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-secondary" />
              <span className="font-bold">No Hidden Retainers</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-secondary" />
              <span className="font-bold">Transparent Fee Structure</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-secondary" />
              <span className="font-bold">Direct Specialist Contact</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic">
            "If we cannot help you, we will tell you upfront. Professionalism starts with integrity." - Dr. Erik Vossen, Lead Forensic Analyst
          </p>
        </div>
      </div>
    </section>
  );
}
