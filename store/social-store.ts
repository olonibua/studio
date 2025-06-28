import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Follow, UserActivity, Achievement, SocialPost } from "@/lib/types";

interface SocialState {
  // Following/Followers
  following: string[];
  followers: string[];
  followSuggestions: User[];
  
  // User Activities
  activities: UserActivity[];
  
  // Achievements
  achievements: Achievement[];
  unlockedAchievements: string[];
  
  // Social Posts
  posts: SocialPost[];
  
  // Actions
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
  isFollowing: (userId: string) => boolean;
  getFollowersCount: () => number;
  getFollowingCount: () => number;
  
  // Activity tracking
  addActivity: (activity: Omit<UserActivity, '$id' | 'createdAt'>) => void;
  getRecentActivities: (limit?: number) => UserActivity[];
  
  // Achievement system
  checkAndUnlockAchievements: (action: string, metadata?: any) => Achievement[];
  getUnlockedAchievements: () => Achievement[];
  
  // Social posts
  addPost: (post: Omit<SocialPost, '$id' | 'createdAt' | 'updatedAt'>) => void;
  likePost: (postId: string) => void;
  sharePost: (postId: string) => void;
  
  // Social metrics
  trackShare: (productId: string, platform: string) => void;
  trackLike: (targetId: string, targetType: 'product' | 'post') => void;
  
  // Utility functions
  clearSocialData: () => void;
  loadUserSocialData: (userId: string) => Promise<void>;
}

// Achievement definitions
const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_purchase',
    title: 'First Purchase',
    description: 'Made your first purchase on MOSÉ',
    icon: '🛍️',
    category: 'purchase',
    unlockedAt: ''
  },
  {
    id: 'art_enthusiast',
    title: 'Art Enthusiast',
    description: 'Purchased 5 artworks',
    icon: '🎨',
    category: 'purchase',
    unlockedAt: ''
  },
  {
    id: 'social_butterfly',
    title: 'Social Butterfly',
    description: 'Follow 10 artists',
    icon: '🦋',
    category: 'social',
    unlockedAt: ''
  },
  {
    id: 'reviewer',
    title: 'Helpful Reviewer',
    description: 'Left 5 helpful reviews',
    icon: '⭐',
    category: 'review',
    unlockedAt: ''
  },
  {
    id: 'loyal_customer',
    title: 'Loyal Customer',
    description: 'Reached Silver tier in loyalty program',
    icon: '👑',
    category: 'loyalty',
    unlockedAt: ''
  },
  {
    id: 'trendsetter',
    title: 'Trendsetter',
    description: 'Shared 10 products on social media',
    icon: '📱',
    category: 'social',
    unlockedAt: ''
  },
  {
    id: 'collector',
    title: 'Art Collector',
    description: 'Have 20 items in wishlist',
    icon: '💎',
    category: 'purchase',
    unlockedAt: ''
  }
];

