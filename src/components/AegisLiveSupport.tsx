
"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, ShieldCheck, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AegisLiveSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[70] flex flex-col items-end sm:bottom-28">
      {/* Chat Window */}
      <div
        className={cn(
          "mb-4 w-72 sm:w-80 rounded-2xl bg-card border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-primary p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-primary rounded-full animate-pulse" />
            </div>
            <div>
              <div className="font-bold text-sm">AnalogHeal Support</div>
              <div className="text-[10px] opacity-80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Specialists Online
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white/5 rounded-xl p-3 text-xs leading-relaxed text-muted-foreground">
            Hi! I'm here to help you with your recovery. Typically, we reply in <span className="text-primary font-bold">under 5 minutes</span>. How can we assist you today?
          </div>
          
          <div className="space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Secure Direct Lines</div>
            <Button variant="secondary" className="w-full justify-between h-11 text-xs font-bold" asChild>
              <a href="https://t.me/AnalogHealSupport" target="_blank" rel="noopener noreferrer">
                Verified Telegram <MessageCircle className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-between h-11 text-xs font-bold border-white/10" asChild>
              <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
                WhatsApp Secure <Phone className="w-4 h-4 text-green-500" />
              </a>
            </Button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-[9px] text-muted-foreground opacity-60">
            <ShieldCheck className="w-3 h-3" />
            Swiss-encrypted secure interaction
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 relative z-10",
            isOpen ? "rotate-90" : "rotate-0"
          )}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full z-20" />
        )}
      </div>
    </div>
  );
}
