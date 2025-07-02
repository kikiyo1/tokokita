/**
 * Form untuk menambah dan mengedit produk
 */
import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { Product } from '../../types/product';
import { categories } from '../../data/products';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import FileUpload from './FileUpload';

interface ProductFormProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
}

export default function ProductForm({ product, isOpen, onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    category: '',
    description: '',
    rating: 4.5,
    sold: 0,
    location: '',
    discount: 0,
    isFlashSale: false,
    image: '',
    images: [] as string[],
    specifications: {} as { [key: string]: string }
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');
  
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || 0,
        category: product.category,
        description: product.description,
        rating: product.rating,
        sold: product.sold,
        location: product.location,
        discount: product.discount || 0,
        isFlashSale: product.isFlashSale || false,
        image: product.image,
        images: product.images,
        specifications: product.specifications
      });
    } else {
      // Reset form for new product
      setFormData({
        name: '',
        price: 0,
        originalPrice: 0,
        category: '',
        description: '',
        rating: 4.5,
        sold: 0,
        location: '',
        discount: 0,
        isFlashSale: false,
        image: '',
        images: [],
        specifications: {}
      });
    }
  }, [product]);
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert uploaded files to URLs (in real app, upload to server)
    const newImages = uploadedFiles.map(file => URL.createObjectURL(file));
    const allImages = [...formData.images, ...newImages];
    
    const productData = {
      ...formData,
      images: allImages,
      image: allImages[0] || formData.image || 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/a09a9338-98ad-4bcf-81ea-95f70e785aa4.jpg'
    };
    
    if (product) {
      onSave({ ...productData, id: product.id } as Product);
    } else {
      onSave(productData);
    }
    
    onClose();
  };
  
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const addSpecification = () => {
    if (specKey && specValue) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: specValue
        }
      }));
      setSpecKey('');
      setSpecValue('');
    }
  };
  
  const removeSpecification = (key: string) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };
  
  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">
              {product ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Produk *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Masukkan nama produk"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Pilih kategori</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Price Information */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Asli
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diskon (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => handleInputChange('discount', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Jakarta"
                />
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Produk
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Deskripsikan produk Anda..."
              />
            </div>
            
            {/* Flash Sale */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="flashSale"
                checked={formData.isFlashSale}
                onChange={(e) => handleInputChange('isFlashSale', e.target.checked)}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <label htmlFor="flashSale" className="text-sm font-medium text-gray-700">
                Masukkan ke Flash Sale
              </label>
            </div>
            
            {/* Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Produk
              </label>
              <FileUpload 
                onFilesUpload={setUploadedFiles}
                acceptedTypes="image/*"
                maxFiles={5}
                currentFiles={formData.images}
                onRemoveFile={removeImage}
              />
            </div>
            
            {/* Specifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spesifikasi Produk
              </label>
              
              {/* Add Specification */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  placeholder="Nama spesifikasi"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  placeholder="Nilai spesifikasi"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Button type="button" onClick={addSpecification}>
                  Tambah
                </Button>
              </div>
              
              {/* Existing Specifications */}
              <div className="space-y-2">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSpecification(key)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                <Save className="w-4 h-4 mr-2" />
                {product ? 'Update Produk' : 'Simpan Produk'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
