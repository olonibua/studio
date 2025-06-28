import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/lib/types';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  
  // Actions
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemCount: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addToCart: (newItem: CartItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            item => item.productId === newItem.productId && 
            JSON.stringify(item.customizations) === JSON.stringify(newItem.customizations)
          );

          if (existingItemIndex >= 0) {
            // Update existing item quantity
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
              totalPrice: updatedItems[existingItemIndex].totalPrice + newItem.totalPrice
            };
            return { items: updatedItems };
          } else {
            // Add new item
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeFromCart: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId)
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => ({
          items: state.items.map(item => {
            if (item.productId === productId) {
              const unitPrice = item.product.salePrice || item.product.price;
              return {
                ...item,
                quantity,
                totalPrice: unitPrice * quantity
              };
            }
            return item;
          })
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.totalPrice, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getItemCount: (productId: string) => {
        const item = get().items.find(item => item.productId === productId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'mose-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
); 