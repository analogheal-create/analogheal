
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  FileText, 
  Activity, 
  TrendingUp, 
  ShieldCheck,
  Search,
  ChevronRight,
  Loader2,
  Clock,
  User,
  Mail,
  Phone,
  Zap
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

const typeLabels: Record<string, string> = {
  investment: "Investment Scam",
  broker: "Bad Broker",
  trading: "Trading Scam",
  romance: "Romance Scam",
  loan: "Loan Scam",
  wallet: "Wallet Recovery",
  "crypto-assets": "Assets Recovery",
};

export default function AdminDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [stats, setStats] = useState({
    activeFiles: 0,
    totalRecovered: "$1.8M", 
    verifiedSignatures: 3842
  });
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
        fetchRecentRequests();
      }
    };
    checkAuth();
  }, [router]);

  const fetchRecentRequests = async () => {
    const { data, error, count } = await supabase
      .from("recovery_requests")
      .select("*", { count: 'exact' })
      .order("created_at", { ascending: false })
      .limit(5);
    
    if (!error && data) {
      setRequests(data);
      if (count !== null) setStats(prev => ({ ...prev, activeFiles: count }));
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
          <h1 className="font-headline font-bold text-lg lg:text-xl truncate">Operational Overview</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search forensic ID..." className="pl-9 h-9 w-48 lg:w-64 bg-white/5 border-white/10 text-xs" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] lg:text-[10px] font-bold text-green-500 uppercase tracking-wider">System Optimal</span>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">Live</Badge>
                </div>
                <div className="text-2xl font-bold">{stats.activeFiles}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Active Recovery Files</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <Badge variant="outline" className="text-[10px] border-accent/20 text-accent">94.2%</Badge>
                </div>
                <div className="text-2xl font-bold">{stats.totalRecovered}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Assets Reclaimed (Est)</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <Badge variant="outline" className="text-[10px] border-green-500/20 text-green-500">Secured</Badge>
                </div>
                <div className="text-2xl font-bold">{stats.verifiedSignatures}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Forensic Signatures Verified</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">Live</Badge>
                </div>
                <div className="text-2xl font-bold">24ms</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Lab Latency (Zürich-HQ)</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Requests Table */}
          <Card className="bg-card/50 border-white/5 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="font-headline text-lg">Recent Forensic Intake</CardTitle>
                <CardDescription className="text-xs">Latest recovery requests awaiting review.</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push('/admin/recovery-files')} className="h-8 text-[9px] lg:text-[10px] font-bold uppercase tracking-wider">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Forensic ID</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Client Name</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Loss Category</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow 
                        key={request.id} 
                        className="border-white/5 hover:bg-white/5 group transition-colors cursor-pointer"
                        onClick={() => setSelectedCase(request)}
                      >
                        <TableCell className="font-mono text-[10px] font-bold text-primary uppercase">AH-{request.id.slice(0, 4)}</TableCell>
                        <TableCell className="text-sm font-medium">{request.full_name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-white/5 text-[9px] lg:text-[10px] border-none">{typeLabels[request.recovery_type] || request.recovery_type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${request.status === 'Pending' ? 'bg-amber-500' : 'bg-green-500'} animate-pulse`} />
                            <span className="text-xs font-medium">{request.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {requests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-12 text-muted-foreground italic text-sm">No forensic intake files found.</TableCell>
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
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground">Loss Category</div>
                      <div className="text-sm font-bold">{typeLabels[selectedCase.recovery_type] || selectedCase.recovery_type}</div>
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
                    <Button onClick={() => setSelectedCase(null)} variant="secondary" className="w-full sm:w-auto">
                      Close File
                    </Button>
                    <Button className="w-full sm:w-auto bg-primary text-primary-foreground font-bold" onClick={() => router.push('/admin/recovery-files')}>
                      View Case Index
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
