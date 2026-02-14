"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useDashboard } from '@/context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Bell, Shield, Cpu, Zap, Box, Moon, Sun } from 'lucide-react';

export default function SettingsPage() {
  const { theme, toggleTheme, glassIntensity, updateGlass } = useDashboard();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setIsSyncing(true);
    const timer = setTimeout(() => setIsSyncing(false), 1000);
    return () => clearTimeout(timer);
  }, [theme, glassIntensity]);

  return (
    <div className="space-y-8 max-w-4xl pb-10">
      <div className="flex items-end justify-between border-b border-primary/20 pb-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase italic px-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            System Config
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
              Terminal Access / v1.0.4-STABLE
            </p>
            <AnimatePresence>
              {isSyncing && (
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-accent font-bold font-mono animate-pulse"
                >
                  // SYNCING_CHANGES...
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex gap-2 h-2 items-center">
            <div className="w-8 h-1 bg-primary animate-pulse" />
            <div className="w-4 h-1 bg-accent" />
            <div className="w-12 h-1 bg-primary/20" />
        </div>
      </div>

      <div className="grid gap-8">
          <Card className="glass-card overflow-hidden border-primary/20 shadow-[0_0_30px_rgba(56,189,248,0.05)]">
              <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-10">
                <Cpu size={120} className="text-primary" />
              </div>

              <CardHeader className="bg-primary/5 border-b border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <CardTitle className="flex items-center gap-3 text-primary text-sm font-mono tracking-widest uppercase">
                      <Palette size={18} className="animate-spin-slow" />
                      Visual Interface Layers
                  </CardTitle>
              </CardHeader>
              
              <CardContent className="p-8 space-y-10 relative">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                      <div>
                          <p className="font-bold text-xl text-foreground flex items-center gap-2">
                            Dark Protocol
                            <Zap size={14} className="text-accent fill-accent animate-pulse" />
                          </p>
                          <p className="text-sm text-muted-foreground font-sans mt-1">
                            {theme === 'dark' ? 'Optimum performance environment active' : 'Standard illumination mode engaged'}
                          </p>
                      </div>
                      
                      {/* Advanced Cyber Toggle */}
                      <div 
                        onClick={toggleTheme}
                        className={`relative w-20 h-10 rounded-sm cursor-pointer border-2 transition-all duration-300 p-1 flex items-center ${
                          theme === 'dark' 
                            ? 'border-primary shadow-[0_0_15px_rgba(56,189,248,0.2)] bg-primary/5' 
                            : 'border-slate-300 bg-slate-100'
                        }`}
                      >
                         <motion.div
                           layout
                           className={`h-full aspect-square rounded-sm flex items-center justify-center shadow-lg ${
                             theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-white text-slate-400'
                           }`}
                         >
                           {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                         </motion.div>
                         <div className="flex-1 flex justify-center text-[10px] font-mono font-black uppercase tracking-tighter opacity-50 px-2">
                           {theme === 'dark' ? 'ON' : 'OFF'}
                         </div>
                         {/* Scanning lines on top when ON */}
                         {theme === 'dark' && (
                           <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-sm">
                             <div className="w-full h-[1px] bg-accent/30 absolute animate-scan" />
                           </div>
                         )}
                      </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                      <div>
                          <p className="font-bold text-xl text-foreground flex items-center gap-2">
                            Glass Distortion Filter
                            <Box size={14} className="text-primary" />
                          </p>
                          <p className="text-sm text-muted-foreground font-sans mt-1">Adjust refractive index and blur-matrix</p>
                      </div>

                      <div className="flex bg-secondary/20 p-1.5 rounded-sm border border-white/5 gap-1">
                        {['low', 'medium', 'high'].map((level) => (
                          <button
                            key={level}
                            onClick={() => updateGlass(level)}
                            className={`px-4 py-2 rounded-sm text-[10px] font-mono font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden ${
                              glassIntensity === level
                                ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                            }`}
                          >
                            {level}
                            {glassIntensity === level && (
                              <motion.div 
                                layoutId="activeGlass"
                                className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                  </div>
              </CardContent>
          </Card>

          <Card className="glass-card overflow-hidden border-white/5 bg-gradient-to-br from-card to-background/50">
              <CardHeader className="bg-white/5 border-b border-white/5">
                  <CardTitle className="flex items-center gap-3 text-muted-foreground text-sm font-mono tracking-widest uppercase">
                      <Bell size={18} />
                      Uplink Notifications
                  </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans border-l-2 border-primary/30 pl-4 py-1 italic">
                    Real-time synchronization status: <span className="text-accent font-bold uppercase tracking-tighter">Connected</span>. 
                    Manage encrypted alert routing and push-vector preferences.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <Button 
                        variant="outline" 
                        className="h-14 justify-between gap-4 border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary transition-all duration-500 rounded-sm group relative overflow-hidden"
                        onClick={() => alert('Neural link established. Alerts active.')}
                      >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-sm text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              <Bell size={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold uppercase tracking-wide">Alert Config</p>
                                <p className="text-[10px] text-muted-foreground">Modify push vectors</p>
                            </div>
                          </div>
                          <div className="text-[9px] bg-accent/20 text-accent px-2 py-0.5 border border-accent/30 font-black italic">ACTIVE</div>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="h-14 justify-between gap-4 border-white/10 bg-white/5 hover:bg-accent/20 hover:border-accent transition-all duration-500 rounded-sm group grayscale hover:grayscale-0"
                        onClick={() => alert('Security audit passed. All systems green.')}
                      >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-sm text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                              <Shield size={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold uppercase tracking-wide">Security Audit</p>
                                <p className="text-[10px] text-muted-foreground">v2.1 Protocol</p>
                            </div>
                          </div>
                          <div className="text-[9px] bg-white/10 text-muted-foreground px-2 py-0.5 border border-white/10 font-mono">LOCKED</div>
                      </Button>
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
