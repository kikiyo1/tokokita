/**
 * Komponen detail produk dengan modal overlay
 */
import { useState } from 'react';
import { X, Star, MapPin, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductDetailProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetail({ product, isOpen, onClose }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  
  if (!isOpen) return null;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Detail Produk</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-4">
                {product.isFlashSale && (
                  <Badge className="bg-red-500 text-white mb-2">
                    Flash Sale
                  </Badge>
                )}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <div className="text-gray-600">
                    <span>{product.sold} Terjual</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-orange-500">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      {product.discount && (
                        <Badge className="bg-orange-500 text-white">
                          -{product.discount}%
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {/* Specifications */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Spesifikasi</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="w-24 text-gray-600">{key}</span>
                      <span className="text-gray-800">: {value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Jumlah:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-gray-600">
                    Subtotal: {formatPrice(product.price * quantity)}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Tambah ke Keranjang
                  </Button>
                  <Button variant="outline" className="px-4">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
                
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  Beli Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
