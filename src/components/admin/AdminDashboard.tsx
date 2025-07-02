/**
 * Komponen utama admin dashboard dengan statistik dan overview
 */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Produk',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Pesanan Hari Ini',
      value: '89',
      change: '+5%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'Total Pelanggan',
      value: '5,678',
      change: '+18%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Pendapatan',
      value: 'Rp 125.5M',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-orange-500'
    }
  ];
  
  const salesData = [
    { month: 'Jan', sales: 65 },
    { month: 'Feb', sales: 59 },
    { month: 'Mar', sales: 80 },
    { month: 'Apr', sales: 81 },
    { month: 'May', sales: 56 },
    { month: 'Jun', sales: 55 },
    { month: 'Jul', sales: 40 }
  ];
  
  const categoryData = [
    { name: 'Fashion', value: 35, color: '#FF6B6B' },
    { name: 'Elektronik', value: 25, color: '#4ECDC4' },
    { name: 'Makanan', value: 20, color: '#45B7D1' },
    { name: 'Kecantikan', value: 15, color: '#96CEB4' },
    { name: 'Lainnya', value: 5, color: '#FFEAA7' }
  ];
  
  const recentOrders = [
    { id: '#12345', customer: 'John Doe', product: 'iPhone 13', amount: 'Rp 12.000.000', status: 'Dikemas' },
    { id: '#12346', customer: 'Jane Smith', product: 'Samsung Galaxy', amount: 'Rp 8.500.000', status: 'Dikirim' },
    { id: '#12347', customer: 'Bob Johnson', product: 'MacBook Pro', amount: 'Rp 25.000.000', status: 'Selesai' },
    { id: '#12348', customer: 'Alice Brown', product: 'iPad Air', amount: 'Rp 7.500.000', status: 'Menunggu' }
  ];
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500">{stat.change}</span>
                    <span className="text-sm text-gray-500 ml-1">vs bulan lalu</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Penjualan Bulanan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#FF6B35" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Category Chart */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori Produk</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Pesanan Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      className={
                        order.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                        order.status === 'Dikirim' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Dikemas' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
