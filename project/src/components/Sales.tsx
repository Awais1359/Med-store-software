import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Calendar, 
  DollarSign,
  Receipt,
  User
} from 'lucide-react';
import { Sale } from '../types';
import { mockSales } from '../data/mockData';
import { CreateSaleForm } from './CreateSaleForm';
import { mockMedicines, mockCustomers } from '../data/mockData';

export const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateSale = (saleData: Omit<Sale, 'id'>) => {
    const newSale: Sale = {
      ...saleData,
      id: Date.now().toString()
    };
    setSales([newSale, ...sales]);
  };
  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !selectedDate || sale.date === selectedDate;
    return matchesSearch && matchesDate;
  });

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Sales Management</h2>
          <p className="text-gray-600 mt-1">Track and manage all sales transactions</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="mt-4 lg:mt-0 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          <Plus size={20} className="mr-2" />
          New Sale
        </button>
      </div>

      {/* Stats and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">Rs. {totalSales.toFixed(2)}</p>
            </div>
            <DollarSign className="text-green-600" size={24} />
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by customer name or sale ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sales List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredSales.map((sale) => (
            <div key={sale.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Receipt className="text-blue-600" size={20} />
                    <span className="font-semibold text-gray-900">Sale #{sale.id}</span>
                    <span className="text-sm text-gray-500">{new Date(sale.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="text-gray-400" size={16} />
                    <span className="text-gray-700">{sale.customerName}</span>
                  </div>
                  <div className="space-y-1">
                    {sale.items.map((item, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {item.medicineName} × {item.quantity} = Rs. {item.total.toFixed(2)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 text-right">
                  <div className="text-2xl font-bold text-gray-900">Rs. {sale.total.toFixed(2)}</div>
                  <div className="text-sm text-gray-600 capitalize">{sale.paymentMethod}</div>
                  <div className="text-sm text-gray-500">{sale.items.length} items</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredSales.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sales found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}

      {showCreateForm && (
        <CreateSaleForm
          onClose={() => setShowCreateForm(false)}
          onSave={handleCreateSale}
          medicines={mockMedicines}
          customers={mockCustomers}
        />
      )}
    </div>
  );
};