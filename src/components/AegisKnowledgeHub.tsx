
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, Loader2, FileText, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { aiAnswerKnowledgeQuestion } from "@/ai/flows/ai-answer-knowledge-question";

const blogPosts = [
  {
    id: "blog-1",
    category: "Security",
    title: "How to Secure Your Assets Against Phishing",
    description: "Learn the latest tactics used by cybercriminals and how to protect your digital wealth from evolving threats.",
  },
  {
    id: "blog-2",
    category: "Recovery",
    title: "Top 5 Myths About Crypto Wallet Recovery",
    description: "Think your lost Bitcoin is gone forever? We debunk common misconceptions about blockchain forensics and recovery.",
  },
  {
    id: "blog-3",
    category: "Legal",
    title: "What to Do Immediately After Your Wallet is Hacked",
    description: "Time is of the essence. Follow our step-by-step emergency protocol to increase your chances of asset recovery.",
  },
];

export function AegisKnowledgeHub() {
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = async () => {
    if (!question) return;
    setIsLoading(true);
    setAiAnswer("");
    try {
      const result = await aiAnswerKnowledgeQuestion({
        question,
        contextArticles: blogPosts.map(p => p.description),
      });
      setAiAnswer(result.answer);
    } catch (error) {
      setAiAnswer("Sorry, I couldn't find an answer to that. Please contact our support team.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="blog" className="py-24 bg-white/[0.02]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          <div className="max-w-xl">
            <h2 className="text-3xl lg:text-5xl font-headline font-bold mb-6">Expert Knowledge Hub</h2>
            <p className="text-muted-foreground text-lg">
              Education is the best defense. Stay informed with our latest research, security guides, and recovery case studies.
            </p>
          </div>
          
          <div className="w-full lg:max-w-md p-6 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-primary font-bold mb-4">
              <Sparkles className="w-5 h-5" />
              Ask our AI Expert
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="How do I recover a lost Ledger?" 
                className="bg-background/50" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              />
              <Button size="icon" onClick={handleAskAI} disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
            {aiAnswer && (
              <div className="mt-4 p-4 rounded-lg bg-background/80 border border-white/5 text-sm animate-in fade-in slide-in-from-top-2">
                {aiAnswer}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => {
            const imageData = PlaceHolderImages.find((img) => img.id === post.id);
            const isValidImage = imageData?.imageUrl && imageData.imageUrl !== "";

            return (
              <Card key={post.id} className="bg-background border-white/10 overflow-hidden group hover:border-primary/50 transition-all">
                <div className="relative aspect-video overflow-hidden bg-card">
                  {isValidImage ? (
                    <Image
                      src={imageData.imageUrl}
                      alt={imageData.description || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={imageData.imageHint}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/5">
                      <FileText className="w-12 h-12 text-primary/20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-xs font-bold text-white">
                    {post.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-headline font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {post.description}
                  </p>
                  <button className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Button variant="outline" size="lg" className="px-8 h-12 font-semibold">
            Load More Articles
          </Button>
          <Button size="lg" asChild className="px-10 h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105">
            <Link href="#request">
              Check Your Case <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
