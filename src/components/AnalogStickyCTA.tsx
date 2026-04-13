"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AnalogStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      // Show the sticky CTA after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[60] p-4 transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 glow-interaction">
          <div className="hidden md:flex items-center gap-3 px-4 border-r border-white/10">
            <div className="relative">
              <Shield className="w-5 h-5 text-primary shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse-green shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary">Priority Recovery</div>
              <div className="text-[10px] font-semibold flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_3px_rgba(34,197,94,0.5)]" />
                Agents Online: &lt; 5m
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center sm:justify-end gap-2 w-full">
            <Button size="sm" variant="secondary" asChild className="flex-1 sm:flex-none h-11 px-4 gap-2 font-bold text-[10px] glow-interaction">
              <a href="https://t.me/AnalogHealSupport" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4" />
                Telegram
              </a>
            </Button>
            <Button size="sm" variant="outline" asChild className="flex-1 sm:flex-none h-11 px-4 gap-2 font-bold text-[10px] border-white/10 hover:border-green-500/50 glow-confirmation">
              <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 text-green-500" />
                WhatsApp
              </a>
            </Button>
            <Button size="sm" asChild className="flex-[2] sm:flex-none h-11 px-6 gap-2 font-bold text-[10px] bg-primary shadow-lg shadow-primary/20 btn-glow">
              <Link href="#request">
                Start Free Recovery <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
