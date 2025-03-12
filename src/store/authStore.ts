import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState} from '@/types/index'

// Create the store with Zustand and persist middleware
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authenticated: false,
      user_info: {},
      login: (data) => set(() => ({
        authenticated: data.authenticated,
        user_info: data.user_info,
      })),
      logout: () => set({ authenticated: false, user_info: {} }),
    }),
    {
      name: 'auth-storage', // unique name for the storage
      storage: createJSONStorage(() => localStorage), // use localStorage (or sessionStorage)
    }
  )
);

export default useAuthStore;
