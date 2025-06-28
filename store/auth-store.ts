import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { account, databases } from '@/lib/appwrite';
import { User } from '@/lib/types';
import { DATABASE_ID, USERS_COLLECTION_ID } from '@/lib/constants';
import { Query } from 'appwrite';

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
          console.log('🔐 Starting login process...');
          set({ isLoading: true });
          
          // Check for existing sessions and delete them before login
          try {
            console.log('🔍 Checking for existing session...');
            // First try to get the current session
            await account.get();
            // If successful (no error thrown), we have an active session to delete
            console.log('📤 Found existing session, deleting it...');
            await account.deleteSession('current');
          } catch (sessionError) {
            console.log('ℹ️ No existing session found or error getting session, proceeding with login');
            // No active session or error getting session, which is fine for login
          }
          
          // Now create a new session
          console.log('📥 Creating new session...');
          const session = await account.createEmailPasswordSession(email, password);
          console.log('✅ Session created successfully:', session.$id);
          
          // Get current account
          console.log('🔍 Getting account details...');
          const accountDetails = await account.get();
          console.log('✅ Account details retrieved:', accountDetails.email);
          
          // Get user document from database
          console.log('🔍 Getting user document...');
          const users = await databases.listDocuments(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            [Query.equal('userId', accountDetails.$id)]
          );
          
          if (users.documents.length === 0) {
            console.error('❌ User document not found in database');
            throw new Error('User not found in database');
          }
          
          const userData = users.documents[0];
          console.log('✅ User document found:', userData);
          
          // Normalize role to lowercase and ensure it's a valid role
          let role: 'buyer' | 'seller' | 'admin' = 'buyer'; // Default to buyer
          if (typeof userData.role === 'string') {
            const normalizedRole = userData.role.toLowerCase();
            // Only assign if it's a valid role
            if (normalizedRole === 'admin' || normalizedRole === 'seller' || normalizedRole === 'buyer') {
              role = normalizedRole as 'buyer' | 'seller' | 'admin';
            }
          }
          
          const user: User = {
            $id: accountDetails.$id,
            email: accountDetails.email,
            name: userData.name || accountDetails.name,
            role: role,
            avatar: userData.profilePicture,
            phone: userData.phone,
            address: userData.address,
            isVerified: accountDetails.emailVerification,
            sellerProfile: userData.sellerProfile,
            socialProfile: userData.socialProfile,
            preferences: {
              notifications: {
                email: userData.emailNotifications ?? true,
                push: userData.pushNotifications ?? true,
                marketing: userData.marketingNotifications ?? false,
                orderUpdates: userData.orderUpdateNotifications ?? true,
                socialActivity: userData.socialActivityNotifications ?? true,
              },
              privacy: {
                showProfile: userData.showProfile ?? true,
                showPurchases: userData.showPurchases ?? false,
                showWishlist: userData.showWishlist ?? false,
                allowMessages: userData.allowMessages ?? true,
              },
              theme: userData.theme ?? 'auto',
              language: userData.language ?? 'en'
            },
            stats: {
              totalOrders: userData.totalOrders ?? 0,
              totalSpent: userData.totalSpent ?? 0,
              reviewsGiven: userData.reviewsGiven ?? 0,
              wishlistItems: userData.wishlistItems ?? 0,
              followersCount: userData.followersCount ?? 0,
              followingCount: userData.followingCount ?? 0,
              joinedDate: userData.joinedDate ?? accountDetails.$createdAt
            },
            createdAt: accountDetails.$createdAt,
            updatedAt: accountDetails.$updatedAt,
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          console.log("🎉 Login successful, returning user:", user.email);
          return user;
        } catch (error: unknown) {
          console.error('❌ Login error:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (email: string, password: string, name: string, role: 'buyer' | 'seller') => {
        try {
          console.log('📝 Starting registration process...');
          set({ isLoading: true });
          
          // Create account with Appwrite
          console.log('👤 Creating Appwrite account...');
          const userData = await account.create('unique()', email, password, name);
          console.log('✅ Account created successfully:', userData.$id);
          
          // Create session
          console.log('📥 Creating session...');
          await account.createEmailPasswordSession(email, password);
          console.log('✅ Session created successfully');
          
          // Create user profile document in database
          console.log('💾 Creating user document in database...');
          const userDocument = await databases.createDocument(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            'unique()',
            {
              userId: userData.$id,
              name: userData.name,
              email: userData.email,
              role: role,
              // Notification preferences
              // emailNotifications: true,
              // pushNotifications: true,
              // marketingNotifications: false,
              // orderUpdateNotifications: true,
              // socialActivityNotifications: true,
              // // Privacy preferences
              // showProfile: true,
              // showPurchases: false,
              // showWishlist: false,
              // allowMessages: true,
              // // User preferences
              // theme: 'auto',
              // language: 'en',
              // // User stats
              // totalOrders: 0,
              // totalSpent: 0,
              // reviewsGiven: 0,
              // wishlistItems: 0,
              // followersCount: 0,
              // followingCount: 0,
              createdAt: new Date().toISOString()
            }
          );
          console.log('✅ User document created successfully:', userDocument.$id);
          
          // Create user object for state
          const user: User = {
            $id: userData.$id,
            email: userData.email,
            name: userData.name,
            role,
            avatar: undefined,
            phone: undefined,
            address: undefined,
            isVerified: false,
            sellerProfile: undefined,
            socialProfile: undefined,
            preferences: {
              notifications: {
                email: userDocument.emailNotifications,
                push: userDocument.pushNotifications,
                marketing: userDocument.marketingNotifications,
                orderUpdates: userDocument.orderUpdateNotifications,
                socialActivity: userDocument.socialActivityNotifications,
              },
              privacy: {
                showProfile: userDocument.showProfile,
                showPurchases: userDocument.showPurchases,
                showWishlist: userDocument.showWishlist,
                allowMessages: userDocument.allowMessages,
              },
              theme: userDocument.theme,
              language: userDocument.language
            },
            stats: {
              totalOrders: userDocument.totalOrders,
              totalSpent: userDocument.totalSpent,
              reviewsGiven: userDocument.reviewsGiven,
              wishlistItems: userDocument.wishlistItems,
              followersCount: userDocument.followersCount,
              followingCount: userDocument.followingCount,
              joinedDate: userDocument.joinedDate
            },
            createdAt: userData.$createdAt,
            updatedAt: userData.$updatedAt,
          };
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          console.log("🎉 Registration successful, returning user:", user.email);
        } catch (error) {
          console.error('❌ Registration error:', error);
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