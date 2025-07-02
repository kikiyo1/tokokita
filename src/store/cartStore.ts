/**
 * Zustand store untuk mengelola keranjang belanja
 */
import { create } from 'zustand';
import { CartItem, Product } from '../types/product';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelection: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalPrice: () => number;
  getSelectedItems: () => CartItem[];
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (product: Product) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          items: [...state.items, { product, quantity: 1, selected: true }]
        };
      }
    });
  },
  
  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId)
    }));
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set((state) => ({
      items: state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    }));
  },
  
  toggleSelection: (productId: string) => {
    set((state) => ({
      items: state.items.map(item =>
        item.product.id === productId
          ? { ...item, selected: !item.selected }
          : item
      )
    }));
  },
  
  clearCart: () => set({ items: [] }),
  
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  
  getTotalPrice: () => {
    const { items } = get();
    return items
      .filter(item => item.selected)
      .reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },
  
  getSelectedItems: () => {
    const { items } = get();
    return items.filter(item => item.selected);
  }
}));
