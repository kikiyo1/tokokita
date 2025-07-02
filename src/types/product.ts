/**
 * Interface untuk tipe data produk dalam aplikasi e-commerce
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sold: number;
  location: string;
  discount?: number;
  isFlashSale?: boolean;
  category: string;
  description: string;
  images: string[];
  specifications: { [key: string]: string };
}

/**
 * Interface untuk item dalam keranjang belanja
 */
export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}

/**
 * Interface untuk kategori produk
 */
export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}
