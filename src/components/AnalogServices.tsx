"use client";

import { useState } from "react";
import { Wallet, Key, ShieldAlert, Landmark, Smartphone, Cpu, ArrowRight, ShieldCheck, Info } from "lucide-react";
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
    content: "If you have lost your 12 or 24-word seed phrase, or the password to your digital wallet, professional recovery is still possible. We use high-performance computing clusters to simulate billions of password combinations based on your partial memory. For seed phrase recovery, we can often reclaim access if you have a partial list of words or have made a simple mistake in recording them. Our process is non-invasive and ensures your assets are never at risk during the recovery attempts.",
  },
  {
    id: "password",
    title: "Password Recovery",
    description: "Forgotten passwords for hardware or software wallets? Our high-performance computing clusters can help.",
    icon: Key,
    content: "Forgotten passwords are the leading cause of inaccessible digital wealth. Our lab utilizes specialized GPU arrays designed to test millions of password variations per second. Whether it's a legacy JSON wallet, a forgotten MetaMask password, or an encrypted local backup, we apply institutional-grade brute-force and heuristic analysis to restore your access. We never ask for your funds to be sent to us; all recovery happens within your local environment or under strict forensic supervision.",
  },
  {
    id: "hacked",
    title: "Hacked Account Recovery",
    description: "Victim of a phishing attack? We trace stolen funds and work with exchanges to freeze and recover assets.",
    icon: ShieldAlert,
    content: "If your funds have been stolen, time is the most critical factor. Our team uses advanced blockchain forensics to track the 'flow of funds' across multiple transactions. We identify when the stolen assets move into a centralized exchange (like Binance or Coinbase). Once identified, we utilize our direct compliance channels to request an emergency asset freeze. We assist you in filing the necessary law enforcement reports to reclaim the frozen assets through legal channels.",
  },
  {
    id: "exchange",
    title: "Exchange Recovery",
    description: "Issues with centralized exchanges? We navigate legal and technical channels to restore your access.",
    icon: Landmark,
    content: "Centralized exchanges often freeze accounts due to compliance flags, security breaches, or 'Source of Wealth' inquiries. Navigating their support system can take months. AnalogHeal acts as your technical and legal advocate. We help you prepare the correct forensic documentation and identity trails that exchanges require to release funds. We understand the specific regulatory requirements of various jurisdictions and help you meet them efficiently.",
  },
  {
    id: "hardware",
    title: "Hardware Wallet Recovery",
    description: "Damaged Ledger, Trezor, or KeepKey? Physical hardware forensics for data extraction and recovery.",
    icon: Cpu,
    content: "Hardware wallets can fail physically—screens break, buttons stop working, or the firmware becomes corrupted. If you have lost your seed phrase and your device is damaged, do not attempt a DIY repair. Our hardware forensics lab can perform component-level repairs and secure data extraction from damaged devices. We work in a controlled environment to ensure the security of the internal chipsets while attempting to restore functionality long enough to migrate your assets to a new, secure wallet.",
  },
  {
    id: "mobile",
    title: "Mobile Wallet Recovery",
    description: "Recovery from lost, damaged, or wiped mobile devices. We specialized in iOS and Android wallet extraction.",
    icon: Smartphone,
    content: "Lost your phone with your only wallet backup? Or accidentally deleted the app? Modern mobile forensics can often recover 'lost' data even after a factory reset or app deletion, provided the storage hasn't been completely overwritten. We use specialized forensic imaging tools to search for remnants of private keys or backup files within the device's deep storage. The sooner you stop using the device after the loss, the higher the probability of a successful recovery.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service) => (
            <Card 
              key={service.title} 
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
                <p className="text-muted-foreground mb-6 leading-relaxed">
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