"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Activity, 
  Terminal, 
  ShieldCheck, 
  ShieldAlert, 
  Network, 
  Database,
  Loader2,
  Lock,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";

const logs = [
  { time: "09:42:12", event: "VASP Endpoint Identification", source: "Chainalysis Relay", status: "Verified", color: "text-primary" },
  { time: "09:40:05", event: "Malicious Smart Contract Flagged", source: "Heuristic Engine", status: "Alert", color: "text-red-400" },
  { time: "09:38:44", event: "GPU Cluster: Key Fragment Reconstructed", source: "Zürich Lab Node 4", status: "Success", color: "text-green-400" },
  { time: "09:35:10", event: "Inbound Forensic Request: AH-4925", source: "Encrypted API", status: "Queued", color: "text-accent" },
  { time: "09:32:11", event: "Node Integrity Scan Complete", source: "Global Network", status: "Optimal", color: "text-primary" },
  { time: "09:30:01", event: "Lazarus Group Wallet Movement Detected", source: "Threat Intel", status: "Monitored", color: "text-amber-400" },
];

export default function IntelligenceLogsPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
        <header className="h-16 border-b border-white/5 flex items-center justify-between pl-16 pr-4 lg:px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <h1 className="font-headline font-bold text-lg lg:text-xl truncate">Intelligence Logs</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Activity className="w-3 h-3 text-primary animate-pulse" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Live Stream</span>
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <Card className="bg-card/50 border-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Network className="w-3.5 h-3.5" /> Network Load
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 PB/s</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Database className="w-3.5 h-3.5" /> Intelligence Nodes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">428</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" /> Encryption Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">RSA-4096</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#070B14] border-white/10 font-mono shadow-2xl overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5 p-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">terminal_intake.log</span>
              </div>
              <Terminal className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-4 lg:p-6 space-y-4 max-h-[500px] overflow-y-auto">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-4 text-[10px] lg:text-xs leading-relaxed group">
                  <span className="text-muted-foreground/40 font-bold shrink-0">[{log.time}]</span>
                  <span className="text-muted-foreground/60 shrink-0 uppercase tracking-widest font-bold hidden sm:inline">{log.source}</span>
                  <span className="flex-1 text-foreground/80">{log.event}</span>
                  <span className={cn("font-bold uppercase tracking-widest", log.color)}>{log.status}</span>
                </div>
              ))}
              <div className="flex gap-4 text-xs animate-pulse">
                <span className="text-muted-foreground/40 font-bold">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-primary font-bold">_ SYSTEM LISTENING ...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
