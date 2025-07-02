/**
 * Halaman utama aplikasi e-commerce
 */
import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import CategoryGrid from '../components/CategoryGrid';
import ProductCard from '../components/ProductCard';
import ProductDetail from '../components/ProductDetail';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { Product } from '../types/product';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  
  // Filter produk berdasarkan pencarian dan kategori
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };
  
  const handleCloseProductDetail = () => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  };
  
  const flashSaleProducts = products.filter(product => product.isFlashSale);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearchChange={setSearchQuery}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      <main className="container mx-auto px-4 py-6">
        {/* Banner */}
        <Banner />
        
        {/* Category Grid */}
        <CategoryGrid onCategorySelect={setSelectedCategory} />
        
        {/* Flash Sale Section */}
        {flashSaleProducts.length > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">⚡ FLASH SALE</h2>
                <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  Berakhir dalam 02:45:30
                </div>
              </div>
              <a href="#" className="text-white hover:text-orange-200 text-sm font-medium">
                Lihat Semua →
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {flashSaleProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <div className="text-center">
                    <div className="text-orange-500 font-bold text-sm">
                      Rp{product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="text-gray-400 text-xs line-through">
                        Rp{product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedCategory === 'Semua' ? 'Semua Produk' : selectedCategory}
            </h2>
            <div className="text-sm text-gray-600">
              {filteredProducts.length} produk ditemukan
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Tidak ada produk ditemukan
              </h3>
              <p className="text-gray-600">
                Coba ubah kata kunci pencarian atau kategori
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isOpen={isProductDetailOpen}
          onClose={handleCloseProductDetail}
        />
      )}
      
      {/* Cart Sidebar */}
      <Cart />
    </div>
  );
}
