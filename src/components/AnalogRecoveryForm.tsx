"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Send, 
  Sparkles, 
  Loader2, 
  Phone, 
  ShieldAlert, 
  Key, 
  Landmark, 
  Zap, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Mail,
  User,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { aiDraftRecoveryMessage } from "@/ai/flows/ai-draft-recovery-message";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(6, "Invalid phone number."),
  recoveryType: z.string().min(1, "Please select a recovery type."),
  estimatedValue: z.string().min(1, "Please estimate the value."),
  message: z.string().min(20, "Please provide more details (min 20 chars)."),
});

const funnelOptions = [
  { id: "scammed", label: "Fraudulent Scam", icon: ShieldAlert, description: "Investment scams, phishing, or fake platforms." },
  { id: "wallet", label: "Hardware Lockout", icon: Key, description: "Lost seed phrase, password, or device failure." },
  { id: "exchange", label: "Exchange Dispute", icon: Landmark, description: "Account frozen, withdrawal issues, or disputes." },
  { id: "hacked", label: "Compromised Account", icon: Zap, description: "Unauthorized access or compromised credentials." },
];

export function AnalogRecoveryForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(0); 
  const [isDrafting, setIsDrafting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      recoveryType: "",
      estimatedValue: "",
      message: "",
    },
  });

  const progress = step === 0 ? 33 : step === 1 ? 66 : 100;
  const stepLabel = step < 2 ? "Step 1 of 2: Lab Assessment (30s)" : "Step 2 of 2: Technical Summary (1m)";

  const handleSelectType = (id: string) => {
    form.setValue("recoveryType", id);
    setStep(1);
  };

  const handleNextToFinal = async () => {
    const isValidValue = await form.trigger("estimatedValue");
    if (isValidValue) {
      setStep(2);
    }
  };

  const handleAIDraft = async () => {
    const recoveryType = form.getValues("recoveryType");
    const estimatedValue = form.getValues("estimatedValue");
    const userMessage = form.getValues("message");

    if (!userMessage || userMessage.length < 10) {
      toast({
        title: "More Details Needed",
        description: "Please enter a brief description of your situation first.",
        variant: "destructive",
      });
      return;
    }

    setIsDrafting(true);
    try {
      const result = await aiDraftRecoveryMessage({
        recoveryType,
        estimatedValue: estimatedValue || "Unknown",
        userMessage,
      });
      form.setValue("message", result.draftedMessage);
      toast({
        title: "Forensic Analysis Complete",
        description: "Technical report enhanced for investigative review.",
      });
    } catch (error) {
      toast({
        title: "Lab Assistant Error",
        description: "Could not process technical data at this time.",
        variant: "destructive",
      });
    } finally {
      setIsDrafting(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Forensic Intake Initiated",
      description: "A lead analyst will review your encrypted file and contact you in < 24h.",
    });
    form.reset();
    setStep(0);
  }

  return (
    <section id="request" className="py-24 bg-gradient-to-b from-transparent to-card/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-6xl font-headline font-bold mb-6 text-foreground">Initiate Forensic Recovery</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Submit your case to our recovery labs. Our technical team provides a secure forensic assessment within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Authority & Trust */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 backdrop-blur-sm glow-success">
                <div className="flex items-center gap-3 text-primary font-bold mb-4">
                  <ShieldCheck className="w-6 h-6" />
                  Forensic Lab Protocol
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm">End-to-end encrypted communication via Swiss forensic servers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm">Institutional no-upfront fee policy for qualifying fraud cases.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-sm text-accent">Direct engagement with certified blockchain intelligence experts.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-lg mb-4">Official Laboratory Intake</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  All data is isolated and encrypted until reviewed by a lead analyst. This secure portal is the mandated method for initiating a recovery file.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-accent">
                  <Activity className="w-4 h-4" />
                  ISO 27001 Certified Infrastructure
                </div>
              </div>
            </div>

            {/* Right Column: Funnel Form - Action Focus (Blue) */}
            <div className="lg:col-span-8">
              <div className="p-8 rounded-3xl bg-card border border-white/10 shadow-2xl relative overflow-hidden card-hover">
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{stepLabel}</span>
                    <span className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-1.5 bg-white/5" />
                </div>

                {step === 0 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-2xl font-headline font-bold mb-2">Case Categorization</h3>
                    <p className="text-muted-foreground mb-8 text-sm">Select the technical category that best describes your loss situation.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {funnelOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectType(opt.id)}
                          className="flex flex-col items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-accent/5 transition-all group text-left"
                        >
                          <div className="p-3 rounded-xl bg-accent/10 text-accent mb-4 group-hover:scale-110 group-hover:bg-accent group-hover:text-background transition-all duration-300">
                            <opt.icon className="w-6 h-6" />
                          </div>
                          <div className="font-bold mb-1">{opt.label}</div>
                          <div className="text-xs text-muted-foreground leading-relaxed">{opt.description}</div>
                          <div className="mt-4 text-xs font-bold text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Categorize <ChevronRight className="w-3 h-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <button 
                      type="button"
                      onClick={() => setStep(0)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Categorization
                    </button>
                    
                    <h3 className="text-2xl font-headline font-bold mb-6">Valuation Analysis</h3>
                    
                    <Form {...form}>
                      <div className="space-y-8">
                        <FormField
                          control={form.control}
                          name="estimatedValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-accent" />
                                Market Value for Reclamation (USD)
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold font-mono">$</span>
                                  <Input placeholder="e.g. 50,000" className="h-16 pl-8 text-2xl font-bold font-mono bg-background/50 border-white/10 focus:border-accent/50" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button onClick={handleNextToFinal} className="w-full h-16 text-lg font-bold btn-glow-action bg-primary hover:bg-primary/90 transition-all hover:scale-105">
                          Proceed to Technical Details <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Valuation
                    </button>
                    
                    <h3 className="text-2xl font-headline font-bold mb-6">Identity & Forensic Summary</h3>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-accent" /> Full Name
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} className="bg-background/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-accent" /> Official Email
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="john@example.com" {...field} className="bg-background/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-accent" /> Secure Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="+1..." {...field} className="bg-background/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel>Technical Case Description</FormLabel>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 text-accent gap-1.5 px-2 hover:bg-accent/10 glow-intelligence"
                                  onClick={handleAIDraft}
                                  disabled={isDrafting}
                                >
                                  {isDrafting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                  Forensic AI Optimization
                                </Button>
                              </div>
                              <FormControl>
                                <Textarea 
                                  placeholder="Detail the events leading to the loss. Include transaction IDs (TXIDs) if available for tracing." 
                                  className="min-h-[140px] bg-background/50"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full h-16 text-lg font-bold btn-glow-action bg-primary hover:bg-primary/90 transition-all hover:scale-105">
                          Initiate Recovery File <Send className="ml-2 w-5 h-5" />
                        </Button>
                      </form>
                    </Form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}