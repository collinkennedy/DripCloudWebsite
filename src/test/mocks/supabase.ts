import { vi } from 'vitest'

export const supabase = {
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
    onAuthStateChange: vi.fn().mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    }),
    signUp: vi.fn().mockResolvedValue({ data: {}, error: null }),
    signInWithPassword: vi.fn().mockResolvedValue({ data: {}, error: null }),
    signInWithOtp: vi.fn().mockResolvedValue({ data: {}, error: null }),
    signOut: vi.fn().mockResolvedValue({ error: null }),
  },
}
