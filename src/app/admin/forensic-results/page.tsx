"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Trash2, 
  Upload, 
  Loader2, 
  ImageIcon,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function ForensicResultsManager() {
  const [user, setUser] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    date: "",
    forensic_id: ""
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
        fetchResults();
      }
    };
    checkAuth();
  }, [router]);

  const fetchResults = async () => {
    const { data, error } = await supabase
      .from("forensic_results")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error) {
      setResults(data || []);
    }
    setIsLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !formData.label || !formData.date) {
      toast({ title: "Missing fields", description: "Please provide all details and an image.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `results/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('public-assets')
        .getPublicUrl(filePath);

      // 3. Save metadata to Database
      const { error: dbError } = await supabase
        .from('forensic_results')
        .insert([{
          label: formData.label,
          date: formData.date,
          forensic_id: formData.forensic_id || `#${Math.floor(Math.random() * 900) + 100}`,
          image_url: publicUrl
        }]);

      if (dbError) throw dbError;

      toast({ title: "Result Added", description: "Forensic proof has been successfully published." });
      setFormData({ label: "", date: "", forensic_id: "" });
      setFile(null);
      fetchResults();
    } catch (error: any) {
      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      // Delete from DB
      const { error: dbError } = await supabase
        .from('forensic_results')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      // Optionally delete from storage (if needed, would require parsing fileName from imageUrl)
      
      setResults(results.filter(r => r.id !== id));
      toast({ title: "Result Removed", description: "Forensic record deleted from database." });
    } catch (error: any) {
      toast({ title: "Delete Failed", description: error.message, variant: "destructive" });
    }
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
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10">
          <h1 className="font-headline font-bold text-xl text-primary">Forensic Results Manager</h1>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            Authorized Storage Access
          </div>
        </header>

        <div className="p-8 space-y-12">
          {/* New Result Form */}
          <Card className="bg-card/50 border-white/5 max-w-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" /> New Forensic Proof
              </CardTitle>
              <CardDescription>Upload authenticated recovery screenshots for public validation.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">Case Label</Label>
                    <Input 
                      placeholder="e.g. Forensic Reclamation - $1.2M" 
                      value={formData.label}
                      onChange={(e) => setFormData({...formData, label: e.target.value})}
                      className="bg-white/5 border-white/10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">Verification Date</Label>
                    <Input 
                      placeholder="e.g. Nov 25" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="bg-white/5 border-white/10" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Forensic ID (Optional)</Label>
                  <Input 
                    placeholder="e.g. #882-01" 
                    value={formData.forensic_id}
                    onChange={(e) => setFormData({...formData, forensic_id: e.target.value})}
                    className="bg-white/5 border-white/10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Authenticated Evidence (Image)</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="bg-white/5 border-white/10 file:bg-primary file:text-primary-foreground file:font-bold file:rounded-md file:border-none file:text-[10px] file:px-4 file:mr-4 file:cursor-pointer" 
                    />
                    {isUploading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground font-bold" disabled={isUploading}>
                  {isUploading ? "Processing Evidence..." : "Publish to Forensic Layer"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Results List */}
          <div className="space-y-6">
            <h2 className="text-lg font-headline font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" /> Active Proof Nodes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => (
                <Card key={result.id} className="bg-card/30 border-white/5 overflow-hidden group">
                  <div className="relative aspect-video">
                    <Image 
                      src={result.image_url} 
                      alt={result.label} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="gap-2 font-bold uppercase text-[10px]"
                        onClick={() => handleDelete(result.id, result.image_url)}
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Purge Record
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold truncate">{result.label}</div>
                      <div className="text-[10px] font-mono font-bold text-primary">{result.forensic_id}</div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold">
                      <Calendar className="w-3 h-3" /> {result.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {results.length === 0 && (
                <div className="col-span-full p-12 text-center rounded-3xl border border-dashed border-white/10 bg-white/5">
                  <ImageIcon className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-muted-foreground text-sm">No forensic results found in database.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}