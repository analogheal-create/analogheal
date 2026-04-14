"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Trash2, 
  Loader2, 
  Quote, 
  Star, 
  TrendingUp, 
  ShieldCheck, 
  Zap,
  Edit2,
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";

export default function CaseStudiesManager() {
  const [user, setUser] = useState<any>(null);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    title: "",
    result: "",
    metrics: "",
    quote: "",
    case_id: "",
    icon_type: "trending"
  });
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
        fetchCaseStudies();
      }
    };
    checkAuth();
  }, [router]);

  const fetchCaseStudies = async () => {
    const { data, error } = await supabase
      .from("case_studies")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error) {
      setCaseStudies(data || []);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.quote) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from('case_studies')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: "Case Study Updated", description: "Record has been successfully synchronized." });
      } else {
        const { error } = await supabase
          .from('case_studies')
          .insert([formData]);
        if (error) throw error;
        toast({ title: "Case Study Added", description: "New recovery result is now live." });
      }

      setFormData({
        name: "",
        role: "",
        title: "",
        result: "",
        metrics: "",
        quote: "",
        case_id: "",
        icon_type: "trending"
      });
      setEditingId(null);
      fetchCaseStudies();
    } catch (error: any) {
      toast({ title: "Operation Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (study: any) => {
    setEditingId(study.id);
    setFormData({
      name: study.name,
      role: study.role,
      title: study.title,
      result: study.result,
      metrics: study.metrics,
      quote: study.quote,
      case_id: study.case_id,
      icon_type: study.icon_type
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCaseStudies(caseStudies.filter(s => s.id !== id));
      toast({ title: "Case Study Removed", description: "Record purged from forensic database." });
    } catch (error: any) {
      toast({ title: "Delete Failed", description: error.message, variant: "destructive" });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      title: "",
      result: "",
      metrics: "",
      quote: "",
      case_id: "",
      icon_type: "trending"
    });
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
          <h1 className="font-headline font-bold text-lg lg:text-xl truncate text-primary">Proven Recovery Results</h1>
          <div className="hidden sm:block text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            Case Management
          </div>
        </header>

        <div className="p-4 lg:p-8 space-y-12">
          <Card className="bg-card/50 border-white/5 max-w-3xl">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                {editingId ? <Edit2 className="w-4 h-4 text-primary" /> : <Plus className="w-4 h-4 text-primary" />}
                {editingId ? "Modify Case Study" : "New Recovery Result"}
              </CardTitle>
              <CardDescription className="text-xs">Document successful asset reclamation stories for public verification.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Client Name</Label>
                    <Input placeholder="Client Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Client Role</Label>
                    <Input placeholder="Role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Case Title</Label>
                    <Input placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Case ID</Label>
                    <Input placeholder="#ID" value={formData.case_id} onChange={(e) => setFormData({...formData, case_id: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Recovery Result</Label>
                    <Input placeholder="Result" value={formData.result} onChange={(e) => setFormData({...formData, result: e.target.value})} className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Icon Type</Label>
                    <Select value={formData.icon_type} onValueChange={(val) => setFormData({...formData, icon_type: val})}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trending">Trending (Growth)</SelectItem>
                        <SelectItem value="shield">Shield (Security)</SelectItem>
                        <SelectItem value="zap">Zap (Speed/Tech)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">Methods / Metrics</Label>
                  <Input placeholder="Tracing methods..." value={formData.metrics} onChange={(e) => setFormData({...formData, metrics: e.target.value})} className="bg-white/5 border-white/10" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold text-muted-foreground">Client Quote</Label>
                  <Textarea placeholder="Testimonial..." value={formData.quote} onChange={(e) => setFormData({...formData, quote: e.target.value})} className="bg-white/5 border-white/10 min-h-[100px]" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" className="flex-1 bg-primary text-primary-foreground font-bold" disabled={isSaving}>
                    {isSaving ? "Saving..." : editingId ? "Update Result" : "Publish Result"}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={cancelEdit} className="gap-2">
                      <X className="w-4 h-4" /> Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-lg font-headline font-bold flex items-center gap-2">
              <Quote className="w-5 h-5 text-accent" /> Published Case Studies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((study) => (
                <Card key={study.id} className="bg-card/30 border-white/5 group relative">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-90 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => handleEdit(study)}>
                      <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(study.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-primary/10 text-primary">
                        {study.icon_type === 'trending' ? <TrendingUp className="w-4 h-4" /> : 
                         study.icon_type === 'shield' ? <ShieldCheck className="w-4 h-4" /> : 
                         <Zap className="w-4 h-4" />}
                      </div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Case {study.case_id}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-sm leading-tight">{study.title}</div>
                      <div className="text-[10px] text-accent font-bold uppercase tracking-wide flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> {study.result}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground italic line-clamp-3">"{study.quote}"</p>
                    <div className="pt-4 border-t border-white/5">
                      <div className="text-xs font-bold">{study.name}</div>
                      <div className="text-[9px] text-muted-foreground uppercase font-bold">{study.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
