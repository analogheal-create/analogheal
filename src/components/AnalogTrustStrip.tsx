"use client";

import Image from "next/image";
import { Shield } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const trustItems = [
  { id: "team-working", label: "Expert Lab Operations" },
  { id: "secure-server", label: "Encrypted Infrastructure" },
  { id: "client-consultation", label: "Confidential Consultation" },
];

export function AnalogTrustStrip() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item) => {
            const imageData = PlaceHolderImages.find((img) => img.id === item.id);
            const isValidImage = imageData?.imageUrl && imageData.imageUrl !== "";

            return (
              <div key={item.id} className="relative group overflow-hidden rounded-2xl aspect-[4/3] bg-card">
                {isValidImage ? (
                  <Image
                    src={imageData.imageUrl}
                    alt={imageData.description || item.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={imageData.imageHint}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <Shield className="w-12 h-12 text-primary/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-lg font-headline font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.label}
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
