"use client";

import Link from "next/link";
import { Shield, Twitter, Facebook, Linkedin, Github, MapPin, Building, ArrowRight, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export function AnalogFooter() {
  const [year, setYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setMounted(true);
    const fetchLogo = async () => {
      const { data } = await supabase
        .from('operational_proofs')
        .select('image_url')
        .eq('asset_key', 'brand-logo')
        .single();
      if (data) setLogoUrl(data.image_url);
    };
    fetchLogo();
  }, []);

  return (
    <footer className="bg-card/50 border-t border-white/5 pt-0 pb-10">
      {/* Final Conversion Push */}
      <div className="relative overflow-hidden py-16 mb-20 border-b border-white/5 bg-primary/5">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h3 className="text-3xl lg:text-4xl font-headline font-bold mb-4">Protect Your Digital Rights Today</h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Professional forensic recovery is highly time-sensitive. Speak with our lab specialists today for a confidential review of your situation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto px-10 h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105">
              <Link href="#request">
                Start Forensic Intake <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm font-bold text-green-500 uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Lab Analysts Active
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              {logoUrl ? (
                <div className="relative w-8 h-8 rounded bg-primary/10 overflow-hidden">
                  <Image src={logoUrl} alt="Logo" fill className="object-contain p-1" />
                </div>
              ) : (
                <Shield className="w-8 h-8 text-primary" />
              )}
              <span className="font-headline text-2xl font-bold">
                Analog<span className="text-primary">Heal</span> <span className="text-sm font-medium opacity-50">Forensics</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Global leaders in professional digital asset forensics and blockchain recovery. AnalogHeal Recovery Labs provides institutional-grade intelligence for asset reclamation.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>1201 Digital Forensics Tower, Zürich, CH-8001</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Building className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>AnalogHeal Forensic Systems Ltd. | Reg #HE-45293-C1</span>
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
            <h4 className="font-bold text-lg mb-6">Laboratory</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#services" className="hover:text-primary transition-colors">Forensic Services</Link></li>
              <li><Link href="#process" className="hover:text-primary transition-colors">Methodology</Link></li>
              <li><Link href="#blog" className="hover:text-primary transition-colors">Intelligence Hub</Link></li>
              <li><Link href="#request" className="hover:text-primary transition-colors">Submit Forensic Case</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Support Lab</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal & Compliance</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Forensic Engagement</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Data Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Regulatory Compliance</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Conflict of Interest</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Security Intelligence</h4>
            <p className="text-muted-foreground text-sm mb-4">Receive critical security alerts and blockchain vulnerability reports from our lab.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Secure email" 
                className="flex-1 bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>© {mounted ? year : '...'} AnalogHeal Forensics & Recovery Labs. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Certifications:</span>
            <span className="font-bold text-foreground/50">ISO 27001</span>
            <span className="font-bold text-foreground/50">FINMA Registered</span>
            <span className="font-bold text-foreground/50">SOC 2 Type II</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
