"use client";
import { Sidebar } from '@/components/ui/Sidebar';
import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AddBookmarkForm } from '@/components/AddBookmarkForm';
import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const client = createClient();
    setSupabase(client);
    
    const fetchUser = async () => {
      const { data: { user } } = await client.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const getInitials = (email) => {
    if (!email) return '??';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur-md">
           <div className="flex-1">
             <div className="relative max-w-md">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input 
                 type="search" 
                 placeholder="Search bookmarks..." 
                 className="pl-9 bg-secondary/50 border-transparent focus:bg-background focus:border-input transition-all"
               />
             </div>
           </div>
           
           <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="rounded-full">
               <Bell size={20} />
             </Button>
             
             <AddBookmarkForm />

             <div className="flex items-center gap-3 pl-2 border-l border-border">
                <div className="hidden md:block text-right">
                    <p className="text-xs font-medium truncate max-w-[150px]">
                        {user?.email || 'Loading...'}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Pro Account</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-background shadow-lg">
                  {getInitials(user?.email)}
                </div>
             </div>
           </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
