import { z } from 'zod';

// Auth Validations
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['buyer', 'seller']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Profile Validations
export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  avatar: z.string().optional(),
});

export const addressSchema = z.object({
  street: z.string().min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State is required'),
  country: z.string().min(2, 'Country is required'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
});

export const sellerProfileSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  location: z.string().min(2, 'Location is required'),
  socialLinks: z.object({
    instagram: z.string().url('Please enter a valid Instagram URL').optional().or(z.literal('')),
    facebook: z.string().url('Please enter a valid Facebook URL').optional().or(z.literal('')),
    website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  }).optional(),
});

// Product Validations
export const productSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  salePrice: z.number().optional(),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  customizable: z.boolean(),
  stock: z.number().min(0, 'Stock cannot be negative'),
  dimensions: z.object({
    width: z.number().min(0, 'Width cannot be negative'),
    height: z.number().min(0, 'Height cannot be negative'),
    depth: z.number().min(0, 'Depth cannot be negative').optional(),
    weight: z.number().min(0, 'Weight cannot be negative').optional(),
  }).optional(),
  materials: z.array(z.string()).optional(),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed'),
  images: z.array(z.string()).min(1, 'At least one image is required').max(8, 'Maximum 8 images allowed'),
}).refine((data) => {
  if (data.salePrice && data.salePrice >= data.price) {
    return false;
  }
  return true;
}, {
  message: "Sale price must be less than regular price",
  path: ["salePrice"],
});

export const customizationOptionSchema = z.object({
  type: z.enum(['text', 'color', 'size', 'material']),
  label: z.string().min(2, 'Label must be at least 2 characters'),
  options: z.array(z.string()).optional(),
  required: z.boolean(),
  additionalPrice: z.number().min(0, 'Additional price cannot be negative').optional(),
});

// Order Validations
export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  sameAsBilling: z.boolean().optional(),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  customizations: z.record(z.string()).optional(),
});

// Review Validations
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
  images: z.array(z.string()).max(5, 'Maximum 5 images allowed').optional(),
});

export const sellerResponseSchema = z.object({
  message: z.string().min(10, 'Response must be at least 10 characters'),
});

// Message Validations
export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  type: z.enum(['text', 'image', 'file']),
  attachments: z.array(z.string()).optional(),
});

// Gift Card Validations
export const giftCardSchema = z.object({
  recipientName: z.string().min(2, 'Recipient name must be at least 2 characters'),
  recipientEmail: z.string().email('Please enter a valid email address'),
  occasion: z.string().min(1, 'Occasion is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  revealDate: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, {
    message: "Reveal date cannot be in the past",
  }),
});

export const collaborativeMessageSchema = z.object({
  senderName: z.string().min(2, 'Name must be at least 2 characters'),
  senderEmail: z.string().email('Please enter a valid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  media: z.array(z.string()).max(3, 'Maximum 3 media files allowed').optional(),
});

export const fundContributionSchema = z.object({
  contributorName: z.string().min(2, 'Name must be at least 2 characters'),
  contributorEmail: z.string().email('Please enter a valid email address'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  message: z.string().max(200, 'Message cannot exceed 200 characters').optional(),
});

// Search and Filter Validations
export const searchSchema = z.object({
  query: z.string().max(100, 'Search query cannot exceed 100 characters').optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  minPrice: z.number().min(0, 'Minimum price cannot be negative').optional(),
  maxPrice: z.number().min(0, 'Maximum price cannot be negative').optional(),
  sortBy: z.enum(['newest', 'price_asc', 'price_desc', 'popular', 'rating']).optional(),
  customizable: z.boolean().optional(),
  inStock: z.boolean().optional(),
}).refine((data) => {
  if (data.minPrice && data.maxPrice && data.minPrice > data.maxPrice) {
    return false;
  }
  return true;
}, {
  message: "Minimum price cannot be greater than maximum price",
  path: ["maxPrice"],
});

// Admin Validations
export const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().min(1, 'Image is required'),
  featured: z.boolean(),
});

export const subcategorySchema = z.object({
  name: z.string().min(2, 'Subcategory name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  categoryId: z.string().min(1, 'Category is required'),
});

// Contact and Support Validations
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

export const reportSchema = z.object({
  type: z.enum(['product', 'seller', 'review', 'message', 'other']),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  evidence: z.array(z.string()).max(5, 'Maximum 5 evidence files allowed').optional(),
});

// Type exports for TypeScript
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type GiftCardInput = z.infer<typeof giftCardSchema>;
export type SearchInput = z.infer<typeof searchSchema>; 