import { Star, Quote, TrendingUp, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const caseStudies = [
  {
    name: "A. Thompson",
    role: "Private Investor",
    title: "Phishing Scam Reclamation",
    result: "$32,700 Recovered (82%)",
    metrics: "Mixer Hop Tracing • VASP Freeze",
    quote: "I lost my USDT to a sophisticated drainer. AnalogHeal traced the funds across 4 mixer hops and identified the final exchange endpoint. Most of my capital was returned within 11 days.",
    stars: 5,
    icon: TrendingUp,
    glow: "glow-success",
  },
  {
    name: "S. Chen",
    role: "Crypto Trader",
    title: "SIM-Swap Account Hijack",
    result: "Full Exchange Access Restored",
    metrics: "Identity Forensics • Legal Intercept",
    quote: "Locked out of my primary exchange after a SIM-swap. The AnalogHeal team navigated the exchange's legal compliance layer and verified my forensic identity trail to restore access in 72 hours.",
    stars: 5,
    icon: ShieldCheck,
    glow: "glow-confirmation",
  },
  {
    name: "M. Miller",
    role: "DeFi Developer",
    title: "Legacy Wallet Extraction",
    result: "$118,000 Recovered (100%)",
    metrics: "GPU Cluster Brute-Force",
    quote: "Forgotten password on an old JSON wallet from 2016. Their high-performance computing cluster successfully extracted the private key where others failed. Incredible technical depth.",
    stars: 5,
    icon: Zap,
    glow: "glow-interaction",
  },
];

export function AnalogTestimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-headline font-bold mb-6">Proven Recovery Results</h2>
          <p className="text-muted-foreground text-lg">
            Specificity is our strength. See how we've navigated complex blockchain forensics to reclaim digital wealth for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((cs, idx) => (
            <Card key={idx} className={`bg-card border-white/5 relative overflow-hidden group hover:border-primary/50 transition-all premium-transition ${cs.glow}`}>
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="w-20 h-20 text-primary" />
              </div>
              <CardContent className="pt-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-2 rounded-lg bg-primary/10 text-primary ${idx === 0 ? 'glow-success' : ''}`}>
                    <cs.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Case Study #{idx + 1042}</span>
                </div>
                
                <h3 className="text-xl font-headline font-bold mb-1">{cs.title}</h3>
                <div className="text-xs font-bold text-accent mb-6 flex items-center gap-1.5 uppercase tracking-wide glow-success w-fit px-2 py-0.5 rounded-full bg-accent/5">
                  <Star className="w-3 h-3 fill-current" /> {cs.result}
                </div>

                <p className="text-base leading-relaxed mb-8 italic text-muted-foreground">
                  "{cs.quote}"
                </p>
                
                <div className="pt-6 border-t border-white/5">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="font-bold text-sm">{cs.name}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{cs.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-primary/70 uppercase tracking-tight">Forensic Method</div>
                      <div className="text-[9px] text-muted-foreground font-semibold">{cs.metrics}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button size="lg" asChild className="px-10 h-16 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105 btn-glow">
            <Link href="#request">
              Start My Recovery Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold glow-confirmation px-3 py-1 rounded-full bg-green-500/5">
            <ShieldCheck className="w-4 h-4 text-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" /> 
            Join 3,800+ successful recovery clients
          </div>
        </div>
      </div>
    </section>
  );
}
