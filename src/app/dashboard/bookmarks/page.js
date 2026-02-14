"use client";
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Hash, Clock, Trash2, Globe } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AddBookmarkForm } from '@/components/AddBookmarkForm';

import { useDashboard } from '@/context/DashboardContext';
import { useMemo } from 'react';

export default function BookmarksPage() {
  const { searchQuery } = useDashboard();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredBookmarks = useMemo(() => {
    if (!searchQuery) return bookmarks;
    return bookmarks.filter(b => 
      b.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.url?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bookmarks, searchQuery]);

  const fetchBookmarks = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookmarks:', error.message);
    } else {
      setBookmarks(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBookmarks();

    // Set up real-time subscription
    const channel = supabase
      .channel('bookmarks_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchBookmarks]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Bookmarks</h1>
          <p className="text-muted-foreground">Manage and organize your saved links.</p>
        </div>
        <AddBookmarkForm onBookmarkAdded={fetchBookmarks} />
      </div>

      {/* Bookmarks Grid */}
      <div className="space-y-4">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-card/50 animate-pulse rounded-xl border border-border" />
            ))}
          </div>
        ) : bookmarks.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-12 bg-background/50 border-dashed border-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
               <Globe size={32} />
            </div>
            <h3 className="text-xl font-semibold">No bookmarks yet</h3>
            <p className="text-muted-foreground mb-6">Start by adding your favorite URLs.</p>
          </Card>
        ) : (
          <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
              <AnimatePresence mode="popLayout">
                {filteredBookmarks.map((bookmark) => (
                    <motion.div 
                      key={bookmark.id} 
                      variants={item}
                      layout
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <BookmarkCard bookmark={bookmark} />
                    </motion.div>
                ))}
              </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function BookmarkCard({ bookmark }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const supabase = createClient();

    const handleDelete = async () => {
      setIsDeleting(true);
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmark.id);

      if (error) {
        console.error('Error deleting bookmark:', error.message);
        setIsDeleting(false);
      }
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }

    return (
        <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <CardContent className="p-6 space-y-3">
                <div className="flex items-start justify-between">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                        <Hash size={16} />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 -mr-2 text-muted-foreground hover:text-destructive transition-colors"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                        <Trash2 size={16} className={isDeleting ? 'animate-pulse' : ''} />
                    </Button>
                </div>
                
                <div className="space-y-1">
                    <h3 className="font-semibold leading-none group-hover:text-primary transition-colors cursor-pointer">
                        <a href={bookmark.url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                             <span className="truncate">{bookmark.title}</span>
                             <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </a>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                        {bookmark.url}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <span className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                        Bookmark
                    </span>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Clock size={12} className="mr-1" />
                        {formatDate(bookmark.created_at)}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
