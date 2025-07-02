/**
 * Komponen kartu produk untuk menampilkan informasi produk
 */
import { Heart, Star, MapPin } from 'lucide-react';
import { Product } from '../types/product';
import { useCartStore } from '../store/cartStore';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { addItem } = useCartStore();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onClick(product)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isFlashSale && (
            <Badge className="bg-red-500 text-white text-xs">
              Flash Sale
            </Badge>
          )}
          {product.discount && (
            <Badge className="bg-orange-500 text-white text-xs">
              -{product.discount}%
            </Badge>
          )}
        </div>
        
        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 font-bold text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        {/* Rating and Sales */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
            <span className="text-gray-400">|</span>
            <span>Terjual {product.sold}</span>
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{product.location}</span>
        </div>
        
        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          size="sm"
        >
          + Keranjang
        </Button>
      </div>
    </div>
  );
}
