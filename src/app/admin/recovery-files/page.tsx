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
  Landmark
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

const categories = {
  "Fraudulent Scam": { icon: ShieldAlert, color: "text-red-400" },
  "Hardware Lockout": { icon: Key, color: "text-amber-400" },
  "Compromised Account": { icon: Zap, color: "text-primary" },
  "Exchange Dispute": { icon: Landmark, color: "text-accent" },
};

export default function RecoveryFilesPage() {
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
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <h1 className="font-headline font-bold text-xl">Recovery Case Files</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2 text-[10px] font-bold uppercase">
              <Download className="w-3.5 h-3.5" /> Export DB
            </Button>
            <Button size="sm" className="gap-2 text-[10px] font-bold uppercase bg-primary text-primary-foreground">
              New Intake Case
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name, ID, or wallet address..." className="pl-9 h-10 bg-white/5 border-white/10" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-10 w-10 border-white/10">
                <Filter className="w-4 h-4" />
              </Button>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none py-1.5 px-3">
                142 Active Files
              </Badge>
            </div>
          </div>

          <Card className="bg-card/50 border-white/5">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Case ID</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Client</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Category</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Assets</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Prob. Rate</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "AH-4921", name: "David K.", category: "Fraudulent Scam", value: "$42,500", prob: "84%", status: "Analyzing" },
                    { id: "AH-4920", name: "Sarah M.", category: "Hardware Lockout", value: "$12,800", prob: "62%", status: "Tracing" },
                    { id: "AH-4919", name: "Blockchain Corp", category: "Compromised Account", value: "$210,000", prob: "91%", status: "Freezing" },
                    { id: "AH-4918", name: "James L.", category: "Exchange Dispute", value: "$3,400", prob: "45%", status: "Pending" },
                    { id: "AH-4917", name: "Elena R.", category: "Fraudulent Scam", value: "$8,200", prob: "78%", status: "Legal Review" },
                    { id: "AH-4916", name: "Robert P.", category: "Hardware Lockout", value: "$145,000", prob: "55%", status: "GPU Queue" },
                  ].map((file) => {
                    const Cat = categories[file.category as keyof typeof categories];
                    return (
                      <TableRow key={file.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                        <TableCell className="font-mono text-[10px] font-bold text-primary">{file.id}</TableCell>
                        <TableCell className="text-sm font-medium">{file.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Cat.icon className={cn("w-3.5 h-3.5", Cat.color)} />
                            <span className="text-xs">{file.category}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-bold font-mono text-accent">{file.value}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-12 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: file.prob }} />
                            </div>
                            <span className="text-[10px] font-bold">{file.prob}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] border-white/10 uppercase tracking-tighter">
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
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
