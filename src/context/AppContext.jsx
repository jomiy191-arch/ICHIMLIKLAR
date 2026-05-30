import React from 'react';
import { useLanguageStore } from '../stores/useLanguageStore';
import { useThemeStore } from '../stores/useThemeStore';
import { useCartStore } from '../stores/useCartStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useSearchStore } from '../stores/useSearchStore';

// Backward compatibility - export stores as hooks
export const useLanguage = () => {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  return { language, setLanguage };
};

export const useTheme = () => {
  const isDark = useThemeStore((state) => state.isDark);
  const setIsDark = useThemeStore((state) => state.setIsDark);
  return { isDark, setIsDark };
};

export const useCart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const likedItems = useCartStore((state) => state.likedItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const toggleLike = useCartStore((state) => state.toggleLike);
  return { cartItems, likedItems, addToCart, removeFromCart, toggleLike };
};

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  return { user, setUser };
};

export const useSearch = () => {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);
  return { query, setQuery };
};

// Providers no longer needed with Zustand, but keeping for backward compatibility
export const LanguageProvider = ({ children }) => children;
export const ThemeProvider = ({ children }) => children;
export const CartProvider = ({ children }) => children;
export const AuthProvider = ({ children }) => children;
