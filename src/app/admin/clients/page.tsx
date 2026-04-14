"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  Search, 
  Mail, 
  Phone, 
  MoreHorizontal,
  Loader2,
  UserPlus,
  ShieldCheck,
  Briefcase,
  History
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

export default function ClientsPage() {
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
          <h1 className="font-headline font-bold text-lg lg:text-xl truncate">Client Database</h1>
          <Button size="sm" className="gap-2 text-[10px] font-bold uppercase bg-primary text-primary-foreground">
            <UserPlus className="w-3.5 h-3.5" /> Register
          </Button>
        </header>

        <div className="p-4 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">Active</Badge>
                </div>
                <div className="text-2xl font-bold">1,204</div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Institutional</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-accent/20 text-accent">Corporate</Badge>
                </div>
                <div className="text-2xl font-bold">84</div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Managed Accounts</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                    <History className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-green-500/20 text-green-500">Global</Badge>
                </div>
                <div className="text-2xl font-bold">3,800+</div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Total Recoveries</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 border-white/5 overflow-hidden">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="font-headline text-lg">Managed Profiles</CardTitle>
                <CardDescription className="text-xs">Confidential client records with verified identity trails.</CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input placeholder="Search records..." className="pl-9 h-9 w-full bg-white/5 border-white/10 text-xs" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Client Name</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Account Type</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Verified</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Reclaimed</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "David K.", type: "Private", verified: true, total: "$42,500" },
                      { name: "Sarah M.", type: "Premium", verified: true, total: "$12,800" },
                      { name: "Blockchain Corp", type: "Institutional", verified: true, total: "$1,450,000" },
                      { name: "James L.", type: "Standard", verified: false, total: "$3,400" },
                    ].map((client) => (
                      <TableRow key={client.name} className="border-white/5 hover:bg-white/5 group transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-[10px]">
                              {client.name[0]}
                            </div>
                            <span className="text-sm font-medium">{client.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[9px] border-white/10 uppercase font-bold tracking-widest">
                            {client.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {client.verified ? (
                            <div className="flex items-center gap-1.5 text-green-500 font-bold text-[9px] lg:text-[10px] uppercase">
                              <ShieldCheck className="w-3.5 h-3.5" /> Secured
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-[9px] lg:text-[10px] uppercase font-bold">Pending</span>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm font-bold text-primary">{client.total}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
