import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      likedItems: [],
      
      addToCart: (product) =>
        set((state) => {
          const existing = state.cartItems.find((item) => item.id === product.id);
          if (existing) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { ...product, quantity: 1 }],
          };
        }),
      
      removeFromCart: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        })),
      
      toggleLike: (productId) =>
        set((state) => ({
          likedItems: state.likedItems.includes(productId)
            ? state.likedItems.filter((id) => id !== productId)
            : [...state.likedItems, productId],
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
);
