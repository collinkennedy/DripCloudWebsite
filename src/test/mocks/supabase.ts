import { vi } from 'vitest'

const storageMock = {
  upload: vi.fn().mockResolvedValue({ data: { path: 'test-file.png' }, error: null }),
  getPublicUrl: vi.fn().mockReturnValue({ data: { publicUrl: 'https://example.com/test-file.png' } }),
}

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
  functions: {
    invoke: vi.fn().mockResolvedValue({ data: [], error: null }),
  },
  storage: {
    from: vi.fn().mockReturnValue(storageMock),
  },
}
