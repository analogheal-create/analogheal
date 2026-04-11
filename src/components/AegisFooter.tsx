
"use client";

import Link from "next/link";
import { Shield, Twitter, Facebook, Linkedin, Github, MapPin, Building, ArrowRight, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function AegisFooter() {
  const [year, setYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setMounted(true);
  }, []);

  return (
    <footer className="bg-card/50 border-t border-white/5 pt-0 pb-10">
      {/* Final Conversion Push */}
      <div className="relative overflow-hidden py-16 mb-20 border-b border-white/5 bg-primary/5">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h3 className="text-3xl lg:text-4xl font-headline font-bold mb-4">Don't Leave Your Assets to Chance</h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Professional forensic recovery is time-sensitive. Speak with a specialist today for a confidential review of your situation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto px-10 h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105">
              <Link href="#request">
                Start Recovery Request <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm font-bold text-green-500 uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Specialists Active Now
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Shield className="w-8 h-8 text-primary" />
              <span className="font-headline text-2xl font-bold">
                Analog<span className="text-primary">Heal</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Global leaders in professional cryptocurrency and digital asset recovery services. Trusted by individuals and institutional investors worldwide.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>1201 Digital Forensics Tower, Zürich, CH-8001</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Building className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>AnalogHeal Systems Ltd. | Reg #HE-45293-C1</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#services" className="hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="#process" className="hover:text-primary transition-colors">Recovery Process</Link></li>
              <li><Link href="#blog" className="hover:text-primary transition-colors">Knowledge Hub</Link></li>
              <li><Link href="#request" className="hover:text-primary transition-colors">Submit Request</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Compliance</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Join our Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">Get the latest security alerts and crypto protection tips delivered to your inbox.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>© {mounted ? year : '...'} AnalogHeal Recovery Systems. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Certifications:</span>
            <span className="font-bold text-foreground/50">ISO 27001</span>
            <span className="font-bold text-foreground/50">HIPAA Compliant</span>
            <span className="font-bold text-foreground/50">SOC 2 Type II</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
