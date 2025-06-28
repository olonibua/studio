import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/types";

interface WishlistState {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.$id === product.$id);
        
        if (!existingItem) {
          set({ items: [...items, product] });
        }
      },

      removeFromWishlist: (productId) => {
        const { items } = get();
        set({ items: items.filter((item) => item.$id !== productId) });
      },

      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((item) => item.$id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getWishlistCount: () => {
        const { items } = get();
        return items.length;
      },
    }),
    {
      name: "mose-wishlist",
    }
  )
); 