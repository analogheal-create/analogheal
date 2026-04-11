
"use client";

import Link from "next/link";
import { Shield, Twitter, Facebook, Linkedin, Github } from "lucide-react";
import { useState, useEffect } from "react";

export function AegisFooter() {
  const [year, setYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setMounted(true);
  }, []);

  return (
    <footer className="bg-card/50 border-t border-white/5 pt-20 pb-10">
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
