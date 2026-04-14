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
  Menu
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
                        <TableRow key={file.id} className="border-white/5 hover:bg-white/5 group transition-colors">
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
    </div>
  );
}
