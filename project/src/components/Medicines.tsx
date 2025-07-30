import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle,
  Calendar,
  Filter
} from 'lucide-react';
import { Medicine } from '../types';
import { mockMedicines } from '../data/mockData';
import { AddMedicineForm } from './AddMedicineForm';

export const Medicines: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMedicine = (medicineData: Omit<Medicine, 'id'>) => {
    const newMedicine: Medicine = {
      ...medicineData,
      id: Date.now().toString()
    };
    setMedicines([...medicines, newMedicine]);
  };

  const handleDeleteMedicine = (id: string) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter(m => m.id !== id));
    }
  };
  const categories = ['all', ...Array.from(new Set(medicines.map(m => m.category)))];
  
  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiry <= threeMonthsFromNow;
  };

  const isLowStock = (medicine: Medicine) => medicine.quantity <= medicine.minStockLevel;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Medicine Inventory</h2>
          <p className="text-gray-600 mt-1">Manage your medicine stock and inventory</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-4 lg:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={20} className="mr-2" />
          Add Medicine
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine) => (
          <div key={medicine.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{medicine.name}</h3>
                  <p className="text-sm text-gray-600">{medicine.genericName}</p>
                  <p className="text-sm text-gray-500">{medicine.manufacturer}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteMedicine(medicine.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="text-sm font-medium text-gray-900">{medicine.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Batch:</span>
                  <span className="text-sm font-medium text-gray-900">{medicine.batchNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expiry:</span>
                  <span className={`text-sm font-medium ${isExpiringSoon(medicine.expiryDate) ? 'text-red-600' : 'text-gray-900'}`}>
                    {new Date(medicine.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-sm text-gray-600">Stock:</span>
                  <span className={`ml-1 text-sm font-bold ${isLowStock(medicine) ? 'text-red-600' : 'text-green-600'}`}>
                    {medicine.quantity}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="ml-1 text-sm font-bold text-gray-900">Rs. {medicine.sellingPrice}</span>
                </div>
              </div>

              {/* Alerts */}
              <div className="space-y-2">
                {isLowStock(medicine) && (
                  <div className="flex items-center p-2 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="text-red-600 mr-2" size={16} />
                    <span className="text-sm text-red-800">Low Stock Alert</span>
                  </div>
                )}
                {isExpiringSoon(medicine.expiryDate) && (
                  <div className="flex items-center p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Calendar className="text-yellow-600 mr-2" size={16} />
                    <span className="text-sm text-yellow-800">Expires Soon</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {showAddForm && (
        <AddMedicineForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddMedicine}
        />
      )}
    </div>
  );
};