export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      // Initial state
      following: [],
      followers: [],
      followSuggestions: [],
      activities: [],
      achievements: ACHIEVEMENTS,
      unlockedAchievements: [],
      posts: [],

      // Following/Followers actions
      followUser: async (userId: string) => {
        const { following, addActivity } = get();
        
        if (!following.includes(userId)) {
          set({ following: [...following, userId] });
          
          // Track activity
          addActivity({
            userId: 'current-user-id', // This would come from auth
            type: 'follow',
            targetId: userId,
            targetType: 'user',
            isPublic: true
          });
          
          // Check for achievements
          const { checkAndUnlockAchievements } = get();
          checkAndUnlockAchievements('follow', { followingCount: following.length + 1 });
        }
      },

      unfollowUser: async (userId: string) => {
        const { following } = get();
        set({ following: following.filter(id => id !== userId) });
      },

      isFollowing: (userId: string) => {
        const { following } = get();
        return following.includes(userId);
      },

      getFollowersCount: () => {
        const { followers } = get();
        return followers.length;
      },

      getFollowingCount: () => {
        const { following } = get();
        return following.length;
      },

      // Activity tracking
      addActivity: (activity) => {
        const { activities } = get();
        const newActivity: UserActivity = {
          ...activity,
          $id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString()
        };
        
        set({ activities: [newActivity, ...activities].slice(0, 100) }); // Keep last 100 activities
      },

      getRecentActivities: (limit = 10) => {
        const { activities } = get();
        return activities.slice(0, limit);
      },

      // Achievement system
      checkAndUnlockAchievements: (action: string, metadata = {}) => {
        const { achievements, unlockedAchievements, addActivity } = get();
        const newlyUnlocked: Achievement[] = [];

        achievements.forEach(achievement => {
          if (unlockedAchievements.includes(achievement.id)) return;

          let shouldUnlock = false;

          switch (achievement.id) {
            case 'first_purchase':
              shouldUnlock = action === 'purchase';
              break;
            case 'art_enthusiast':
              shouldUnlock = action === 'purchase' && metadata.totalPurchases >= 5;
              break;
            case 'social_butterfly':
              shouldUnlock = action === 'follow' && metadata.followingCount >= 10;
              break;
            case 'reviewer':
              shouldUnlock = action === 'review' && metadata.reviewCount >= 5;
              break;
            case 'trendsetter':
              shouldUnlock = action === 'share' && metadata.shareCount >= 10;
              break;
            case 'collector':
              shouldUnlock = action === 'wishlist_add' && metadata.wishlistCount >= 20;
              break;
          }

          if (shouldUnlock) {
            const unlockedAchievement = {
              ...achievement,
              unlockedAt: new Date().toISOString()
            };
            
            newlyUnlocked.push(unlockedAchievement);
            
            // Add achievement activity
            addActivity({
              userId: 'current-user-id',
              type: 'achievement',
              targetId: achievement.id,
              targetType: 'user',
              metadata: { achievement: unlockedAchievement },
              isPublic: true
            });
          }
        });

        if (newlyUnlocked.length > 0) {
          set({ 
            unlockedAchievements: [...unlockedAchievements, ...newlyUnlocked.map(a => a.id)]
          });
        }

        return newlyUnlocked;
      },

      getUnlockedAchievements: () => {
        const { achievements, unlockedAchievements } = get();
        return achievements.filter(a => unlockedAchievements.includes(a.id));
      },

      // Social posts
      addPost: (post) => {
        const { posts } = get();
        const newPost: SocialPost = {
          ...post,
          $id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        set({ posts: [newPost, ...posts] });
      },

      likePost: (postId: string) => {
        const { posts } = get();
        set({
          posts: posts.map(post => 
            post.$id === postId 
              ? { ...post, likes: post.likes + 1 }
              : post
          )
        });
      },

      sharePost: (postId: string) => {
        const { posts } = get();
        set({
          posts: posts.map(post => 
            post.$id === postId 
              ? { ...post, shares: post.shares + 1 }
              : post
          )
        });
      },

      // Social metrics
      trackShare: (productId: string, platform: string) => {
        const { addActivity, checkAndUnlockAchievements } = get();
        
        addActivity({
          userId: 'current-user-id',
          type: 'share',
          targetId: productId,
          targetType: 'product',
          metadata: { platform },
          isPublic: false
        });

        // Check for share-related achievements
        checkAndUnlockAchievements('share', { shareCount: get().activities.filter(a => a.type === 'share').length });
      },

      trackLike: (targetId: string, targetType: 'product' | 'post') => {
        const { addActivity } = get();
        
        addActivity({
          userId: 'current-user-id',
          type: 'like',
          targetId,
          targetType,
          isPublic: targetType === 'post'
        });
      },

      // Utility functions
      clearSocialData: () => {
        set({
          following: [],
          followers: [],
          followSuggestions: [],
          activities: [],
          unlockedAchievements: [],
          posts: []
        });
      },

      loadUserSocialData: async (userId: string) => {
        // This would typically fetch data from the backend
        // For now, we'll just simulate loading
        console.log(`Loading social data for user: ${userId}`);
      }
    }),
    {
      name: "mose-social",
      partialize: (state) => ({
        following: state.following,
        followers: state.followers,
        activities: state.activities.slice(0, 50), // Persist only recent activities
        unlockedAchievements: state.unlockedAchievements
      })
    }
  )
); 