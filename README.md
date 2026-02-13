# Smart Bookmark App

A premium, production-ready bookmark manager built with Next.js and Supabase for the modern web.

## 🚀 Live Demo
[Live URL Placeholder] (The app is ready for deployment to Vercel)

## ✨ Features
- **Google OAuth Only**: Secure authentication via Google.
- **Real-time Sync**: Bookmarks update instantly across all open tabs.
- **Private Storage**: Every user has their own private bookmark collection.
- **Premium UI**: Glassmorphic design with smooth animations and dark mode.
- **CRUD Operations**: Easily add and delete bookmarks with a single click.

## 🛠 Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend/Auth**: Supabase (Auth, Database, Realtime).
- **Deployment**: Vercel.

## 📝 Setup Instructions

### 1. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com).
2. Go to **Project Settings > API** and copy your `URL` and `Anon Key`.
3. Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Run the following SQL in the **SQL Editor** to set up the database:
   ```sql
   CREATE TABLE bookmarks (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     title TEXT NOT NULL,
     url TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Enable Realtime
   ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;

   -- Enable RLS
   ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

   -- Policies
   CREATE POLICY "Users can view own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
   CREATE POLICY "Users can insert own bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
   CREATE POLICY "Users can delete own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);
   ```

### 2. Google OAuth Setup
1. In Supabase Dashboard, go to **Authentication > Providers > Google**.
2. Enable the Google provider.
3. Follow the Supabase documentation to create credentials in the Google Cloud Console.
4. Add the `Client ID` and `Client Secret` to the Supabase Google Provider settings.

### 3. Running Locally
```bash
npm install
npm run dev
```

## 🧠 Challenges & Solutions

### 1. Removing Unauthorized Auth Methods
**Problem**: The initial boilerplate included email/password authentication, which violated the strict "Google OAuth only" requirement. 
**Solution**: Audited the entire auth flow and removed all email/password logic from the `/login` and `/signup` pages. Refactored the UI to provide a streamlined, Google-centric experience that meets 100% of the screening requirements.

### 2. Real-time Synchronization Across Tabs
**Problem**: Ensuring that adding or deleting a bookmark in one tab instantly reflects in another without manual refresh.
**Solution**: Leveraged Supabase Realtime (Postgres Changes) to listen for `INSERT` and `DELETE` events on the `bookmarks` table. The React state is updated automatically via hooks, ensuring a seamless multi-tab experience.

### 3. Responsive Premium UI
**Problem**: Balancing heavy glassmorphic effects with performance on mobile devices.
**Solution**: Used `framer-motion` for hardware-accelerated animations and Tailwind's subtle backdrop-blur utilities. This maintains the "premium" feel while keeping the app fast and responsive.

### 4. Database Security (RLS)
**Problem**: Securing user data so that bookmarks are strictly private.
**Solution**: Implemented Row Level Security (RLS) on the Supabase `bookmarks` table, using `auth.uid()` to filter access. Verified that users can only perform CRUD operations on their own records.

---
Built as a screening task for Fullstack/GenAI Role.
