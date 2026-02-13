"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, [supabase]);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account information.</p>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center gap-4 py-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-background shadow-xl">
               {user?.email?.[0].toUpperCase() || '?'}
            </div>
            <div>
                <CardTitle className="text-2xl">{user?.email?.split('@')[0] || 'User'}</CardTitle>
                <p className="text-muted-foreground">{user?.email}</p>
            </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 border-t border-border">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-secondary/50 text-primary">
                    <Mail size={20} />
                </div>
                <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email Address</p>
                    <p className="font-medium">{user?.email}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-secondary/50 text-emerald-500">
                    <Shield size={20} />
                </div>
                <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Account Security</p>
                    <p className="font-medium">Verified via Google</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-secondary/50 text-blue-500">
                    <Calendar size={20} />
                </div>
                <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Member Since</p>
                    <p className="font-medium">{new Date(user?.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
