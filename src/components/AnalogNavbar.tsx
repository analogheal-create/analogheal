"use client";

import Link from "next/link";
import { Shield, Menu, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Knowledge Hub", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export function AnalogNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="glass-header">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-2xl font-bold tracking-tight leading-none">
                Analog<span className="text-primary">Heal</span> Forensics
              </span>
              <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider mt-1 hidden sm:block">
                Crypto Asset Recovery & Blockchain Intelligence
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="glass-header">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors glow-interaction shrink-0">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-2xl font-bold tracking-tight leading-none">
              Analog<span className="text-primary">Heal</span> <span className="text-muted-foreground font-medium text-lg">Forensics</span>
            </span>
            <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider mt-1 hidden sm:block">
              Crypto Asset Recovery & Blockchain Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full shadow-sm shadow-primary"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 glow-confirmation">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-green shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Lab Analysts Online</span>
          </div>
          <Button variant="default" size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 btn-glow-action font-bold">
            <Link href="#request">Start Recovery</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 glow-confirmation">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-green shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
            <span className="text-[8px] font-bold text-green-500 uppercase tracking-wider">Live</span>
          </div>
          <Button variant="default" size="sm" asChild className="h-9 px-3 btn-glow-action text-primary-foreground font-bold">
            <Link href="#request">Start</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-white/10 p-0">
              <SheetHeader className="px-6 pt-10 text-left">
                <SheetTitle className="text-2xl font-headline font-bold">Menu</SheetTitle>
                <SheetDescription>
                  Access our professional forensic recovery services and knowledge hub.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full pt-6 px-6 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-headline font-semibold text-foreground"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-auto pb-10 flex flex-col gap-4">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 glow-interaction">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
                      <ShieldCheck className="w-4 h-4" />
                      Forensic Intelligence
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-4">Our specialists are currently active and typically review case files in under 24 hours.</p>
                  </div>
                  <Button className="w-full justify-between h-12 btn-glow-action text-primary-foreground font-bold" asChild>
                    <Link href="#request" onClick={() => setIsOpen(false)}>
                      Start Recovery <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}