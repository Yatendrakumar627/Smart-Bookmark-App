import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('Supabase env vars missing. Returning dummy client.')
    // Return a Proxy that returns itself for any property access to handle chained calls like supabase.auth.getUser()
    const dummy = new Proxy({}, {
      get: (target, prop) => {
        const fn = () => Promise.resolve({ data: { user: null, session: null }, error: null })
        Object.assign(fn, dummy)
        return fn
      }
    })
    return dummy
  }

  return createBrowserClient(url, key)
}

