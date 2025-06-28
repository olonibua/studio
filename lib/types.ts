export interface User {
  $id: string;
  email: string;
  name: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
  phone?: string;
  address?: Address;
  isVerified: boolean;
  sellerProfile?: SellerProfile;
  socialProfile?: SocialProfile;
  preferences?: UserPreferences;
  stats?: UserStats;
  createdAt: string;
  updatedAt: string;
}

export interface SocialProfile {
  bio?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
    linkedin?: string;
  };
  followers: string[];
  following: string[];
  isPublic: boolean;
  achievements: Achievement[];
  loyaltyPoints: number;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
    orderUpdates: boolean;
    socialActivity: boolean;
  };
  privacy: {
    showProfile: boolean;
    showPurchases: boolean;
    showWishlist: boolean;
    allowMessages: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  reviewsGiven: number;
  wishlistItems: number;
  followersCount: number;
  followingCount: number;
  joinedDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'purchase' | 'social' | 'review' | 'loyalty';
  unlockedAt: string;
}

export interface SellerProfile {
  businessName: string;
  description: string;
  specialties: string[];
  location: string;
  rating: number;
  totalSales: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationDocuments?: string[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Product {
  $id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  sellerId: string;
  sellerName: string;
  status: 'draft' | 'active' | 'sold' | 'pending_approval';
  customizable: boolean;
  customizationOptions?: CustomizationOption[];
  stock: number;
  dimensions?: {
    width: number;
    height: number;
    depth?: number;
    weight?: number;
  };
  materials?: string[];
  tags: string[];
  featured: boolean;
  views: number;
  likes: number;
  rating: number;
  reviewCount: number;
  shares: number;
  socialMetrics?: SocialMetrics;
  createdAt: string;
  updatedAt: string;
}

export interface CustomizationOption {
  type: 'text' | 'color' | 'size' | 'material';
  label: string;
  options?: string[];
  required: boolean;
  additionalPrice?: number;
}

export interface Category {
  $id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  subcategories?: Subcategory[];
  productCount: number;
  featured: boolean;
  createdAt: string;
}

export interface Subcategory {
  $id: string;
  name: string;
  slug: string;
  categoryId: string;
  productCount: number;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  customizations?: Record<string, string>;
  totalPrice: number;
}

export interface Order {
  $id: string;
  orderNumber: string;
  buyerId: string;
  sellerId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentReference?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  trackingNumber?: string;
  estimatedDelivery?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  price: number;
  customizations?: Record<string, string>;
  total: number;
}

export interface Review {
  $id: string;
  productId: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpful: number;
  sellerResponse?: {
    message: string;
    createdAt: string;
  };
  createdAt: string;
}

export interface Message {
  $id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'file';
  attachments?: string[];
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  $id: string;
  participants: string[];
  productId?: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface GiftCard {
  $id: string;
  recipientName: string;
  recipientEmail: string;
  occasion: string;
  message: string;
  customPortrait?: string;
  collaborativeMessages: CollaborativeMessage[];
  spotifyPlaylist?: string;
  fundContributions: FundContribution[];
  totalAmount: number;
  isRevealed: boolean;
  revealDate: string;
  createdBy: string;
  createdAt: string;
}

export interface CollaborativeMessage {
  senderName: string;
  senderEmail: string;
  message: string;
  media?: string[];
  createdAt: string;
}

export interface FundContribution {
  contributorName: string;
  contributorEmail: string;
  amount: number;
  message?: string;
  createdAt: string;
}

export interface Notification {
  $id: string;
  userId: string;
  type: 'order' | 'message' | 'review' | 'product' | 'system' | 'social' | 'achievement';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export interface SocialMetrics {
  totalShares: number;
  sharesByPlatform: {
    facebook: number;
    instagram: number;
    twitter: number;
    whatsapp: number;
    other: number;
  };
  recentShares: SocialShare[];
}

export interface SocialShare {
  userId: string;
  platform: string;
  sharedAt: string;
}

export interface UserActivity {
  $id: string;
  userId: string;
  type: 'purchase' | 'review' | 'follow' | 'like' | 'share' | 'achievement';
  targetId: string;
  targetType: 'product' | 'user' | 'order' | 'review' | 'post';
  metadata?: Record<string, any>;
  isPublic: boolean;
  createdAt: string;
}

export interface Follow {
  $id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface SocialPost {
  $id: string;
  authorId: string;
  content: string;
  images?: string[];
  type: 'showcase' | 'announcement' | 'tutorial' | 'behind_scenes';
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  productId?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  $id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  parentId?: string;
  likes: number;
  replies?: Comment[];
  createdAt: string;
}

export interface LoyaltyProgram {
  $id: string;
  userId: string;
  currentTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalPoints: number;
  availablePoints: number;
  lifetimeSpent: number;
  nextTierThreshold: number;
  benefits: string[];
  history: LoyaltyTransaction[];
}

export interface LoyaltyTransaction {
  $id: string;
  type: 'earn' | 'redeem';
  points: number;
  reason: string;
  orderId?: string;
  createdAt: string;
} 