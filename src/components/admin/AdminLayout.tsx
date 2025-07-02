/**
 * Layout utama untuk admin dashboard
 */
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  Bell,
  User,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function AdminLayout({ children, currentPage, onPageChange }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Produk', icon: Package },
    { id: 'orders', label: 'Pesanan', icon: ShoppingCart, badge: '5' },
    { id: 'customers', label: 'Pelanggan', icon: Users },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-16'
      }`}>
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="font-bold text-gray-800">Admin Panel</h1>
                <p className="text-xs text-gray-500">Shopee Clone</p>
              </div>
            )}
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onPageChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {isSidebarOpen && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {currentPage === 'products' ? 'Manajemen Produk' : 
                 currentPage === 'dashboard' ? 'Dashboard' :
                 currentPage === 'orders' ? 'Manajemen Pesanan' :
                 currentPage === 'customers' ? 'Manajemen Pelanggan' :
                 currentPage === 'analytics' ? 'Analitik' : 'Pengaturan'}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-700">Admin</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
