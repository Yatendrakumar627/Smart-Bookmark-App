import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    if (typeof window === 'undefined') {
      console.warn('Supabase env vars missing during build. Returning dummy client.')
      // Return a Proxy that returns itself for any property access to handle chained calls like supabase.auth.getUser()
      const dummy = new Proxy({}, {
        get: () => {
          const fn = () => Promise.resolve({ data: { user: null }, error: null })
          Object.assign(fn, dummy)
          return fn
        }
      })
      return dummy
    }
  }

  return createBrowserClient(url, key)
}

