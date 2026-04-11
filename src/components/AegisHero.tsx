
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, TrendingUp, Users, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

const metrics = [
  { label: "Recovered", value: "$8M+", icon: TrendingUp },
  { label: "Cases Solved", value: "3,800+", icon: Users },
  { label: "Success Rate", value: "94%", icon: CheckCircle2 },
  { label: "Avg Response", value: "72hr", icon: Clock },
];

export function AegisHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40 hero-glow">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Verified AnalogHeal Recovery Specialists
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Recover Lost Crypto From <br />
            <span className="text-gradient">Scams, Hacks, or Locked Wallets</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Victim of a cyberattack? Lost access to your seed phrase? Our world-class forensics experts specialize in reclaiming stolen and inaccessible digital wealth.
          </p>
          
          <div className="flex flex-col items-center gap-6 mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Button size="lg" asChild className="w-full sm:w-auto px-8 h-14 text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95">
                <Link href="#request">
                  Start My Recovery Request <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 h-14 text-lg font-semibold border-white/20">
                <Play className="mr-2 w-5 h-5 fill-current" /> See Success Stories
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Free case review in 24 hours
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                No upfront payment for most cases
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                100% confidential
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground/60 font-medium">
              👉 Submission takes less than 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            {metrics.map((metric) => (
              <div key={metric.label} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-primary/50 transition-all text-left">
                <metric.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10"></div>
    </section>
  );
}
