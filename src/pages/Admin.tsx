/**
 * Halaman utama admin dengan routing internal
 */
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProductTable from '../components/admin/ProductTable';
import ProductForm from '../components/admin/ProductForm';
import ProductDetail from '../components/ProductDetail';
import { useAdminStore } from '../store/adminStore';
import { products } from '../data/products';
import { Product } from '../types/product';
import { Button } from '../components/ui/button';

export default function Admin() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  
  const { 
    products: adminProducts, 
    setProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct 
  } = useAdminStore();
  
  // Initialize products from demo data
  useEffect(() => {
    if (adminProducts.length === 0) {
      setProducts(products);
    }
  }, [adminProducts.length, setProducts]);
  
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsProductFormOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductFormOpen(true);
  };
  
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };
  
  const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) {
      // Update existing product
      updateProduct(productData.id, productData);
    } else {
      // Add new product
      addProduct(productData);
    }
    setIsProductFormOpen(false);
    setSelectedProduct(null);
  };
  
  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
  };
  
  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard />;
        
      case 'products':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Manajemen Produk</h2>
                <p className="text-gray-600">Kelola semua produk di toko Anda</p>
              </div>
              <Button onClick={handleAddProduct} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Produk
              </Button>
            </div>
            
            <ProductTable
              products={adminProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onView={handleViewProduct}
            />
          </div>
        );
        
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Manajemen Pesanan</h2>
            <p className="text-gray-600">Fitur manajemen pesanan akan segera tersedia.</p>
          </div>
        );
        
      case 'customers':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Manajemen Pelanggan</h2>
            <p className="text-gray-600">Fitur manajemen pelanggan akan segera tersedia.</p>
          </div>
        );
        
      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Analitik & Laporan</h2>
            <p className="text-gray-600">Fitur analitik dan laporan akan segera tersedia.</p>
          </div>
        );
        
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Pengaturan Sistem</h2>
            <p className="text-gray-600">Fitur pengaturan sistem akan segera tersedia.</p>
          </div>
        );
        
      default:
        return <AdminDashboard />;
    }
  };
  
  return (
    <>
      <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPageContent()}
      </AdminLayout>
      
      {/* Product Form Modal */}
      <ProductForm
        product={selectedProduct}
        isOpen={isProductFormOpen}
        onClose={() => {
          setIsProductFormOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
      />
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isOpen={isProductDetailOpen}
          onClose={() => {
            setIsProductDetailOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
}
