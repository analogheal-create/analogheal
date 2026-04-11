
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Private Investor",
    result: "$45k Recovered",
    quote: "After losing my seed phrase for an old hardware wallet, I thought my life savings were gone. AnalogHeal's forensic team found a way in within 48 hours. Absolute lifesavers.",
    stars: 5,
  },
  {
    name: "Sarah Chen",
    role: "Crypto Trader",
    result: "Hacked Account Restored",
    quote: "My exchange account was compromised via a sophisticated phishing attack. AnalogHeal worked with the exchange compliance team and tracked the movements, leading to a full recovery.",
    stars: 5,
  },
  {
    name: "Michael Miller",
    role: "DeFi Developer",
    result: "Multi-sig Access Restored",
    quote: "Professional, transparent, and incredibly knowledgeable. They understand the underlying smart contracts better than most developers. Highly recommended for complex cases.",
    stars: 5,
  },
];

export function AegisTestimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-headline font-bold mb-6">Trusted by the Global Community</h2>
          <p className="text-muted-foreground text-lg">
            Our success is measured by the peace of mind we restore to our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="bg-card border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-20 h-20 text-primary" />
              </div>
              <CardContent className="pt-8">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-8 italic text-muted-foreground">
                  "{t.quote}"
                </p>
                <div>
                  <div className="font-bold text-lg">{t.name}</div>
                  <div className="text-sm text-primary font-semibold">{t.role}</div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-secondary">{t.result}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
