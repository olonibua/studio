import { useCartStore } from '@/store/cart-store';
import { formatPrice } from '@/lib/utils';

export const useCart = () => {
  const store = useCartStore();
  
  const subtotal = store.getTotalPrice();
  const itemCount = store.getTotalItems();

  return {
    // Store properties
    items: store.items,
    isLoading: store.isLoading,
    
    // Store methods
    addItem: store.addToCart,
    removeItem: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    getItemQuantity: store.getItemCount,
    
    // Computed values
    subtotal,
    itemCount,
    isEmpty: store.items.length === 0,
    formattedSubtotal: formatPrice(subtotal),
    hasItems: store.items.length > 0,
    totalItems: itemCount,
    isItemInCart: (productId: string) => store.getItemCount(productId) > 0,
  };
}; 