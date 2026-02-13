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
    <aside className={clsx("w-64 border-r border-border bg-card/50 backdrop-blur-xl h-screen sticky top-0 flex flex-col p-4", className)}>
      <div className="flex items-center gap-2 px-2 py-4 mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
          SB
        </div>
        <span className="text-xl font-bold tracking-tight">SmartBookmark</span>
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon size={18} />
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
