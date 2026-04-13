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
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminDashboardPage() {
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
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
        </div>
      </main>
    </div>
  );
}
