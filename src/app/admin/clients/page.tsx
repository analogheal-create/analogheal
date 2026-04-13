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
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <h1 className="font-headline font-bold text-xl">Client Database</h1>
          <Button size="sm" className="gap-2 text-[10px] font-bold uppercase bg-primary text-primary-foreground">
            <UserPlus className="w-3.5 h-3.5" /> Register Client
          </Button>
        </header>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">Active</Badge>
                </div>
                <div className="text-3xl font-bold">1,204</div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Institutional Clients</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-white/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-accent/20 text-accent">High Value</Badge>
                </div>
                <div className="text-3xl font-bold">84</div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Corporate Accounts</p>
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
                <div className="text-3xl font-bold">3,800+</div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Historical Recoveries</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 border-white/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-lg">Managed Profiles</CardTitle>
                <CardDescription>Confidential client records with verified identity trails.</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input placeholder="Search records..." className="pl-9 h-9 w-64 bg-white/5 border-white/10 text-xs" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Client Name</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Contact</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Account Type</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Verified ID</TableHead>
                    <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Reclaimed</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "David K.", email: "dk***@private.io", type: "Private Individual", verified: true, total: "$42,500" },
                    { name: "Sarah M.", email: "sm***@proton.me", type: "Premium Recovery", verified: true, total: "$12,800" },
                    { name: "Blockchain Corp", email: "forensics@bcc.net", type: "Institutional", verified: true, total: "$1,450,000" },
                    { name: "James L.", email: "jl***@icloud.com", type: "Standard", verified: false, total: "$3,400" },
                  ].map((client) => (
                    <TableRow key={client.email} className="border-white/5 hover:bg-white/5 group transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-[10px]">
                            {client.name[0]}
                          </div>
                          <span className="text-sm font-medium">{client.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-[10px] flex items-center gap-1.5 text-muted-foreground">
                            <Mail className="w-3 h-3" /> {client.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[9px] border-white/10 uppercase font-bold tracking-widest">
                          {client.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {client.verified ? (
                          <div className="flex items-center gap-1.5 text-green-500 font-bold text-[10px] uppercase">
                            <ShieldCheck className="w-3.5 h-3.5" /> KYC Secured
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-[10px] uppercase font-bold">Pending</span>
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
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
