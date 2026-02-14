"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function AddBookmarkForm({ onBookmarkAdded }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url || !title) return;

    setLoading(true);
    const supabase = createClient();
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('No authenticated user found');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('bookmarks')
      .insert([
        { 
          url, 
          title, 
          user_id: user.id 
        },
      ]);

    if (error) {
      console.error('Error adding bookmark:', error.message);
    } else {
      setUrl('');
      setTitle('');
      setIsOpen(false);
      if (onBookmarkAdded) onBookmarkAdded();
    }
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="gap-2 rounded-full shadow-lg shadow-primary/20">
        <Plus size={18} />
        <span className="hidden sm:inline">New Bookmark</span>
      </Button>
    );
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 bg-card border border-border rounded-2xl shadow-2xl glass-card relative z-[101]">
        <h3 className="text-xl font-bold mb-4">Add New Bookmark</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Next.js Documentation" 
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">URL</label>
            <Input 
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..." 
              required
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Bookmark'}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
