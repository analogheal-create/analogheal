
"use client";

import Link from "next/link";
import { Shield, Menu, MessageCircle, Phone, ArrowRight } from "lucide-react";
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

export function AegisNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="glass-header">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight">
            Aegis<span className="text-primary">Recovery</span>
          </span>
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
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Button variant="secondary" size="sm" className="gap-2 text-primary-foreground font-semibold">
            <MessageCircle className="w-4 h-4" />
            Telegram
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="#contact">Contact</Link>
          </Button>
          <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 animate-pulse-subtle">
            Start Recovery
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-4">
          <Button variant="default" size="sm" className="h-9 px-3">
            Start
          </Button>
          {mounted ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-white/10 p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Access website sections, services, and recovery tools.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full pt-20 px-6 gap-6">
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
                    <Button className="w-full justify-between h-12" variant="secondary">
                      Join Telegram <MessageCircle className="w-5 h-5" />
                    </Button>
                    <Button className="w-full justify-between h-12">
                      Start Recovery <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
