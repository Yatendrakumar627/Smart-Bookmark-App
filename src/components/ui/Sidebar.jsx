"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Home, Bookmark, User, Settings, LogOut } from 'lucide-react';

export function Sidebar({ className }) {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={clsx("w-64 border-r border-border bg-card/50 h-screen sticky top-0 flex flex-col p-4 glass", className)}>
      <div className="flex items-center gap-2 px-2 py-4 mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/40">
          SB
        </div>
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">SmartBookmark</span>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_-3px_rgba(56,189,248,0.4)]" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <Icon size={18} className={clsx("transition-transform duration-300", isActive && "scale-110")} />
                {link.label}
              </Link>
            );
        })}
      </nav>

      <div className="pt-4 mt-auto border-t border-border">
         <button 
           onClick={async () => {
             const { createClient } = await import('@/lib/supabase/client');
             const supabase = createClient();
             await supabase.auth.signOut();
             window.location.href = '/login';
           }}
           className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
         >
            <LogOut size={18} />
            Sign Out
         </button>
      </div>
    </aside>
  );
}
