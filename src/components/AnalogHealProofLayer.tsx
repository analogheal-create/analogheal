
"use client";

import Image from "next/image";
import { ShieldCheck, FileText, Globe, Scale, ExternalLink, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const proofs = [
  { id: "blockchain-proof-1", label: "Wallet Reclamation - $1.2M", date: "Jan 2024" },
  { id: "blockchain-proof-2", label: "Exchange Dispute Success", date: "Feb 2024" },
];

export function AnalogHealProofLayer() {
  return (
    <section className="py-20 bg-primary/5 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-3xl font-headline font-bold mb-4">Verified & Trusted Worldwide</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              <span className="font-bold text-sm tracking-widest uppercase">FinCEN Regulated</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-bold text-sm tracking-widest uppercase">SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="font-bold text-sm tracking-widest uppercase">Global Forensic Labs</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Activity className="text-primary w-5 h-5" />
                Proof of Recovery Gallery
              </h3>
              <p className="text-sm text-primary font-bold cursor-help border-b border-primary/30">
                Trackable recovery cases available upon request
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proofs.map((proof) => {
                const imageData = PlaceHolderImages.find((img) => img.id === proof.id);
                return (
                  <Card key={proof.id} className="bg-background border-white/10 overflow-hidden group">
                    <div className="relative aspect-video overflow-hidden">
                      {imageData?.imageUrl ? (
                        <Image
                          src={imageData.imageUrl}
                          alt={imageData.description}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          data-ai-hint={imageData.imageHint}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-card">
                          <FileText className="w-12 h-12 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-xs font-bold uppercase tracking-widest bg-primary px-2 py-1 rounded">View Case ID</span>
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
                );
              })}
            </div>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-white/10 shadow-xl">
            <h3 className="text-xl font-headline font-bold mb-6">Legal Credibility</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-2 rounded bg-primary/10 h-fit">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider mb-1">Entity Registration</div>
                  <div className="text-muted-foreground text-sm">AnalogHeal Recovery Systems Ltd.</div>
                  <div className="text-primary font-mono text-xs mt-1">Reg #HE-45293-C1</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-2 rounded bg-primary/10 h-fit">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wider mb-1">Global HQ</div>
                  <div className="text-muted-foreground text-sm leading-relaxed">
                    1201 Digital Forensics Tower<br />
                    Zürich, Switzerland, 8001
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-white/5">
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  *AnalogHeal operates under strict Swiss digital privacy laws and is a certified member of the International Cyber Recovery Consortium.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
