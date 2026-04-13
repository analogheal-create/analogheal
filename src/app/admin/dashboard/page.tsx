"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Shield, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Activity, 
  TrendingUp, 
  ShieldCheck,
  Search,
  ChevronRight,
  MoreVertical,
  Loader2
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
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboardPage() {
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "Secure session terminated.",
    });
    router.push("/admin/login");
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
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-card/30 backdrop-blur-xl hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-headline font-bold text-lg">AnalogHeal</span>
          </div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Forensic Command
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start gap-3 bg-primary/10 text-primary">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary">
            <FileText className="w-4 h-4" /> Recovery Files
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary">
            <Activity className="w-4 h-4" /> Intelligence Logs
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary">
            <Users className="w-4 h-4" /> Client Database
          </Button>
          <div className="pt-4 mt-4 border-t border-white/5">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary">
              <Settings className="w-4 h-4" /> Lab Settings
            </Button>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold truncate">{user?.email?.split('@')[0]}</div>
              <div className="text-[9px] text-muted-foreground uppercase font-bold">Lead Analyst</div>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <h1 className="font-headline font-bold text-xl">Operational Overview</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search forensic ID..." className="pl-9 h-9 w-64 bg-white/5 border-white/10 text-xs" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">System Optimal</span>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">+12%</Badge>
                </div>
                <div className="text-2xl font-bold">142</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Active Recovery Files</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <Badge variant="outline" className="text-[10px] border-accent/20 text-accent">94.2%</Badge>
                </div>
                <div className="text-2xl font-bold">$1.8M</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Assets Reclaimed (MoM)</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <Badge variant="outline" className="text-[10px] border-green-500/20 text-green-500">Secured</Badge>
                </div>
                <div className="text-2xl font-bold">3,842</div>
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
          <Card className="bg-card/50 border-white/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-lg">Recent Forensic Intake</CardTitle>
                <CardDescription>Latest recovery requests awaiting analyst review.</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-wider">View All Files</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Forensic ID</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Client Name</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Loss Category</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Estimated Value</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "AH-4921", name: "David K.", category: "Fraudulent Scam", value: "$42,500", status: "Pending" },
                    { id: "AH-4920", name: "Sarah M.", category: "Hardware Lockout", value: "$12,800", status: "Assigned" },
                    { id: "AH-4919", name: "Blockchain Corp", category: "Compromised Account", value: "$210,000", status: "In Progress" },
                    { id: "AH-4918", name: "James L.", category: "Exchange Dispute", value: "$3,400", status: "Pending" },
                  ].map((request) => (
                    <TableRow key={request.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                      <TableCell className="font-mono text-[10px] font-bold text-primary">{request.id}</TableCell>
                      <TableCell className="text-sm font-medium">{request.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-white/5 text-[10px] border-none">{request.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm font-bold font-mono text-accent">{request.value}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${request.status === 'Pending' ? 'bg-amber-500' : request.status === 'Assigned' ? 'bg-blue-500' : 'bg-green-500'} animate-pulse`} />
                          <span className="text-xs font-medium">{request.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Infrastructure Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Laboratory Load</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Zürich Node (Main)", load: 65, color: "bg-primary" },
                    { label: "Singapore Relay", load: 42, color: "bg-accent" },
                    { label: "New York Forensic Cluster", load: 88, color: "bg-amber-500" },
                  ].map((node) => (
                    <div key={node.label} className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                        <span>{node.label}</span>
                        <span>{node.load}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${node.color} transition-all duration-500`} style={{ width: `${node.load}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Security Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex gap-3">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <span className="font-bold">System integrity verified.</span> All Swiss-based storage nodes report nominal performance.
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 flex gap-3">
                  <Activity className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <span className="font-bold">Heuristic match detected.</span> Potential link found between file AH-4921 and known mixer pattern.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
