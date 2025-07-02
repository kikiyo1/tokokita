/**
 * Komponen header utama dengan navigasi dan search bar
 */
import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, Heart, Bell } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

export default function Header({ onSearchChange, onCategorySelect, selectedCategory }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, openCart } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchQuery);
  };
  
  const categories = ['Semua', 'Fashion Pria', 'Fashion Wanita', 'Elektronik', 'Komputer', 'Kecantikan', 'Olahraga'];
  
  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="border-b border-orange-400/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>Jual di Shopee</span>
              <span>Download</span>
              <span>Ikuti kami di</span>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-4 h-4" />
              <span>Notifikasi</span>
              <span>Bantuan</span>
              <span>Bahasa Indonesia</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">
              <span className="text-white">Shopee</span>
            </h1>
            
            {/* Desktop Menu */}
            <nav className="hidden lg:flex space-x-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategorySelect(category)}
                  className={`hover:text-orange-200 transition-colors ${
                    selectedCategory === category ? 'text-orange-200 font-medium' : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Cari di Shopee"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
            
            {/* Popular Searches */}
            <div className="mt-2 flex flex-wrap gap-2">
              {['iPhone', 'Laptop', 'Sepatu', 'Tas', 'Baju'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    onSearchChange(term);
                  }}
                  className="text-xs px-2 py-1 bg-orange-400/20 rounded hover:bg-orange-400/30 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-orange-200">
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline ml-1">Wishlist</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative text-white hover:text-orange-200"
              onClick={openCart}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline ml-1">Keranjang</span>
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5">
                  {totalItems}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white hover:text-orange-200">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline ml-1">Masuk</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-orange-600 border-t border-orange-400/30">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategorySelect(category);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left py-2 hover:text-orange-200 transition-colors ${
                    selectedCategory === category ? 'text-orange-200 font-medium' : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
