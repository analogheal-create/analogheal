"use client";

import { useState } from "react";
import { Wallet, TrendingUp, ShieldAlert, Landmark, Activity, ArrowRight, ShieldCheck, Info, FileText, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

const services = [
  {
    id: "wallet",
    title: "Wallet Recovery",
    description: "Lost access to your private keys or seed phrase? We utilize advanced cryptographic recovery techniques.",
    icon: Wallet,
    content: "If you have lost your 12 or 24-word seed phrase, or the password to your digital wallet, professional recovery is still possible. We use high-performance computing clusters to simulate billions of password combinations based on your partial memory. Our process is non-invasive and ensures your assets are never at risk during the recovery attempts.",
  },
  {
    id: "investment",
    title: "Investment Scam Recovery",
    description: "Specialized tracing for stolen assets from fraudulent investment platforms and fake schemes.",
    icon: TrendingUp,
    content: "Investment scams often involve sophisticated 'liquidity' or 'yield' platforms. Our forensic team maps the flow of funds from these malicious smart contracts through multiple hops to identify the final exchange endpoints for reclamation. We prepare technical evidence bundles for exchange compliance teams to facilitate asset freezes.",
  },
  {
    id: "broker",
    title: "Bad Finance Broker",
    description: "Legal and technical assistance for victims of dishonest or unregulated financial brokers.",
    icon: Landmark,
    content: "If a broker has frozen your account or refused legitimate withdrawals under false pretenses, we can assist. We provide the institutional-grade forensic reports needed to initiate legal pressure and work with international regulatory bodies to release your capital from unscrupulous brokerage entities.",
  },
  {
    id: "exchange",
    title: "Exchange Recovery",
    description: "Issues with centralized exchanges? We navigate legal and technical channels to restore your access.",
    icon: ShieldAlert,
    content: "Centralized exchanges often freeze accounts due to compliance flags, security breaches, or 'Source of Wealth' inquiries. AnalogHeal acts as your technical advocate. We help you prepare the correct forensic documentation and identity trails that exchanges require to release funds and resolve disputes efficiently.",
  },
  {
    id: "trading",
    title: "Trading Scam Recovery",
    description: "Recovery services for capital stolen through manipulated trading apps and fake crypto exchanges.",
    icon: Activity,
    content: "Trading scams use fake data and high-pressure tactics to trick victims into 'topping up' their accounts. We use de-anonymization techniques to track the real movement of your crypto on the blockchain and identify the illicit operators behind the fraudulent interface.",
  },
  {
    id: "romance",
    title: "Romance Scam Recovery",
    description: "Confidential assistance for victims of pig-butchering and relationship-based crypto fraud.",
    icon: ShieldCheck,
    content: "Romance scams are complex and multi-layered, often involving long-term grooming. Our lab provides an empathetic and professional environment to trace stolen wealth across multiple blockchains and work with international authorities to secure freezes on criminal-controlled wallets.",
  },
  {
    id: "loan",
    title: "Loan Scam Recovery",
    description: "Assistance for victims of fraudulent lending platforms and advanced-fee loan traps.",
    icon: FileText,
    content: "Loan scams often promise quick capital but lead to 'advanced fee' fraud where victims pay 'insurance' or 'tax' to release a non-existent loan. Our forensic specialists identify the wallet signatures of these fraudulent lending platforms and track the destination of paid fees to initiate recovery through legal and exchange channels.",
  },
  {
    id: "crypto-assets",
    title: "Crypto Assets Recovery",
    description: "Comprehensive forensic reclamation for stolen NFTs, DeFi exploits, and cross-chain asset loss.",
    icon: Zap,
    content: "A comprehensive solution for complex digital asset reclamation. Whether it's NFT theft, DeFi exploit loss, or cross-chain bridge failures, we use multi-chain forensics to reconstruct the transaction path and work with global validators to identify malicious actors and reclaim asset value.",
  },
];

export function AnalogServices() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <section id="services" className="py-24 bg-card/50 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-headline font-bold mb-6">Comprehensive Recovery Solutions</h2>
          <p className="text-muted-foreground text-lg">
            Our multi-disciplinary team combines cybersecurity, forensics, and legal expertise to handle the most complex recovery cases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="bg-background/40 border-white/10 card-hover group hover:-translate-y-1 cursor-pointer transition-all duration-300"
              onClick={() => setSelectedService(service)}
            >
              <CardHeader>
                <div className="p-3 w-fit rounded-xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-headline group-hover:text-accent transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3 text-sm">
                  {service.description}
                </p>
                <button className="flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button size="lg" asChild className="px-10 h-14 text-lg font-bold btn-glow-action bg-primary hover:bg-primary/90 transition-all hover:scale-105">
            <Link href="#request">
              Get My Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            Confidential review • No upfront fees for scams
          </p>
        </div>
      </div>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <DialogContent className="max-w-2xl bg-card border-white/10 text-foreground overflow-y-auto max-h-[90vh]">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest mb-2">
                  <selectedService.icon className="w-4 h-4" />
                  Professional Service Insight
                </div>
                <DialogTitle className="text-2xl lg:text-3xl font-headline font-bold leading-tight">
                  {selectedService.title} Guidance
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base mt-2">
                  Professional technical methodology and recovery roadmap.
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 space-y-6">
                <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Our Technical Approach</h4>
                      <p className="text-foreground/90 leading-relaxed">
                        {selectedService.content}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-accent font-bold text-[10px] uppercase tracking-widest mb-1">Standard Timeframe</div>
                    <div className="text-sm font-semibold">3–7 Business Days</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-accent font-bold text-[10px] uppercase tracking-widest mb-1">Success Rate</div>
                    <div className="text-sm font-semibold">94% Technical Recovery</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    Institutional Grade Forensic Protocol
                  </div>
                  <Button onClick={() => setSelectedService(null)} variant="secondary" className="w-full sm:w-auto">
                    Return to Services
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
