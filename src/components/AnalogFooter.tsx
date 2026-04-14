"use client";

import Link from "next/link";
import { Shield, Twitter, Facebook, Linkedin, Github, MapPin, Building, ArrowRight, ShieldCheck, Scale, Lock, FileText, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const legalDocs = {
  engagement: {
    title: "Terms of Forensic Engagement",
    icon: Scale,
    description: "Official protocols governing the laboratory's relationship with private and institutional clients.",
    content: `
      **1. Scope of Investigation**
      AnalogHeal Forensics provides digital asset tracing and heuristic probability assessments. We do not guarantee recovery but provide the technical evidence required for reclamation.

      **2. Client Obligations**
      Clients must provide accurate Transaction IDs (TXIDs), wallet addresses, and chronological event logs. Failure to provide validated data may result in case suspension.

      **3. Fee Structure**
      For qualifying fraud cases, the laboratory operates on a performance-aligned model. Initial assessments are complimentary. Specific forensic cycles may require resource allocation fees which are disclosed prior to initiation.

      **4. Liability**
      AnalogHeal acts as a forensic consultant. Final asset reclamation is subject to the cooperation of Virtual Asset Service Providers (VASPs) and law enforcement jurisdictions.
    `
  },
  privacy: {
    title: "Data Privacy Policy",
    icon: Lock,
    description: "Swiss-standard data isolation and encryption protocols for case integrity.",
    content: `
      **1. Data Isolation**
      All submitted intake data is isolated on encrypted Swiss-based servers. We utilize RSA-4096 encryption for sensitive diagnostic files.

      **2. Retention Policy**
      Diagnostic data is retained for the duration of the investigation plus 90 days for audit purposes, after which it is purged from our primary forensic clusters unless legal holds are in place.

      **3. Third-Party Sharing**
      We do not sell data. We only share sanitized forensic reports with verified legal partners or exchange compliance teams upon explicit client authorization.

      **4. SOC 2 Compliance**
      Our infrastructure adheres to SOC 2 Type II standards, ensuring strict internal controls over data access and network security.
    `
  },
  compliance: {
    title: "Regulatory Compliance",
    icon: ShieldCheck,
    description: "International standards and institutional certifications of the AnalogHeal Laboratory.",
    content: `
      **1. FINMA Adherence**
      AnalogHeal Forensic Systems Ltd. operates under the digital asset guidelines established by the Swiss Financial Market Supervisory Authority (FINMA).

      **2. ISO 27001 Certification**
      The laboratory maintains ISO 27001 certification for Information Security Management Systems (ISMS), ensuring global standard protection.

      **3. VASP Cooperation**
      We maintain emergency communication channels with Tier-1 exchanges. Our forensic reports are formatted to satisfy international AML (Anti-Money Laundering) and KYC (Know Your Customer) requirements.

      **4. Forensic Integrity**
      Our lead analysts are certified in blockchain intelligence (Chainalysis/Elliptic) and follow INTERPOL-compliant digital evidence gathering protocols.
    `
  },
  conflict: {
    title: "Conflict of Interest",
    icon: AlertTriangle,
    description: "Transparency protocols ensuring unbiased forensic reporting.",
    content: `
      **1. Neutrality Protocol**
      AnalogHeal maintain strict independence from exchanges and DeFi protocols. Our findings are based solely on on-chain heuristics and forensic evidence.

      **2. Case Screening**
      Every intake undergoes an automated conflict-of-interest check. We do not accept cases where the laboratory has a prior or existing investigation into the target entity that could compromise report objectivity.

      **3. Disclosure**
      If a conflict is identified during an active investigation, the client will be notified immediately, and the file will be transferred to a neutral partner node within the International Cyber Forensics Consortium.
    `
  }
};

const TechnicalRenderer = ({ text }: { text: string }) => (
  <div className="space-y-4">
    {text.split('\n\n').map((p, idx) => (
      <p key={idx} className="text-sm text-foreground/80 leading-relaxed">
        {p.split(/(\*\*.*?\*\*)/).map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pIdx} className="text-foreground">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    ))}
  </div>
);

export function AnalogFooter() {
  const [year, setYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<keyof typeof legalDocs | null>(null);

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
              <li>
                <button 
                  onClick={() => setSelectedDoc('engagement')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Terms of Forensic Engagement
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSelectedDoc('privacy')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Data Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSelectedDoc('compliance')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Regulatory Compliance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setSelectedDoc('conflict')}
                  className="hover:text-primary transition-colors text-left"
                >
                  Conflict of Interest
                </button>
              </li>
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
          <div>© 2020-{mounted ? year : '...'} AnalogHeal Forensics & Recovery Labs. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Certifications:</span>
            <span className="font-bold text-foreground/50">ISO 27001</span>
            <span className="font-bold text-foreground/50">FINMA Registered</span>
            <span className="font-bold text-foreground/50">SOC 2 Type II</span>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="max-w-2xl bg-card border-white/10 text-foreground overflow-y-auto max-h-[90vh]">
          {selectedDoc && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-2">
                  {(() => {
                    const Icon = legalDocs[selectedDoc].icon;
                    return <Icon className="w-4 h-4" />;
                  })()}
                  Laboratory Document
                </div>
                <DialogTitle className="text-2xl font-headline font-bold">
                  {legalDocs[selectedDoc].title}
                </DialogTitle>
                <DialogTitle className="sr-only">Access institutional legal documentation and compliance policies.</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-2 italic">
                  {legalDocs[selectedDoc].description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-8">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <TechnicalRenderer text={legalDocs[selectedDoc].content} />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[10px] text-muted-foreground italic flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Authorized Forensic Protocol | Swiss Secure
                </div>
                <Button onClick={() => setSelectedDoc(null)} variant="secondary" className="w-full sm:w-auto">
                  Close Document
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </footer>
  );
}
