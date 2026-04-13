"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Camera, 
  Upload, 
  Loader2, 
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const assetTypes = [
  { key: "brand-logo", label: "Institutional Brand Logo", hint: "company logo" },
  { key: "expert-team", label: "Expert Team", hint: "cybersecurity forensics" },
  { key: "secure-ops", label: "Secure Operations Center", hint: "server security" },
  { key: "consultation", label: "Client Consultation", hint: "business meeting" },
];

export default function TrustAssetsPage() {
  const [user, setUser] = useState<any>(null);
  const [assets, setAssets] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
        fetchAssets();
      }
    };
    checkAuth();
  }, [router]);

  const fetchAssets = async () => {
    const { data, error } = await supabase
      .from("operational_proofs")
      .select("*");
    
    if (!error && data) {
      const assetMap = data.reduce((acc, curr) => ({ ...acc, [curr.asset_key]: curr }), {});
      setAssets(assetMap);
    }
    setIsLoading(false);
  };

  const handleFileUpload = async (key: string, label: string, file: File) => {
    if (!file) return;

    setUploadingKey(key);
    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${key}_${Date.now()}.${fileExt}`;
      const filePath = `operational/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('public-assets')
        .getPublicUrl(filePath);

      // 3. Upsert to Database
      const { error: dbError } = await supabase
        .from('operational_proofs')
        .upsert({
          asset_key: key,
          label: label,
          image_url: publicUrl
        }, { onConflict: 'asset_key' });

      if (dbError) throw dbError;

      toast({ title: "Asset Updated", description: `${label} image published successfully.` });
      fetchAssets();
    } catch (error: any) {
      toast({ title: "Upload Failed", description: error.message, variant: "destructive" });
    } finally {
      setUploadingKey(null);
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
          <h1 className="font-headline font-bold text-xl text-primary">Trust Assets Manager</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Institutional Proof Hub</span>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="max-w-4xl space-y-6">
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex gap-4 items-center">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <p className="text-xs text-muted-foreground">
                <strong>Attention:</strong> Updating these assets will immediately change the public Trust Strip and brand elements across the platform. Ensure all uploaded images meet AnalogHeal Forensic Lab's high-resolution institutional standards.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {assetTypes.map((type) => (
                <Card key={type.key} className="bg-card/50 border-white/5 overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-64 bg-black/20 relative aspect-video md:aspect-auto">
                      {assets[type.key] ? (
                        <div className="relative w-full h-full p-4 flex items-center justify-center bg-white/[0.02]">
                          <Image 
                            src={assets[type.key].image_url} 
                            alt={type.label} 
                            width={200}
                            height={200}
                            className="object-contain max-h-full"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                          <ImageIcon className="w-8 h-8 mb-2 opacity-20" />
                          <span className="text-[10px] uppercase font-bold tracking-widest">No Asset</span>
                        </div>
                      )}
                      {uploadingKey === type.key && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                          <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        </div>
                      )}
                    </div>
                    <CardContent className="flex-1 p-6 flex flex-col justify-between">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold font-headline">{type.label}</h3>
                          {assets[type.key] && (
                            <div className="flex items-center gap-1.5 text-green-500 text-[10px] font-bold uppercase">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Live
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {type.key === 'brand-logo' 
                            ? "Official institutional logo used in Navbar, Sidebar, and Login terminal." 
                            : "Identified as institutional proof node. Displays in the primary Trust Strip section."}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground">Replace Laboratory Evidence</Label>
                        <div className="flex items-center gap-4">
                          <Input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(type.key, type.label, file);
                            }}
                            className="bg-white/5 border-white/10 file:bg-primary file:text-primary-foreground file:font-bold file:rounded-md file:border-none file:text-[10px] file:px-4 file:mr-4 file:cursor-pointer h-10" 
                            disabled={!!uploadingKey}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
