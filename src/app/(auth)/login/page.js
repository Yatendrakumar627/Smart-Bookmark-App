"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Bookmark, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useState, useEffect, Suspense } from 'react';
import { Input } from '@/components/ui/Input';
import { useRouter, useSearchParams } from 'next/navigation';


function LoginContent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg) setMessage(msg);
  }, [searchParams]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Error signing in:', error.message);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md relative z-10"
    >
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
            <Bookmark size={24} fill="currentColor" />
          </div>
          SmartBookmark
        </Link>
        <p className="text-muted-foreground">Welcome! Sign in with Google to continue.</p>
      </div>

      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-center">Log in to your account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {message && (
            <p className="text-sm text-emerald-500 bg-emerald-500/10 p-3 rounded-lg text-center">
              {message}
            </p>
          )}

          <Button 
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-14 gap-3 text-lg shadow-xl shadow-primary/20 rounded-xl"
          >
            <Mail size={22} />
            Continue with Google
          </Button>

          <p className="text-xs text-center text-muted-foreground px-4">
            By continuing, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary transition-colors">Terms</a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary transition-colors">Privacy</a>.
          </p>
        </CardContent>
      </Card>

      <p className="text-center mt-8 text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary font-semibold hover:underline">
          Sign up now
        </Link>
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px]" />

      <Suspense fallback={
        <div className="w-full max-w-md text-center p-8 glass-card border-white/10 rounded-2xl">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-10 bg-primary/20 rounded-xl mx-auto" />
            <div className="h-8 bg-white/5 rounded-lg w-3/4 mx-auto" />
            <div className="h-4 bg-white/5 rounded-lg w-1/2 mx-auto" />
            <div className="h-48 bg-white/5 rounded-xl w-full" />
          </div>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
}
