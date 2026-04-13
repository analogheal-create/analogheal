"use client";

import { useState, useEffect } from "react";
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
import { supabase } from "@/lib/supabase";
import { aiAnswerKnowledgeQuestion } from "@/ai/flows/ai-answer-knowledge-question";

const iconMap = {
  "Security": ShieldAlert,
  "Recovery": BookOpen,
  "Legal": Zap,
};

// Helper to render formatted text (bold and accent colors)
const TechnicalRenderer = ({ text }: { text: string }) => {
  if (!text) return null;

  // Split by double newlines for paragraphs first
  const paragraphs = text.split(/\n\n+/);

  return (
    <div className="space-y-4">
      {paragraphs.map((p, idx) => {
        // Convert literal \n to real line breaks if they exist
        const sanitizedP = p.replace(/\\n/g, '\n');
        
        // Split by lines within paragraph
        const lines = sanitizedP.split('\n');

        return (
          <p key={idx} className="text-base text-foreground/90 leading-relaxed">
            {lines.map((line, lIdx) => (
              <span key={lIdx}>
                {line.split(/(\*\*.*?\*\*|\[accent\].*?\[\/accent\])/).map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={pIdx} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
                  }
                  if (part.startsWith('[accent]') && part.endsWith('[/accent]')) {
                    return <span key={pIdx} className="text-accent font-bold">{part.slice(8, -9)}</span>;
                  }
                  return part;
                })}
                {lIdx < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export function AnalogKnowledgeHub() {
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setPosts(data);
      }
      setIsPostsLoading(false);
    };
    fetchPosts();
  }, []);

  const handleAskAI = async () => {
    if (!question) return;
    setIsLoading(true);
    setAiAnswer("");
    try {
      const result = await aiAnswerKnowledgeQuestion({
        question,
        contextArticles: posts.map(p => p.description),
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

        {isPostsLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {posts.map((post) => {
              const Icon = iconMap[post.category as keyof typeof iconMap] || BookOpen;
              return (
                <Card 
                  key={post.id} 
                  className="bg-background border-white/10 overflow-hidden group hover:border-accent/50 transition-all cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative aspect-video overflow-hidden bg-card">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
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
            {posts.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
                <p className="text-muted-foreground text-sm italic">Research nodes pending synchronization...</p>
              </div>
            )}
          </div>
        )}
        
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

      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl bg-card border-accent/20 text-foreground overflow-y-auto max-h-[90vh]">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest mb-2">
                  <BookOpen className="w-4 h-4" />
                  {selectedPost.category} Guidance
                </div>
                <DialogTitle className="text-2xl lg:text-3xl font-headline font-bold leading-tight">
                  {selectedPost.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base mt-2">
                  {selectedPost.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                <TechnicalRenderer text={selectedPost.content} />
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
