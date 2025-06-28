import { create } from 'zustand';
import { Product, Category } from '@/lib/types';

interface ProductState {
  products: Product[];
  categories: Category[];
  featuredProducts: Product[];
  searchResults: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Search and filter state
  searchQuery: string;
  selectedCategory: string;
  selectedSubcategory: string;
  priceRange: { min: number; max: number };
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'rating';
  showCustomizable: boolean;
  showInStock: boolean;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setFeaturedProducts: (products: Product[]) => void;
  setCurrentProduct: (product: Product | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Search and filter actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedSubcategory: (subcategory: string) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  setSortBy: (sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'rating') => void;
  setShowCustomizable: (show: boolean) => void;
  setShowInStock: (show: boolean) => void;
  clearFilters: () => void;
  
  // Pagination actions
  setCurrentPage: (page: number) => void;
  setPagination: (current: number, total: number, totalProducts: number) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  featuredProducts: [],
  searchResults: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  
  // Search and filter state
  searchQuery: '',
  selectedCategory: '',
  selectedSubcategory: '',
  priceRange: { min: 0, max: 1000000 },
  sortBy: 'newest',
  showCustomizable: false,
  showInStock: false,
  
  // Pagination
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,
  
  // Basic setters
  setProducts: (products: Product[]) => set({ products }),
  setCategories: (categories: Category[]) => set({ categories }),
  setFeaturedProducts: (products: Product[]) => set({ featuredProducts: products }),
  setCurrentProduct: (product: Product | null) => set({ currentProduct: product }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  
  // Search and filter setters
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedCategory: (category: string) => set({ selectedCategory: category, selectedSubcategory: '' }),
  setSelectedSubcategory: (subcategory: string) => set({ selectedSubcategory: subcategory }),
  setPriceRange: (range: { min: number; max: number }) => set({ priceRange: range }),
  setSortBy: (sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'rating') => set({ sortBy }),
  setShowCustomizable: (show: boolean) => set({ showCustomizable: show }),
  setShowInStock: (show: boolean) => set({ showInStock: show }),
  
  clearFilters: () => set({
    searchQuery: '',
    selectedCategory: '',
    selectedSubcategory: '',
    priceRange: { min: 0, max: 1000000 },
    sortBy: 'newest',
    showCustomizable: false,
    showInStock: false,
    currentPage: 1,
  }),
  
  // Pagination setters
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setPagination: (current: number, total: number, totalProducts: number) => 
    set({ currentPage: current, totalPages: total, totalProducts }),
}));
