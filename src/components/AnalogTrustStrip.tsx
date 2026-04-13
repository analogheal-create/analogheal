"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Shield, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const defaultTrustItems = [
  { id: "expert-team", asset_key: "expert-team", label: "Expert Lab Operations", placeholderId: "team-working" },
  { id: "secure-ops", asset_key: "secure-ops", label: "Encrypted Infrastructure", placeholderId: "secure-server" },
  { id: "consultation", asset_key: "consultation", label: "Confidential Consultation", placeholderId: "client-consultation" },
];

export function AnalogTrustStrip() {
  const [assets, setAssets] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      const { data, error } = await supabase
        .from("operational_proofs")
        .select("asset_key, image_url");
      
      if (!error && data) {
        const assetMap = data.reduce((acc, curr) => ({ ...acc, [curr.asset_key]: curr.image_url }), {});
        setAssets(assetMap);
      }
      setIsLoading(false);
    };
    fetchAssets();
  }, []);

  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {defaultTrustItems.map((item) => {
            const liveImageUrl = assets[item.asset_key];
            const placeholderData = PlaceHolderImages.find((img) => img.id === item.placeholderId);
            const finalImageUrl = liveImageUrl || placeholderData?.imageUrl;
            const finalLabel = item.label;

            return (
              <div key={item.id} className="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-card">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-primary/20 animate-spin" />
                  </div>
                ) : finalImageUrl ? (
                  <Image
                    src={finalImageUrl}
                    alt={finalLabel}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={placeholderData?.imageHint || "forensics"}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <Shield className="w-12 h-12 text-primary/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-lg font-headline font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {finalLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}