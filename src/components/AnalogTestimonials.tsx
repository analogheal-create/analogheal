"use client";

import { useEffect, useState } from "react";
import { Star, Quote, TrendingUp, ShieldCheck, Zap, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const iconMap = {
  trending: TrendingUp,
  shield: ShieldCheck,
  zap: Zap,
};

const glowMap = {
  trending: "glow-success",
  shield: "glow-confirmation",
  zap: "glow-interaction",
};

export function AnalogTestimonials() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setCaseStudies(data);
      }
      setIsLoading(false);
    };
    fetchCaseStudies();
  }, []);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-headline font-bold mb-6">Proven Recovery Results</h2>
          <p className="text-muted-foreground text-lg">
            Specificity is our strength. See how we've navigated complex blockchain forensics to reclaim digital wealth for our clients.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {caseStudies.map((cs, idx) => {
              const Icon = iconMap[cs.icon_type as keyof typeof iconMap] || TrendingUp;
              const glow = glowMap[cs.icon_type as keyof typeof glowMap] || "glow-success";
              
              return (
                <Card key={cs.id} className={`bg-card border-white/5 relative overflow-hidden group hover:border-primary/50 transition-all premium-transition ${glow}`}>
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Quote className="w-20 h-20 text-primary" />
                  </div>
                  <CardContent className="pt-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`p-2 rounded-lg bg-primary/10 text-primary`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Case Study {cs.case_id}</span>
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
              );
            })}
            {caseStudies.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
                <p className="text-muted-foreground text-sm italic">Recovery records pending laboratory authentication...</p>
              </div>
            )}
          </div>
        )}

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