/**
 * Komponen banner promosi dan iklan utama
 */
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    {
      id: 1,
      image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/dea2b5cb-b028-4e89-9287-e4540bfd8f6e.jpg',
      title: 'Flash Sale 12.12',
      subtitle: 'Diskon hingga 90%!'
    },
    {
      id: 2,
      image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/3967c20e-7740-45bf-8d05-234d8bd3f61d.jpg',
      title: 'Gratis Ongkir',
      subtitle: 'Untuk semua pembelian'
    },
    {
      id: 3,
      image: 'https://pub-cdn.sider.ai/u/U08XHO602RN/web-coder/6864d59c0385cdf980573ac8/resource/51485969-dca6-4348-acd4-89783515359e.jpg',
      title: 'Gadget Terkini',
      subtitle: 'Teknologi terdepan'
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [banners.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };
  
  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="relative h-64 md:h-80">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {banner.title}
                </h2>
                <p className="text-lg md:text-xl">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
