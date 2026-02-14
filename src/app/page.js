"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Bookmark, Share2, Zap, Shield, Globe, Layout } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <header className="container mx-auto px-6 py-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 font-bold text-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Bookmark size={18} fill="currentColor" />
            </div>
            SmartBookmark
          </motion.div>
          <motion.nav 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </motion.nav>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-6 pt-20 pb-32">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent pb-4">
              Organize your digital life <br />
              <span className="text-primary">with elegance.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The premium bookmark manager designed for modern creatives and developers. 
              Capture, organize, and share your inspiration seamlessly.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full shadow-xl shadow-primary/25">
                  Start for free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full backdrop-blur-sm bg-background/50">
                View Demo
              </Button>
            </motion.div>

            {/* Dashboard Preview Abstract */}
            <motion.div 
              variants={itemVariants}
              className="mt-20 relative mx-auto w-full max-w-5xl aspect-video rounded-2xl glass-card overflow-hidden border border-white/10 shadow-2xl"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20" />
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-light text-lg">
                 Dashboard Preview
               </div>
               
               {/* Decorative Elements */}
               <div className="absolute top-4 left-4 flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/50" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                 <div className="w-3 h-3 rounded-full bg-green-500/50" />
               </div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <section className="mt-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Crafted for perfection</h2>
              <p className="text-muted-foreground">Every detail obsessed over to provide the best experience.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Zap} 
                title="Lightning Fast" 
                description="Built on Next.js 16 for instant page loads and seamless interactions." 
              />
              <FeatureCard 
                icon={Layout} 
                title="Beautiful UI" 
                description="Glassmorphic design with carefully curated dark mode palettes." 
              />
              <FeatureCard 
                icon={Shield} 
                title="Secure by Default" 
                description="Enterprise-grade encryption for your personal data." 
              />
              <FeatureCard 
                icon={Globe} 
                title="Sync Anywhere" 
                description="Access your bookmarks from any device, anywhere in the world." 
              />
              <FeatureCard 
                icon={Share2} 
                title="Easy Sharing" 
                description="Share collections with teammates or publish them to the world." 
              />
              <FeatureCard 
                icon={Bookmark} 
                title="Smart Tags" 
                description="AI-powered auto-tagging to keep your library organized." 
              />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-background/50 backdrop-blur-md">
           <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sm text-muted-foreground">
                © 2026 SmartBookmark. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm font-medium text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card className="bg-background/50 backdrop-blur-sm hover:translate-y-[-5px] transition-transform duration-300 border-border/50">
      <CardContent className="p-6 space-y-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
