"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Settings, 
  Shield, 
  Lock, 
  Server, 
  Globe, 
  Bell, 
  Database,
  Loader2,
  Save,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleSave = () => {
    toast({
      title: "Settings Updated",
      description: "Laboratory configuration has been securely synchronized.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AdminSidebar userEmail={user?.email} />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <h1 className="font-headline font-bold text-xl">Lab Settings</h1>
          <Button size="sm" onClick={handleSave} className="gap-2 text-[10px] font-bold uppercase bg-primary text-primary-foreground">
            <Save className="w-3.5 h-3.5" /> Sync Config
          </Button>
        </header>

        <div className="p-8 space-y-8">
          <Tabs defaultValue="forensics" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 p-1">
              <TabsTrigger value="forensics" className="text-xs font-bold uppercase px-6">Forensics</TabsTrigger>
              <TabsTrigger value="network" className="text-xs font-bold uppercase px-6">Network</TabsTrigger>
              <TabsTrigger value="security" className="text-xs font-bold uppercase px-6">Security</TabsTrigger>
              <TabsTrigger value="account" className="text-xs font-bold uppercase px-6">Analyst Account</TabsTrigger>
            </TabsList>

            <TabsContent value="forensics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-card/50 border-white/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" /> Intake Protocols
                    </CardTitle>
                    <CardDescription className="text-xs">Configure how incoming recovery requests are handled.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">AI Intake Enhancement</Label>
                        <p className="text-[10px] text-muted-foreground">Auto-optimize technical case descriptions using Genkit.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Probability Auto-Scoring</Label>
                        <p className="text-[10px] text-muted-foreground">Calculate recovery probability on submission.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm">High-Value Escalation</Label>
                        <p className="text-[10px] text-muted-foreground">Notify lead analysts for files &gt; $50k.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-white/5">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                      <Database className="w-4 h-4 text-accent" /> Data Persistence
                    </CardTitle>
                    <CardDescription className="text-xs">Manage how forensic data is archived.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Log Retention (Days)</Label>
                      <Input type="number" defaultValue="90" className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Archive Node Region</Label>
                      <Input defaultValue="CH-ZÜRICH-01" className="bg-white/5 border-white/10" disabled />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-6">
              <Card className="bg-card/50 border-white/5">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" /> Forensic Clusters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { node: "Zürich Alpha", status: "Online", latency: "12ms" },
                    { node: "Singapore Beta", status: "Online", latency: "142ms" },
                    { node: "New York Gamma", status: "Maintenance", latency: "---" },
                  ].map((cluster) => (
                    <div key={cluster.node} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-1.5 h-1.5 rounded-full", cluster.status === "Online" ? "bg-green-500 animate-pulse" : "bg-muted")} />
                        <span className="text-sm font-bold">{cluster.node}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-mono">
                        <span className="text-muted-foreground uppercase">{cluster.status}</span>
                        <span className="text-primary">{cluster.latency}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="bg-card/50 border-white/5">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Lock className="w-4 h-4 text-destructive" /> Security Overrides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">2FA Enforcement</Label>
                      <p className="text-[10px] text-muted-foreground">Mandatory for all analyst levels.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">IP Whitelisting</Label>
                      <p className="text-[10px] text-muted-foreground">Restrict dashboard access to laboratory IPs.</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Encrypted Export Mode</Label>
                      <p className="text-[10px] text-muted-foreground">All database exports are RSA-4096 encrypted.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 flex gap-4 items-center">
            <ShieldCheck className="w-6 h-6 text-green-500" />
            <div className="text-xs">
              <span className="font-bold text-green-500">Security Audit Passed.</span> Last laboratory-wide integrity scan completed at {new Date().toLocaleDateString()}.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
