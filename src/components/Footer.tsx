/**
 * Komponen footer dengan informasi dan link penting
 */
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Layanan Pelanggan</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Bantuan</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Metode Pembayaran</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Shopee Garansi</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Pengembalian & Penukaran</a></li>
            </ul>
          </div>
          
          {/* About Shopee */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Tentang Shopee</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Karir</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Program Afiliasi</a></li>
            </ul>
          </div>
          
          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Pembayaran</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-white border rounded p-2 text-center">
                <span className="text-xs font-medium text-blue-600">VISA</span>
              </div>
              <div className="bg-white border rounded p-2 text-center">
                <span className="text-xs font-medium text-red-600">MasterCard</span>
              </div>
              <div className="bg-white border rounded p-2 text-center">
                <span className="text-xs font-medium text-blue-800">BCA</span>
              </div>
              <div className="bg-white border rounded p-2 text-center">
                <span className="text-xs font-medium text-green-600">BNI</span>
              </div>
              <div className="bg-white border rounded p-2 text-center">
                <span className="text-xs font-medium text-red-500">BRI</span>
              </div>
              <div className="bg-white border rounded p-2 text-center">
                <span className="text-xs font-medium text-blue-500">Mandiri</span>
              </div>
            </div>
          </div>
          
          {/* Logistics */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Pengiriman</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="bg-white border rounded p-2 text-center">
                <span className="text-xs font-medium text-red-600">JNE</span>
              </div>
              <div className="bg-white border rounded p-2 text-center">
                <span className="text-xs font-medium text-blue-600">J&T</span>
              </div>
              <div className="bg-white border rounded p-2 text-center">
                <span className="text-xs font-medium text-green-600">GoSend</span>
              </div>
              <div className="bg-white border rounded p-2 text-center">
                <span className="text-xs font-medium text-purple-600">SiCepat</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Media */}
        <div className="border-t pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-gray-800 mb-2">Ikuti Kami</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-600">
                © 2024 Shopee. Hak Cipta Dilindungi
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Negara & Wilayah: Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
