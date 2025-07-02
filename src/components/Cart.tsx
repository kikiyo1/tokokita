/**
 * Komponen keranjang belanja dengan slide-out panel
 */
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

export default function Cart() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeItem, 
    toggleSelection,
    getTotalPrice,
    getSelectedItems
  } = useCartStore();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  const selectedItems = getSelectedItems();
  const totalPrice = getTotalPrice();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Keranjang Belanja</h2>
          <Button variant="ghost" size="sm" onClick={closeCart}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM8 16a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-600">Keranjang Anda kosong</p>
              <p className="text-sm text-gray-400 mt-1">Yuk mulai belanja!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <Checkbox
                    checked={item.selected}
                    onCheckedChange={() => toggleSelection(item.product.id)}
                  />
                  
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-gray-800 mb-1 line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-orange-500 font-semibold text-sm mb-2">
                      {formatPrice(item.product.price)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 h-7 w-7"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 h-7 w-7"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer with Total and Checkout */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total ({selectedItems.length} item):</span>
              <span className="text-xl font-bold text-orange-500">
                {formatPrice(totalPrice)}
              </span>
            </div>
            
            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              disabled={selectedItems.length === 0}
            >
              Checkout ({selectedItems.length})
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
