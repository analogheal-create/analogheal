"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Sparkles, Loader2, FileText, ShieldCheck, BookOpen, ShieldAlert, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { aiAnswerKnowledgeQuestion } from "@/ai/flows/ai-answer-knowledge-question";

const blogPosts = [
  {
    id: "blog-1",
    category: "Security",
    title: "How to Secure Your Assets Against Phishing",
    description: "Learn the latest tactics used by cybercriminals and how to protect your digital wealth from evolving threats.",
    content: "Phishing is the most common way digital assets are lost. Criminals create perfect replicas of popular wallets like MetaMask or exchanges like Coinbase. They trick you into entering your 12 or 24-word seed phrase. Once they have this, they can recreate your wallet and drain your funds instantly.\n\nTo stay safe:\n\n1. **Never** type your seed phrase into any website or digital document. Your seed phrase is only for physical backup.\n2. **Verify URLs**: Always bookmark your primary crypto sites to avoid clicking fake search engine ads that lead to clones.\n3. **Use a Hardware Wallet**: For large amounts of capital, hardware wallets like Ledger or Trezor keep your keys offline. This means even if a hacker compromises your computer, they cannot move funds without physical confirmation on the device.",
    icon: ShieldAlert
  },
  {
    id: "blog-2",
    category: "Recovery",
    title: "Top 5 Myths About Crypto Wallet Recovery",
    description: "Think your lost Bitcoin is gone forever? We debunk common misconceptions about blockchain forensics and recovery.",
    content: "Many people believe that once crypto is gone, it's gone forever. While the blockchain is immutable, the human element behind it can be traced. Here are 5 myths debunked:\n\n1. **'Hackers are ghosts'**: False. Most hackers eventually move funds to a centralized exchange to cash out. These exchanges have KYC (Know Your Customer) records that lead to real identities.\n2. **'Law enforcement can't help'**: Specialized cybercrime units are growing rapidly and frequently cooperate with private forensic firms to freeze stolen assets.\n3. 'Privacy mixers make it impossible': While difficult, advanced 'heuristic analysis' can often see through mixers to identify the final destination of funds.\n4. **'Forgotten passwords mean total loss'**: In cases of device failure or forgotten passwords, professional brute-forcing on secure GPU clusters can often reclaim access.\n5. **'Every recovery service is a scam'**: While the industry has bad actors, certified firms provide legal contracts, transparent probability reports, and real results.",
    icon: BookOpen
  },
  {
    id: "blog-3",
    category: "Legal",
    title: "What to Do Immediately After Your Wallet is Hacked",
    description: "Time is of the essence. Follow our step-by-step emergency protocol to increase your chances of asset recovery.",
    content: "If you notice unauthorized transactions, every second counts. Follow this institutional-grade emergency protocol:\n\n1. **ISOLATE**: Immediately disconnect your computer and phone from the internet. The hacker may still have an active remote session on your device.\n2. **AUDIT**: Use a block explorer (like Etherscan or Blockchain.com) on a clean device to find the Transaction IDs (TXIDs) of the theft.\n3. **REPORT**: If the funds moved to a centralized exchange (like Binance or Kraken), contact their emergency compliance team immediately to request an asset freeze.\n4. **PRESERVE**: Do not wipe your device. It may contain forensic 'footprints' or metadata that can help identify the attacker.\n5. **ACT**: Contact a professional recovery specialist to begin a technical trace. Acting within the first 24-48 hours dramatically increases the probability of a successful asset freeze.",
    icon: Zap
  },
];

export function AnalogKnowledgeHub() {
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

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
          
          <div className="w-full lg:max-w-md p-6 rounded-2xl bg-accent/5 border border-accent/20 backdrop-blur-sm glow-intelligence">
            <div className="flex items-center gap-2 text-accent font-bold mb-4">
              <Sparkles className="w-5 h-5" />
              Ask our AI Expert
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="How do I recover a lost Ledger?" 
                className="bg-background/50 border-accent/20 focus:border-accent" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              />
              <Button size="icon" onClick={handleAskAI} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
            {aiAnswer && (
              <div className="mt-4 p-4 rounded-lg bg-background/80 border border-accent/10 text-sm animate-in fade-in slide-in-from-top-2 text-foreground/90 leading-relaxed">
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
              <Card 
                key={post.id} 
                className="bg-background border-white/10 overflow-hidden group hover:border-accent/50 transition-all cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
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
                    <div className="w-full h-full flex items-center justify-center bg-accent/5">
                      <FileText className="w-12 h-12 text-accent/20" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {post.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-headline font-bold mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">
                    {post.description}
                  </p>
                  <button className="flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all">
                    Read article <ArrowRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Button variant="outline" size="lg" className="px-8 h-12 font-semibold border-white/10 hover:border-accent/50">
            Load More Articles
          </Button>
          <Button size="lg" asChild className="px-10 h-14 text-lg font-bold bg-primary hover:bg-primary/90 btn-glow-action">
            <Link href="#request">
              Check Your Case <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl bg-card border-accent/20 text-foreground overflow-y-auto max-h-[90vh]">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest mb-2">
                  <selectedPost.icon className="w-4 h-4" />
                  {selectedPost.category} Guidance
                </div>
                <DialogTitle className="text-2xl lg:text-3xl font-headline font-bold leading-tight">
                  {selectedPost.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base mt-2">
                  {selectedPost.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {selectedPost.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-base text-foreground/90">
                    {paragraph.split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-accent">{part}</strong> : part
                    )}
                  </p>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Verified Forensic Insight
                </div>
                <Button onClick={() => setSelectedPost(null)} variant="secondary" className="w-full sm:w-auto">
                  Close Article
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}