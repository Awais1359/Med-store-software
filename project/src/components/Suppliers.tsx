import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  Plus, 
  Edit, 
  Phone, 
  Mail, 
  MapPin,
  Package
} from 'lucide-react';
import { Supplier } from '../types';
import { mockSuppliers } from '../data/mockData';
import { AddSupplierForm } from './AddSupplierForm';

export const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSupplier = (supplierData: Omit<Supplier, 'id' | 'medicines'>) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: Date.now().toString(),
      medicines: []
    };
    setSuppliers([...suppliers, newSupplier]);
  };
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Supplier Management</h2>
          <p className="text-gray-600 mt-1">Manage supplier information and relationships</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="mt-4 lg:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus size={20} className="mr-2" />
          Add Supplier
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search suppliers by name, contact person, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{supplier.name}</h3>
                  <p className="text-gray-600 mt-1">Contact: {supplier.contactPerson}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit size={16} />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-3 text-gray-400" />
                  {supplier.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={16} className="mr-3 text-gray-400" />
                  {supplier.email}
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin size={16} className="mr-3 mt-0.5 text-gray-400 flex-shrink-0" />
                  <span>{supplier.address}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Supplied Medicines</span>
                  <div className="flex items-center text-blue-600">
                    <Package size={16} className="mr-1" />
                    <span className="text-sm font-semibold">{supplier.medicines.length}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  View Products
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  New Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <Truck className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      )}

      {showAddForm && (
        <AddSupplierForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddSupplier}
        />
      )}
    </div>
  );
};