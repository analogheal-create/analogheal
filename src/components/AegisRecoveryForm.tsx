"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  MessageCircle, 
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
  ShieldCheck
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
  { id: "scammed", label: "I was scammed", icon: ShieldAlert, description: "Investment scams, phishing, or fake platforms." },
  { id: "wallet", label: "My wallet is locked", icon: Key, description: "Lost seed phrase, password, or device failure." },
  { id: "exchange", label: "Exchange issue", icon: Landmark, description: "Account frozen, withdrawal issues, or disputes." },
  { id: "hacked", label: "Hacked account", icon: Zap, description: "Unauthorized access or compromised credentials." },
];

export function AegisRecoveryForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(0); // 0: Selector, 1: Details
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

  const handleSelectType = (id: string) => {
    form.setValue("recoveryType", id);
    setStep(1);
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
        title: "AI Draft Complete",
        description: "Your message has been enhanced for our AnalogHeal agents.",
      });
    } catch (error) {
      toast({
        title: "AI Assistant Error",
        description: "Could not draft message at this time.",
        variant: "destructive",
      });
    } finally {
      setIsDrafting(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Request Submitted Successfully",
      description: "Our forensic team will review your case and contact you within 24 hours.",
    });
    form.reset();
    setStep(0);
  }

  return (
    <section id="request" className="py-24 bg-gradient-to-b from-transparent to-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-6xl font-headline font-bold mb-6 text-foreground">Start Your Professional Recovery</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tell us what happened. Our forensic experts will analyze your case and provide a free assessment within 24 hours.
            </p>
          </div>

          <div className={cn(
            "grid grid-cols-1 lg:grid-cols-12 gap-12 items-start transition-all duration-500",
            step === 1 ? "opacity-100" : "opacity-95"
          )}>
            {/* Left Column: Trust & Context */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-primary font-bold mb-4">
                  <ShieldCheck className="w-6 h-6" />
                  AnalogHeal Security Protocol
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm">End-to-end encrypted communication via Swiss servers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm">No upfront forensic fees for qualifying scam cases.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm">Direct access to certified blockchain investigators.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Prefer instant messaging?</h3>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">WhatsApp Secure Line</div>
                    <div className="text-sm text-muted-foreground">Immediate Case Priority</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Telegram Verified Bot</div>
                    <div className="text-sm text-muted-foreground">@AnalogHealSupport</div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed italic">
                *Submitting this form does not create a binding contract. All cases are subject to a strict conflict-of-interest check before acceptance.
              </p>
            </div>

            {/* Right Column: Funnel Form */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-3xl bg-card border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: step === 0 ? '50%' : '100%' }}
                  />
                </div>

                {step === 0 ? (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-2xl font-headline font-bold mb-2">Step 1: What happened?</h3>
                    <p className="text-muted-foreground mb-8 text-sm">Select the category that best describes your situation.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {funnelOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectType(opt.id)}
                          className="flex flex-col items-start p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group text-left"
                        >
                          <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                            <opt.icon className="w-6 h-6" />
                          </div>
                          <div className="font-bold mb-1">{opt.label}</div>
                          <div className="text-xs text-muted-foreground leading-relaxed">{opt.description}</div>
                          <div className="mt-4 text-xs font-bold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Continue <ChevronRight className="w-3 h-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="mt-8 text-center text-xs text-muted-foreground">
                      Your selection helps us assign the right expert to your case.
                    </p>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <button 
                      type="button"
                      onClick={() => setStep(0)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to selector
                    </button>
                    
                    <h3 className="text-2xl font-headline font-bold mb-6">Step 2: Case Details</h3>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
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
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Secure Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="estimatedValue"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Estimated Value (USD)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. $10,000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center justify-between">
                                <FormLabel>Describe Your Case</FormLabel>
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 text-primary gap-1.5 px-2 hover:bg-primary/10"
                                  onClick={handleAIDraft}
                                  disabled={isDrafting}
                                >
                                  {isDrafting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                  AI Enhance
                                </Button>
                              </div>
                              <FormControl>
                                <Textarea 
                                  placeholder="What was the last step before you lost access? Mention any transaction IDs if available." 
                                  className="min-h-[140px] bg-background/50"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                          Submit Recovery Request <Send className="ml-2 w-5 h-5" />
                        </Button>
                        
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <ShieldCheck className="w-3 h-3 text-primary" />
                          Encrypted Submission Secured by AnalogHeal
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
