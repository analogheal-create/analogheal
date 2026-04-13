"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Trash2, 
  Upload, 
  Loader2, 
  BookOpen, 
  FileText,
  ShieldCheck,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function ArticlesManager() {
  const [user, setUser] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: ""
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
        fetchArticles();
      }
    };
    checkAuth();
  }, [router]);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error) {
      setArticles(data || []);
    }
    setIsLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !formData.title || !formData.category || !formData.description || !formData.content) {
      toast({ title: "Missing fields", description: "Please provide all details and an image.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `article_${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('public-assets')
        .getPublicUrl(filePath);

      // 3. Save to Database
      const { error: dbError } = await supabase
        .from('articles')
        .insert([{
          ...formData,
          image_url: publicUrl
        }]);

      if (dbError) throw dbError;

      toast({ title: "Article Published", description: "Knowledge Hub guide is now live." });
      setFormData({ title: "", category: "", description: "", content: "" });
      setFile(null);
      fetchArticles();
    } catch (error: any) {
      toast({ title: "Publish Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setArticles(articles.filter(a => a.id !== id));
      toast({ title: "Article Removed", description: "Record deleted from Knowledge Hub database." });
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
          <h1 className="font-headline font-bold text-xl text-primary">Knowledge Hub Manager</h1>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            Forensic Intelligence Node
          </div>
        </header>

        <div className="p-8 space-y-12">
          <Card className="bg-card/50 border-white/5 max-w-3xl">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" /> New Research Guide
              </CardTitle>
              <CardDescription>Publish technical security guides and recovery insights for the public.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">Title</Label>
                    <Input 
                      placeholder="e.g. How to Secure Your Assets..." 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="bg-white/5 border-white/10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold text-muted-foreground">Category</Label>
                    <Input 
                      placeholder="e.g. Security, Recovery, Legal" 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="bg-white/5 border-white/10" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Short Description</Label>
                  <Input 
                    placeholder="Brief summary for the card view..." 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-white/5 border-white/10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Full Content</Label>
                  <Textarea 
                    placeholder="Institutional-grade forensic insights..." 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="bg-white/5 border-white/10 min-h-[200px]" 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Cover Image</Label>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="bg-white/5 border-white/10 file:bg-primary file:text-primary-foreground file:font-bold file:rounded-md file:border-none file:text-[10px] file:px-4 file:mr-4 file:cursor-pointer" 
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground font-bold" disabled={isUploading}>
                  {isUploading ? "Publishing Intelligence..." : "Publish to Knowledge Hub"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-lg font-headline font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" /> Published Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="bg-card/30 border-white/5 overflow-hidden group">
                  <div className="relative aspect-video">
                    <Image 
                      src={article.image_url} 
                      alt={article.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="gap-2 font-bold uppercase text-[10px]"
                        onClick={() => handleDelete(article.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Purge Article
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest">
                      <Tag className="w-3 h-3" /> {article.category}
                    </div>
                    <div className="text-sm font-bold truncate">{article.title}</div>
                    <p className="text-[10px] text-muted-foreground line-clamp-2">{article.description}</p>
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