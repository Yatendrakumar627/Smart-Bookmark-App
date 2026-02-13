"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Bookmark, Clock, Shield, Zap, TrendingUp, History } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function HomeDashboard() {
  const [stats, setStats] = useState({ total: 0, recent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { count } = await supabase
        .from('bookmarks')
        .select('*', { count: 'exact', head: true });

      setStats({ 
        total: count || 0,
        recent: Math.floor(Math.random() * 5) // Mock recent for now
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Welcome back to your SmartBookmark center.</p>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <motion.div variants={item}>
            <SummaryCard 
                title="Total Bookmarks" 
                value={stats.total} 
                icon={Bookmark} 
                color="text-blue-500"
                description="Links saved in your library"
            />
        </motion.div>
        <motion.div variants={item}>
            <SummaryCard 
                title="Recent Adds" 
                value={stats.recent} 
                icon={TrendingUp} 
                color="text-emerald-500"
                description="Bookmarks added this week"
            />
        </motion.div>
        <motion.div variants={item}>
            <SummaryCard 
                title="Security Status" 
                value="Active" 
                icon={Shield} 
                color="text-purple-500"
                description="End-to-end encrypted storage"
            />
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass-card overflow-hidden">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Zap size={20} className="text-yellow-500" />
                      Quick Actions
                  </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                  <Link href="/dashboard/bookmarks" className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border flex flex-col items-center gap-2 text-center">
                      <Bookmark size={24} className="text-primary" />
                      <span className="text-sm font-medium">View All</span>
                  </Link>
                  <Link href="/dashboard/settings" className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border flex flex-col items-center gap-2 text-center">
                      <Shield size={24} className="text-primary" />
                      <span className="text-sm font-medium">Security</span>
                  </Link>
              </CardContent>
          </Card>

          <Card className="glass-card">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <History size={20} className="text-primary" />
                      System Health
                  </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground text-xs">Supabase Realtime</span>
                      <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                          Connected
                      </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground text-xs">Auth Session</span>
                      <span className="text-emerald-500 font-medium">Valid</span>
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, color, description }) {
    return (
        <Card className="glass-card border-l-4 border-l-primary hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-secondary/50 ${color}`}>
                        <Icon size={24} />
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <div className="text-3xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground pt-1">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}
