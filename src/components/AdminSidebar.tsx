"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Shield, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Activity,
  Image as ImageIcon,
  Camera,
  BookOpen,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "Secure session terminated.",
    });
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Recovery Files", href: "/admin/recovery-files", icon: FileText },
    { name: "Forensic Results", href: "/admin/forensic-results", icon: ImageIcon },
    { name: "Trust Assets", href: "/admin/trust-assets", icon: Camera },
    { name: "Knowledge Hub", href: "/admin/articles", icon: BookOpen },
    { name: "Case Studies", href: "/admin/case-studies", icon: Quote },
    { name: "Intelligence Logs", href: "/admin/intelligence-logs", icon: Activity },
    { name: "Client Database", href: "/admin/clients", icon: Users },
  ];

  return (
    <aside className="w-64 border-r border-white/5 bg-card/30 backdrop-blur-xl hidden lg:flex flex-col">
      <div className="p-6 border-b border-white/5">
        <Link href="/admin/dashboard" className="flex items-center gap-2 mb-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-headline font-bold text-lg">AnalogHeal</span>
        </Link>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Forensic Command
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            asChild
            className={cn(
              "w-full justify-start gap-3 transition-all",
              pathname === item.href 
                ? "bg-primary/10 text-primary shadow-sm" 
                : "text-muted-foreground hover:text-primary hover:bg-white/5"
            )}
          >
            <Link href={item.href}>
              <item.icon className="w-4 h-4" /> {item.name}
            </Link>
          </Button>
        ))}
        <div className="pt-4 mt-4 border-t border-white/5">
          <Button
            variant={pathname === "/admin/settings" ? "secondary" : "ghost"}
            asChild
            className={cn(
              "w-full justify-start gap-3 transition-all",
              pathname === "/admin/settings" 
                ? "bg-primary/10 text-primary shadow-sm" 
                : "text-muted-foreground hover:text-primary hover:bg-white/5"
            )}
          >
            <Link href="/admin/settings">
              <Settings className="w-4 h-4" /> Lab Settings
            </Link>
          </Button>
        </div>
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
            {userEmail?.[0] || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold truncate">{userEmail?.split('@')[0] || "Analyst"}</div>
            <div className="text-[9px] text-muted-foreground uppercase font-bold">Lead Analyst</div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}