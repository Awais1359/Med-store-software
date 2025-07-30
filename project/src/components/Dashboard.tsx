import React from 'react';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { mockMedicines, mockCustomers, mockSales } from '../data/mockData';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}> = ({ title, value, icon, trend, color }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {trend && (
          <p className={`text-sm mt-1 ${color}`}>
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color.includes('green') ? 'bg-green-100' : color.includes('blue') ? 'bg-blue-100' : color.includes('yellow') ? 'bg-yellow-100' : 'bg-red-100'}`}>
        {icon}
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const totalMedicines = mockMedicines.length;
  const lowStockItems = mockMedicines.filter(m => m.quantity <= m.minStockLevel).length;
  const totalCustomers = mockCustomers.length;
  const todaySales = mockSales.reduce((sum, sale) => sum + sale.total, 0);
  const expiringSoon = mockMedicines.filter(m => {
    const expiryDate = new Date(m.expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate <= threeMonthsFromNow;
  }).length;

  const recentSales = mockSales.slice(0, 5);
  const lowStockMedicines = mockMedicines.filter(m => m.quantity <= m.minStockLevel);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Overview of your medical store</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Medicines"
          value={totalMedicines}
          icon={<Package className="text-blue-600" size={24} />}
          color="text-blue-600"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockItems}
          icon={<AlertTriangle className="text-yellow-600" size={24} />}
          trend={lowStockItems > 0 ? "Needs attention" : "All good"}
          color="text-yellow-600"
        />
        <StatCard
          title="Today's Sales"
          value={`Rs. ${todaySales.toFixed(2)}`}
          icon={<DollarSign className="text-green-600" size={24} />}
          trend="↑ 12% from yesterday"
          color="text-green-600"
        />
        <StatCard
          title="Total Customers"
          value={totalCustomers}
          icon={<Users className="text-purple-600" size={24} />}
          trend="↑ 5 new this week"
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <ShoppingCart className="mr-2 text-blue-600" size={20} />
              Recent Sales
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{sale.customerName}</p>
                    <p className="text-sm text-gray-600">{sale.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">Rs. {sale.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 capitalize">{sale.paymentMethod}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="mr-2 text-yellow-600" size={20} />
              Low Stock Alert
            </h3>
          </div>
          <div className="p-6">
            {lowStockMedicines.length === 0 ? (
              <p className="text-gray-600 text-center py-4">All medicines are well stocked!</p>
            ) : (
              <div className="space-y-4">
                {lowStockMedicines.map((medicine) => (
                  <div key={medicine.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-medium text-gray-900">{medicine.name}</p>
                      <p className="text-sm text-gray-600">{medicine.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">{medicine.quantity} left</p>
                      <p className="text-sm text-gray-600">Min: {medicine.minStockLevel}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'medicines' }))}
            className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-blue-700 font-medium"
          >
            <Package className="mr-2" size={20} />
            Add New Medicine
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'sales' }))}
            className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 text-green-700 font-medium"
          >
            <ShoppingCart className="mr-2" size={20} />
            Create Sale
          </button>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }))}
            className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 text-purple-700 font-medium"
          >
            <TrendingUp className="mr-2" size={20} />
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};