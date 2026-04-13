import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, TrendingUp, Users, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

const metrics = [
  { label: "Recovered Assets", value: "$8M+", icon: TrendingUp, glow: "glow-success" },
  { label: "Cases Solved", value: "3,800+", icon: Users, glow: "glow-interaction" },
  { label: "Success Rate", value: "94%", icon: CheckCircle2, glow: "glow-confirmation" },
  { label: "Avg Lab Response", value: "72hr", icon: Clock, glow: "glow-interaction" },
];

export function AnalogHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40 hero-glow">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 glow-interaction">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
            </span>
            Verified AnalogHeal Forensic Specialists
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Professional Forensic Recovery <br />
            <span className="text-gradient">For Lost or Stolen Digital Assets</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            AnalogHeal Recovery Labs utilizes military-grade forensics to reclaim cryptocurrency from scams, hacks, and locked hardware wallets.
          </p>
          
          <div className="flex flex-col items-center gap-6 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Button size="lg" asChild className="w-full sm:w-auto px-10 h-16 text-xl font-bold btn-glow bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                <Link href="#request">
                  Start Forensic Assessment <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 h-16 text-lg font-semibold border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-primary/50 glow-interaction">
                <Play className="mr-2 w-5 h-5 fill-current" /> See Lab Results
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shadow-[0_0_5px_rgba(34,197,94,0.3)]" />
                Free Forensic Case Review
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 shadow-[0_0_5px_rgba(34,197,94,0.3)]" />
                Performance-Based Recovery
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary shadow-[0_0_5px_rgba(59,130,246,0.3)]" />
                Institutional Privacy Protocol
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground/60 font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent glow-success animate-pulse" />
              Secure intake takes less than 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            {metrics.map((metric) => (
              <div key={metric.label} className={`p-8 rounded-3xl bg-card border border-white/5 backdrop-blur-xl group ${metric.glow} card-hover text-left shadow-2xl`}>
                <metric.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 group-hover:text-blue-400 transition-all" />
                <div className="text-4xl font-bold mb-2 font-headline">{metric.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
