import React, { useState } from 'react';
import { X, Save, Plus, Minus, Search } from 'lucide-react';
import { Sale, SaleItem, Medicine, Customer } from '../types';

interface CreateSaleFormProps {
  onClose: () => void;
  onSave: (sale: Omit<Sale, 'id'>) => void;
  medicines: Medicine[];
  customers: Customer[];
}

export const CreateSaleForm: React.FC<CreateSaleFormProps> = ({ onClose, onSave, medicines, customers }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'upi'>('cash');
  const [items, setItems] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedicines = medicines.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    med.quantity > 0
  );

  const addItem = (medicine: Medicine) => {
    const existingItem = items.find(item => item.medicineId === medicine.id);
    if (existingItem) {
      setItems(items.map(item => 
        item.medicineId === medicine.id 
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setItems([...items, {
        medicineId: medicine.id,
        medicineName: medicine.name,
        quantity: 1,
        price: medicine.sellingPrice,
        total: medicine.sellingPrice
      }]);
    }
    setSearchTerm('');
  };

  const updateQuantity = (medicineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems(items.filter(item => item.medicineId !== medicineId));
    } else {
      setItems(items.map(item => 
        item.medicineId === medicineId 
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      ));
    }
  };

  const removeItem = (medicineId: string) => {
    setItems(items.filter(item => item.medicineId !== medicineId));
  };

  const total = items.reduce((sum, item) => sum + item.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Please add at least one item to the sale');
      return;
    }
    if (!customerName.trim()) {
      alert('Please enter customer name');
      return;
    }

    const sale = {
      customerId: customerId || undefined,
      customerName: customerName.trim(),
      items,
      total,
      date: new Date().toISOString().split('T')[0],
      paymentMethod
    };

    onSave(sale);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Sale</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
                <select
                  value={customerId}
                  onChange={(e) => {
                    setCustomerId(e.target.value);
                    const customer = customers.find(c => c.id === e.target.value);
                    if (customer) {
                      setCustomerName(customer.name);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select existing customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card' | 'upi')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
            </div>

            {/* Add Medicines */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Add Medicines</h3>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search medicines..."
                />
              </div>

              {searchTerm && (
                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredMedicines.map(medicine => (
                    <button
                      key={medicine.id}
                      type="button"
                      onClick={() => addItem(medicine)}
                      className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{medicine.name}</div>
                      <div className="text-sm text-gray-600">Rs. {medicine.sellingPrice} - Stock: {medicine.quantity}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sale Items */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sale Items</h3>
            
            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No items added yet. Search and add medicines above.
              </div>
            ) : (
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.medicineId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.medicineName}</div>
                      <div className="text-sm text-gray-600">Rs. {item.price} each</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.medicineId, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.medicineId, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-green-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="w-20 text-right font-medium">Rs. {item.total.toFixed(2)}</div>
                    
                    <button
                      type="button"
                      onClick={() => removeItem(item.medicineId)}
                      className="p-1 text-gray-400 hover:text-red-600 ml-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg font-semibold text-lg">
                  <span>Total:</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Save size={16} className="mr-2" />
              Create Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};