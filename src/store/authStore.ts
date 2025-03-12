import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


const useAuthStore = create(
    persist(
      (set) => ({
        authenticated: false,
        user_info: {},
        login: (data:any) => set(() => ({ 
          authenticated: data.authenticated, 
          user_info: data.user_info 
        })),
        logout: () => set({ authenticated: false, user_info: {} }),
      }),
      {
        name: 'auth-storage', // unique name for the storage
        storage: createJSONStorage(() => localStorage), // use localStorage (or sessionStorage)
      }
    
  )
)

export default useAuthStore