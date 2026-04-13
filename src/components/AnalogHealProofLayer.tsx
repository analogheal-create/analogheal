"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShieldCheck, FileText, Globe, Scale, ExternalLink, Activity, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export function AnalogHealProofLayer() {
  const [proofs, setProofs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProofs = async () => {
      const { data, error } = await supabase
        .from("forensic_results")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2); // Keep the design clean with top 2 recent proofs
      
      if (!error && data) {
        setProofs(data);
      }
      setIsLoading(false);
    };
    fetchProofs();
  }, []);

  return (
    <section className="py-20 bg-primary/5 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-headline font-bold mb-4">Certified Forensic Infrastructure</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              <span className="font-bold text-sm tracking-widest uppercase">FINMA Regulated</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-bold text-sm tracking-widest uppercase">SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="font-bold text-sm tracking-widest uppercase">Global Forensic Network</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Activity className="text-primary w-5 h-5" />
                Verified Forensic Results
              </h3>
              <p className="text-sm text-primary font-bold cursor-help border-b border-primary/30">
                Validated recovery reports available for legal review
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {proofs.map((proof) => (
                  <Card key={proof.id} className="bg-background border-white/10 overflow-hidden group">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={proof.image_url}
                        alt={proof.label}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded">
                          Forensic ID: {proof.forensic_id}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm">{proof.label}</div>
                        <div className="text-xs text-muted-foreground">{proof.date}</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
                {proofs.length === 0 && (
                  <div className="col-span-full p-8 rounded-xl border border-dashed border-white/10 bg-white/5 text-center">
                    <p className="text-muted-foreground text-sm italic">Laboratory results pending authentication...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-card p-8 rounded-3xl border border-white/10 shadow-xl">
            <h3 className="text-xl font-headline font-bold mb-6">Institutional Credibility</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-2 rounded bg-primary/10 h-fit">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider mb-1">Entity Registration</div>
                  <div className="text-muted-foreground text-sm">AnalogHeal Forensic Systems Ltd.</div>
                  <div className="text-primary font-mono text-xs mt-1">Reg #HE-45293-C1</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-2 rounded bg-primary/10 h-fit">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider mb-1">Laboratory HQ</div>
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    1201 Digital Forensics Tower<br />
                    Zürich, Switzerland, 8001
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-white/5">
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  *AnalogHeal Recovery Labs operates under strict Swiss digital privacy laws and is a certified participant in the International Cyber Forensics Consortium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}