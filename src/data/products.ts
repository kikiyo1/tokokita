/**
 * Data dummy produk untuk toko online
 */
import { Product, Category } from '../types/product';

export const categories: Category[] = [
  { id: '1', name: 'Fashion Pria', icon: '👔', image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/29e6b31f-411c-4e94-aaa0-a1fe24154b8f.jpg' },
  { id: '2', name: 'Fashion Wanita', icon: '👗', image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/002021aa-a02f-433b-8220-1d54980e7847.jpg' },
  { id: '3', name: 'Elektronik', icon: '📱', image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/5b702f86-16fb-4b1c-ac2c-e3cc6ecda2ab.jpg' },
  { id: '4', name: 'Komputer', icon: '💻', image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/2c00657a-8bb8-4a9c-ac60-abf1286abedc.jpg' },
  { id: '5', name: 'Kecantikan', icon: '💄', image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/fd255402-60ec-4b73-a8bd-ce4c56dc0353.jpg' },
  { id: '6', name: 'Olahraga', icon: '⚽', image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/ff7e9ad5-e1b1-42ab-97a3-aa950f4d09e9.jpg' },
  { id: '7', name: 'Makanan', icon: '🍔', image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/f157559d-788b-4c62-aed0-a48e5b05a74c.jpg' },
  { id: '8', name: 'Rumah Tangga', icon: '🏠', image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/9285b39d-2aa7-496e-a2c3-bc912e0346db.jpg' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Kemeja Pria Lengan Panjang Formal',
    price: 125000,
    originalPrice: 200000,
    image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/07a1485f-3a71-4d19-a046-d2fae6e70a99.jpg',
    rating: 4.8,
    sold: 1250,
    location: 'Jakarta Pusat',
    discount: 37,
    isFlashSale: true,
    category: 'Fashion Pria',
    description: 'Kemeja formal berkualitas tinggi dengan bahan katun premium yang nyaman dipakai untuk acara formal maupun casual.',
    images: [
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/07a1485f-3a71-4d19-a046-d2fae6e70a99.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/60e0edc6-c85f-40ee-8640-b2a69f2baec6.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/256a9d1f-3851-4190-892f-29d9be2219f0.jpg'
    ],
    specifications: {
      'Bahan': 'Katun Premium',
      'Ukuran': 'S, M, L, XL, XXL',
      'Warna': 'Putih, Biru, Hitam',
      'Perawatan': 'Cuci dengan air dingin'
    }
  },
  {
    id: '2',
    name: 'Smartphone Android 128GB',
    price: 2890000,
    originalPrice: 3200000,
    image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/dd8363d6-b9cb-4f83-8d3c-c1a0e3da23c1.jpg',
    rating: 4.7,
    sold: 856,
    location: 'Surabaya',
    discount: 10,
    category: 'Elektronik',
    description: 'Smartphone Android terbaru dengan kamera 48MP, layar AMOLED 6.4 inch, dan baterai 5000mAh.',
    images: [
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/dd8363d6-b9cb-4f83-8d3c-c1a0e3da23c1.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/c81e0adc-a8f8-42ba-bc09-28cf43b96712.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/e5bdde19-08eb-4773-b53e-1ecb154940da.jpg'
    ],
    specifications: {
      'RAM': '8GB',
      'Storage': '128GB',
      'Kamera': '48MP Triple Camera',
      'Baterai': '5000mAh',
      'Layar': '6.4" AMOLED'
    }
  },
  {
    id: '3',
    name: 'Dress Wanita Casual Elegant',
    price: 89000,
    originalPrice: 150000,
    image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/70993c5a-8eaf-4007-9dba-3e785382c073.jpg',
    rating: 4.9,
    sold: 2134,
    location: 'Bandung',
    discount: 41,
    isFlashSale: true,
    category: 'Fashion Wanita',
    description: 'Dress casual yang elegant untuk berbagai acara, terbuat dari bahan berkualitas tinggi dan nyaman.',
    images: [
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/70993c5a-8eaf-4007-9dba-3e785382c073.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/b13fd8ce-cfd1-43f3-82b5-0608f22e6c28.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/ad4e464a-affe-4382-9d57-a72c7194c4b8.jpg'
    ],
    specifications: {
      'Bahan': 'Polyester Premium',
      'Ukuran': 'S, M, L, XL',
      'Warna': 'Navy, Hitam, Maroon',
      'Model': 'A-Line'
    }
  },
  {
    id: '4',
    name: 'Laptop Gaming 16GB RAM',
    price: 12500000,
    image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/ca44fda2-a6a7-4765-a423-f0ee6a15f72e.jpg',
    rating: 4.6,
    sold: 234,
    location: 'Jakarta Selatan',
    category: 'Komputer',
    description: 'Laptop gaming powerful dengan spesifikasi tinggi untuk gaming dan kerja berat.',
    images: [
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/ca44fda2-a6a7-4765-a423-f0ee6a15f72e.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/9ed7199a-a13e-48b4-9ded-1828079c5548.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/c21ff3b3-a146-4a3f-95b1-556a5edc4e1e.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i7',
      'RAM': '16GB DDR4',
      'Storage': '512GB SSD',
      'GPU': 'NVIDIA GTX 1660',
      'Layar': '15.6" Full HD'
    }
  },
  {
    id: '5',
    name: 'Serum Wajah Vitamin C',
    price: 75000,
    originalPrice: 120000,
    image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/ac7ec904-0ab8-45ca-8136-f6b748306f07.jpg',
    rating: 4.8,
    sold: 3456,
    location: 'Yogyakarta',
    discount: 37,
    category: 'Kecantikan',
    description: 'Serum wajah dengan kandungan Vitamin C tinggi untuk mencerahkan dan merawat kulit wajah.',
    images: [
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/ac7ec904-0ab8-45ca-8136-f6b748306f07.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/317ed404-7122-47f9-9d9e-94f70e383edf.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/41289d50-b46d-408f-acdf-02c8765109c8.jpg'
    ],
    specifications: {
      'Kandungan': 'Vitamin C 20%',
      'Volume': '30ml',
      'Jenis Kulit': 'Semua jenis kulit',
      'Manfaat': 'Mencerahkan, Anti-aging'
    }
  },
  {
    id: '6',
    name: 'Sepatu Olahraga Running',
    price: 350000,
    originalPrice: 500000,
    image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/4f352471-3937-492e-a754-61c565a8ba57.jpg',
    rating: 4.7,
    sold: 1789,
    location: 'Medan',
    discount: 30,
    category: 'Olahraga',
    description: 'Sepatu running dengan teknologi bantalan udara untuk kenyamanan maksimal saat berolahraga.',
    images: [
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/4f352471-3937-492e-a754-61c565a8ba57.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/707f7c59-219a-4799-901c-f0b83dd78e1f.jpg',
      'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/28559439-ab63-46d6-aa05-c5da85ca9553.jpg'
    ],
    specifications: {
      'Ukuran': '39-44',
      'Bahan': 'Mesh + Synthetic',
      'Sol': 'Rubber dengan Air Cushion',
      'Warna': 'Hitam, Putih, Abu-abu'
    }
  }
];
