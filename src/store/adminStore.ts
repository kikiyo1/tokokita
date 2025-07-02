/**
 * Zustand store untuk mengelola data admin dan produk
 */
import { create } from 'zustand';
import { Product } from '../types/product';

interface AdminState {
  products: Product[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  getFilteredProducts: () => Product[];
}

export const useAdminStore = create<AdminState>((set, get) => ({
  products: [],
  isLoading: false,
  searchQuery: '',
  selectedCategory: 'Semua',
  
  setProducts: (products) => set({ products }),
  
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    set((state) => ({ products: [...state.products, newProduct] }));
  },
  
  updateProduct: (id, updatedData) => {
    set((state) => ({
      products: state.products.map(product =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    }));
  },
  
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter(product => product.id !== id)
    }));
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategory } = get();
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}));
