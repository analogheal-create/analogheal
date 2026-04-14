
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  Loader2,
  ChevronRight,
  ShieldAlert,
  Zap,
  Key,
  Landmark,
  TrendingUp,
  Activity,
  ShieldCheck,
  Wallet,
  User,
  Mail,
  Phone,
  Clock,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";

const categories: Record<string, any> = {
  "investment": { label: "Investment Scam", icon: TrendingUp, color: "text-amber-400" },
  "broker": { label: "Bad Broker", icon: Landmark, color: "text-accent" },
  "trading": { label: "Trading Scam", icon: Activity, color: "text-primary" },
  "romance": { label: "Romance Scam", icon: ShieldCheck, color: "text-red-400" },
  "loan": { label: "Loan Scam", icon: FileText, color: "text-muted-foreground" },
  "wallet": { label: "Wallet Recovery", icon: Wallet, color: "text-amber-400" },
  "crypto-assets": { label: "Assets Recovery", icon: Zap, color: "text-primary" },
};

export default function RecoveryFilesPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
        fetchRequests();
      }
    };
    checkAuth();
  }, [router]);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("recovery_requests")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setRequests(data);
    }
    setIsLoading(false);
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
        <header className="h-16 border-b border-white/5 flex items-center justify-between pl-16 pr-4 lg:px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <h1 className="font-headline font-bold text-lg lg:text-xl truncate">Recovery Case Files</h1>
          <div className="flex items-center gap-2 lg:gap-4">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2 text-[10px] font-bold uppercase">
              <Download className="w-3.5 h-3.5" /> Export
            </Button>
            <Button size="sm" className="gap-2 text-[10px] font-bold uppercase bg-primary text-primary-foreground">
              New Intake
            </Button>
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search records..." className="pl-9 h-10 bg-white/5 border-white/10" />
            </div>
            <div className="flex items-center justify-between w-full md:w-auto gap-2">
              <Button variant="outline" size="icon" className="h-10 w-10 border-white/10 shrink-0">
                <Filter className="w-4 h-4" />
              </Button>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none py-1.5 px-3 truncate">
                {requests.length} Active Files
              </Badge>
            </div>
          </div>

          <Card className="bg-card/50 border-white/5 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Case ID</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Client</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Assets</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((file) => {
                      const catInfo = categories[file.recovery_type] || { label: file.recovery_type, icon: FileText, color: "text-muted-foreground" };
                      return (
                        <TableRow 
                          key={file.id} 
                          className="border-white/5 hover:bg-white/5 group transition-colors cursor-pointer"
                          onClick={() => setSelectedCase(file)}
                        >
                          <TableCell className="font-mono text-[10px] font-bold text-primary uppercase">AH-{file.id.slice(0, 4)}</TableCell>
                          <TableCell className="text-sm font-medium">{file.full_name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <catInfo.icon className={cn("w-3.5 h-3.5", catInfo.color)} />
                              <span className="text-xs truncate max-w-[100px]">{catInfo.label}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm font-bold font-mono text-accent">${file.estimated_value}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[9px] border-white/10 uppercase tracking-tighter">
                              {file.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {requests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12 text-muted-foreground italic text-sm">
                          The laboratory intake database is currently empty.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={!!selectedCase} onOpenChange={(open) => !open && setSelectedCase(null)}>
        <DialogContent className="max-w-2xl bg-card border-white/10 text-foreground overflow-y-auto max-h-[90vh]">
          {selectedCase && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  Forensic File AH-{selectedCase.id.slice(0, 4)}
                </div>
                <DialogTitle className="text-2xl font-headline font-bold">
                  {selectedCase.full_name}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-4 text-xs font-mono text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(selectedCase.created_at).toLocaleString()}</span>
                  <span className="flex items-center gap-1 uppercase tracking-tighter bg-white/5 px-2 py-0.5 rounded border border-white/10">Status: {selectedCase.status}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-8 space-y-8">
                {/* Case Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground">Estimated Valuation</div>
                      <div className="text-lg font-bold font-mono text-accent">${selectedCase.estimated_value}</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {categories[selectedCase.recovery_type]?.icon ? (
                        <div className={categories[selectedCase.recovery_type].color}>
                          {(() => {
                            const Icon = categories[selectedCase.recovery_type].icon;
                            return <Icon className="w-5 h-5" />;
                          })()}
                        </div>
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground">Loss Category</div>
                      <div className="text-sm font-bold">{categories[selectedCase.recovery_type]?.label || selectedCase.recovery_type}</div>
                    </div>
                  </div>
                </div>

                {/* Contact Data */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                    <User className="w-3 h-3" /> Client Communication Channels
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/5">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium truncate">{selectedCase.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-white/5">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium">{selectedCase.phone}</span>
                    </div>
                  </div>
                </div>

                {/* The Message / Narrative */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                    <Activity className="w-3 h-3 text-accent" /> Forensic Narrative
                  </h4>
                  <div className="p-6 rounded-2xl bg-[#070B14] border border-white/10 shadow-inner group relative">
                    <div className="absolute top-4 right-4 opacity-20">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap font-body">
                      {selectedCase.message}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[10px] text-muted-foreground italic flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    Encrypted Case File | Swiss Lab Uplink Secure
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button onClick={() => setSelectedCase(null)} variant="secondary" className="flex-1 sm:flex-none">
                      Close File
                    </Button>
                    <Button className="flex-1 sm:flex-none bg-primary text-primary-foreground font-bold">
                      Begin Intelligence Tracing
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
