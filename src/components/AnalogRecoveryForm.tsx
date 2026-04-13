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
  User
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
  const stepLabel = step < 2 ? "Step 1 of 2: Lab Assessment (30s)" : "Step 2 of 2: Case Forensics (1m)";

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
        title: "AI Analysis Complete",
        description: "Your technical report has been enhanced for our forensic analysts.",
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
      title: "Forensic Case Initiated",
      description: "Our lab team will review your case and contact you within 24 hours.",
    });
    form.reset();
    setStep(0);
  }

  return (
    <section id="request" className="py-24 bg-gradient-to-b from-transparent to-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-6xl font-headline font-bold mb-6 text-foreground">Initiate Forensic Recovery</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Submit your case to our recovery labs. Our forensic analysts will provide a technical assessment within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Authority & Trust */}
            <div className="lg:col-span-4 space-y-8">
              <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 backdrop-blur-sm glow-confirmation">
                <div className="flex items-center gap-3 text-primary font-bold mb-4">
                  <ShieldCheck className="w-6 h-6 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  AnalogHeal Forensic Protocol
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                    <span className="text-sm">End-to-end encrypted communication via Swiss forensic servers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                    <span className="text-sm">Institutional no-upfront fee policy for qualifying fraud cases.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0 shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                    <span className="text-sm">Direct engagement with certified blockchain investigators.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold text-lg mb-4">Official Forensic Intake</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  This secure intake form is the mandated primary method for initiating a case. Your data is isolated and encrypted until reviewed by a lead analyst.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-primary">
                  <ShieldCheck className="w-4 h-4" />
                  ISO 27001 Certified Laboratory
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                *Case submission does not guarantee acceptance. All files undergo strict forensic conflict-of-interest vetting.
              </p>
            </div>

            {/* Right Column: Funnel Form */}
            <div className="lg:col-span-8">
              <div className="p-8 rounded-3xl bg-card border border-white/10 shadow-2xl relative overflow-hidden glow-interaction">
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
                    <p className="text-muted-foreground mb-8 text-sm">Select the forensic category that best describes your loss.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {funnelOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectType(opt.id)}
                          className="flex flex-col items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group text-left glow-interaction"
                        >
                          <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <opt.icon className="w-6 h-6" />
                          </div>
                          <div className="font-bold mb-1">{opt.label}</div>
                          <div className="text-xs text-muted-foreground leading-relaxed">{opt.description}</div>
                          <div className="mt-4 text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Assign Category <ChevronRight className="w-3 h-3" />
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
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Step 1
                    </button>
                    
                    <h3 className="text-2xl font-headline font-bold mb-6">Valuation Analysis</h3>
                    <p className="text-muted-foreground mb-8 text-sm">Providing an accurate valuation helps our lab assign the appropriate forensic computing resources to your case.</p>
                    
                    <Form {...form}>
                      <div className="space-y-8">
                        <FormField
                          control={form.control}
                          name="estimatedValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-semibold flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-accent glow-success" />
                                Estimated Market Value (USD)
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                                  <Input placeholder="e.g. 50,000" className="h-16 pl-8 text-2xl font-bold bg-background/50 border-white/10 focus:border-accent/50 glow-success" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button onClick={handleNextToFinal} className="w-full h-16 text-lg font-bold btn-glow bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105">
                          Continue to Forensic Details <ChevronRight className="ml-2 w-5 h-5" />
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
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Step 2
                    </button>
                    
                    <h3 className="text-2xl font-headline font-bold mb-6">Client Identity & Technical Summary</h3>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-primary" /> Full Name
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} className="glow-interaction" />
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
                                  <Mail className="w-4 h-4 text-primary" /> Official Email
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="john@example.com" {...field} className="glow-interaction" />
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
                                <Phone className="w-4 h-4 text-primary" /> Secure Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="+1..." {...field} className="glow-interaction" />
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
                                  className="h-8 text-accent gap-1.5 px-2 hover:bg-accent/10 glow-success"
                                  onClick={handleAIDraft}
                                  disabled={isDrafting}
                                >
                                  {isDrafting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                  Forensic AI Analysis
                                </Button>
                              </div>
                              <FormControl>
                                <Textarea 
                                  placeholder="Detail the events leading to the loss. Include transaction IDs (TXIDs) if available for tracing." 
                                  className="min-h-[140px] bg-background/50 glow-interaction"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full h-16 text-lg font-bold btn-glow bg-primary hover:bg-primary/90 transition-all hover:scale-105">
                          Initiate Recovery Request <Send className="ml-2 w-5 h-5" />
                        </Button>
                        
                        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60 glow-confirmation py-1 rounded-full">
                          <ShieldCheck className="w-3 h-3 text-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                          Encrypted Intake Secured by AnalogHeal Forensics
                        </div>
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
