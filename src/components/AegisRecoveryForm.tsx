
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageCircle, Send, Sparkles, Loader2, Phone } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { aiDraftRecoveryMessage } from "@/ai/flows/ai-draft-recovery-message";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(6, "Invalid phone number."),
  recoveryType: z.string().min(1, "Please select a recovery type."),
  estimatedValue: z.string().min(1, "Please estimate the value."),
  message: z.string().min(20, "Please provide more details (min 20 chars)."),
});

export function AegisRecoveryForm() {
  const { toast } = useToast();
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

  const handleAIDraft = async () => {
    const recoveryType = form.getValues("recoveryType");
    const estimatedValue = form.getValues("estimatedValue");
    const userMessage = form.getValues("message");

    if (!recoveryType || !userMessage) {
      toast({
        title: "Information Required",
        description: "Please select a recovery type and enter a brief description first.",
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
      title: "Request Submitted",
      description: "Our experts will review your case and contact you within 24 hours.",
    });
    form.reset();
  }

  return (
    <section id="request" className="py-24 bg-gradient-to-b from-transparent to-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-5xl font-headline font-bold mb-6">Submit Your Recovery Request</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Your privacy is our priority. All communications are encrypted and strictly confidential. Fill out the form or contact us directly via messaging apps.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                  <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">WhatsApp Support</div>
                    <div className="text-sm text-muted-foreground">+1 (555) 000-0000</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Telegram Channel</div>
                    <div className="text-sm text-muted-foreground">@AnalogHeal</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 text-primary font-bold mb-2">
                  <Sparkles className="w-5 h-5" />
                  Need help explaining?
                </div>
                <p className="text-sm text-muted-foreground">
                  Our AI assistant can help you draft a detailed message that helps our forensics team understand your case faster.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-white/10 shadow-2xl">
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recoveryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recovery Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="wallet">Wallet Access Recovery</SelectItem>
                              <SelectItem value="hacked">Hacked Account</SelectItem>
                              <SelectItem value="exchange">Exchange Dispute</SelectItem>
                              <SelectItem value="password">Forgotten Password</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Case Details</FormLabel>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-primary gap-1.5"
                            onClick={handleAIDraft}
                            disabled={isDrafting}
                          >
                            {isDrafting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                            AI Enhance
                          </Button>
                        </div>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the situation, assets lost, and any steps already taken..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90">
                    Send Request <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
