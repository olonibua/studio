import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { account } from '@/lib/appwrite';
import { User } from '@/lib/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string, role: 'buyer' | 'seller') => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          
          // Create session with Appwrite
          await account.createEmailPasswordSession(email, password);
          
          // Get user data
          const userData = await account.get();
          
          // For now, create a basic user object
          // In production, you would fetch additional user data from your database
          const user: User = {
            $id: userData.$id,
            email: userData.email,
            name: userData.name,
            role: 'buyer', // This should come from your user profile in the database
            isVerified: userData.emailVerification,
            createdAt: userData.$createdAt,
            updatedAt: userData.$updatedAt,
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          return user;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (email: string, password: string, name: string, role: 'buyer' | 'seller') => {
        try {
          set({ isLoading: true });
          
          // Create account with Appwrite
          const userData = await account.create('unique()', email, password, name);
          
          // Create session
          await account.createEmailPasswordSession(email, password);
          
          // Create user profile in database (you would implement this)
          const user: User = {
            $id: userData.$id,
            email: userData.email,
            name: userData.name,
            role,
            isVerified: false,
            createdAt: userData.$createdAt,
            updatedAt: userData.$updatedAt,
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          await account.deleteSession('current');
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        } catch (error) {
          // Even if logout fails, clear local state
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const userData = await account.get();
          
          // Fetch full user profile from database
          const user: User = {
            $id: userData.$id,
            email: userData.email,
            name: userData.name,
            role: 'buyer', // This should come from your user profile
            isVerified: userData.emailVerification,
            createdAt: userData.$createdAt,
            updatedAt: userData.$updatedAt,
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          set({ isLoading: true });
          
          // Update user profile in database
          // This would be implemented with your database service
          
          const currentUser = get().user;
          if (currentUser) {
            const updatedUser = { ...currentUser, ...data };
            set({ 
              user: updatedUser, 
              isLoading: false 
            });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setUser: (user: User | null) => {
        set({ 
          user, 
          isAuthenticated: !!user 
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
); 