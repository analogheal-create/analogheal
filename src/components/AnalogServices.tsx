import { Wallet, Key, ShieldAlert, Landmark, Smartphone, Cpu, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    title: "Wallet Recovery",
    description: "Lost access to your private keys or seed phrase? We utilize advanced cryptographic recovery techniques.",
    icon: Wallet,
  },
  {
    title: "Password Recovery",
    description: "Forgotten passwords for hardware or software wallets? Our high-performance computing clusters can help.",
    icon: Key,
  },
  {
    title: "Hacked Account Recovery",
    description: "Victim of a phishing attack? We trace stolen funds and work with exchanges to freeze and recover assets.",
    icon: ShieldAlert,
  },
  {
    title: "Exchange Recovery",
    description: "Issues with centralized exchanges? We navigate legal and technical channels to restore your access.",
    icon: Landmark,
  },
  {
    title: "Hardware Wallet Recovery",
    description: "Damaged Ledger, Trezor, or KeepKey? Physical hardware forensics for data extraction and recovery.",
    icon: Cpu,
  },
  {
    title: "Mobile Wallet Recovery",
    description: "Recovery from lost, damaged, or wiped mobile devices. We specialized in iOS and Android wallet extraction.",
    icon: Smartphone,
  },
];

export function AnalogServices() {
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
            <Card key={service.title} className="bg-background/40 border-white/10 card-hover group hover:-translate-y-1">
              <CardHeader>
                <div className="p-3 w-fit rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button size="lg" asChild className="px-10 h-14 text-lg font-bold btn-glow bg-primary hover:bg-primary/90 transition-all hover:scale-105">
            <Link href="#request">
              Get My Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground font-medium">
            Confidential review • No upfront fees for scams
          </p>
        </div>
      </div>
    </section>
  );
}
