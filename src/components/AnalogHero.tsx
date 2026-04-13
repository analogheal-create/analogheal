"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2, ShieldCheck, Activity, BarChart3 } from "lucide-react";
import Link from "next/link";

export function AnalogHero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-24 lg:pt-32 lg:pb-40 hero-glow">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div 
          className="z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 glow-interaction">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Verified Forensic Analysts Active
          </div>

          <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight mb-6">
            AnalogHeal <span className="text-primary">Forensics</span><br />
            <span className="text-muted-foreground text-3xl md:text-4xl font-medium">
              Recover Lost Crypto from Scams, Hacks & Locked Wallets
            </span>
          </h1>

          <p className="text-muted-foreground text-lg mb-8 max-w-lg font-body leading-relaxed">
            Advanced blockchain tracing and forensic intelligence services.
            Free technical case review within 24 hours. Data-driven reclamation protocols.
          </p>

          {/* Trust bullets */}
          <div className="mb-10 space-y-3 text-sm font-medium">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Free case review in 24 hours</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>Confidential & secure forensic process</span>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-accent" />
              <span>Institutional probability assessment</span>
            </div>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="h-14 px-8 text-lg font-bold btn-glow bg-primary hover:bg-primary/90 transition-all hover:scale-105">
              <Link href="#request">
                Start Forensic Intake <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 glow-interaction">
              <Play className="mr-2 w-5 h-5 fill-current" /> How It Works
            </Button>
          </div>
        </motion.div>

        {/* RIGHT SIDE - ANIMATED FORENSIC GRAPH */}
        <motion.div 
          className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="w-full h-full relative p-8 rounded-[3rem] bg-card/40 border border-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden glow-interaction">
            <svg className="w-full h-full" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
              {/* Animated Forensic Tracing Lines */}
              <motion.line
                x1="100" y1="120" x2="250" y2="220"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="8 8"
                animate={{ strokeDashoffset: [0, -32] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                opacity="0.6"
              />

              <motion.line
                x1="250" y1="220" x2="380" y2="140"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                strokeDasharray="8 8"
                animate={{ strokeDashoffset: [0, -32] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                opacity="0.6"
              />

              <motion.line
                x1="380" y1="140" x2="440" y2="280"
                stroke="hsl(var(--destructive))"
                strokeWidth="2"
                strokeDasharray="8 8"
                animate={{ strokeDashoffset: [0, -32] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                opacity="0.6"
              />

              {/* Nodes */}
              <circle cx="100" cy="120" r="10" fill="hsl(var(--secondary))" />
              <circle cx="250" cy="220" r="12" fill="hsl(var(--primary))" />
              <circle cx="380" cy="140" r="10" fill="hsl(var(--accent))" />

              {/* Threat Node */}
              <motion.circle
                cx="440"
                cy="280"
                r="15"
                fill="hsl(var(--destructive))"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />

              {/* Technical Labels */}
              <text x="80" y="100" fill="white" fontSize="10" fontWeight="bold" className="font-body opacity-40">INPUT_SOURCE</text>
              <text x="230" y="255" fill="hsl(var(--primary))" fontSize="10" fontWeight="bold" className="font-body">HOP_01</text>
              <text x="360" y="120" fill="hsl(var(--accent))" fontSize="10" fontWeight="bold" className="font-body">DEANONYMIZED</text>
              <text x="420" y="315" fill="hsl(var(--destructive))" fontSize="10" fontWeight="bold" className="font-body">THREAT_IDENTIFIED</text>
            </svg>

            {/* Forensic Overlays */}
            <motion.div
              className="absolute top-10 right-10 bg-background/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2 flex items-center gap-1">
                <Activity className="w-3 h-3" /> Technical Match
              </p>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-16 bg-accent/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-accent"
                    animate={{ width: ["0%", "94%"] }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-accent">94.2%</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-10 bg-background/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mb-2">Exposure Risk</p>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-20 bg-destructive/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-destructive"
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                  />
                </div>
                <span className="text-[10px] font-mono font-bold text-destructive">CRITICAL</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
