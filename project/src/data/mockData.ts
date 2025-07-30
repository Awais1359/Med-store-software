import { Medicine, Customer, Supplier, Sale } from '../types';

export const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    manufacturer: 'GlaxoSmithKline',
    batchNumber: 'PCM001',
    expiryDate: '2025-12-31',
    quantity: 150,
    minStockLevel: 20,
    purchasePrice: 2.50,
    sellingPrice: 3.00,
    category: 'Pain Relief',
    description: 'Pain and fever relief medication'
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    genericName: 'Amoxicillin',
    manufacturer: 'Cipla',
    batchNumber: 'AMX002',
    expiryDate: '2025-08-15',
    quantity: 85,
    minStockLevel: 15,
    purchasePrice: 12.00,
    sellingPrice: 15.00,
    category: 'Antibiotic',
    description: 'Broad-spectrum antibiotic'
  },
  {
    id: '3',
    name: 'Vitamin D3 1000IU',
    genericName: 'Cholecalciferol',
    manufacturer: 'Sun Pharma',
    batchNumber: 'VD3003',
    expiryDate: '2026-03-20',
    quantity: 12,
    minStockLevel: 25,
    purchasePrice: 8.50,
    sellingPrice: 11.00,
    category: 'Vitamin',
    description: 'Vitamin D supplement'
  },
  {
    id: '4',
    name: 'Metformin 500mg',
    genericName: 'Metformin HCl',
    manufacturer: 'Dr. Reddy\'s',
    batchNumber: 'MTF004',
    expiryDate: '2025-10-10',
    quantity: 200,
    minStockLevel: 30,
    purchasePrice: 4.25,
    sellingPrice: 5.50,
    category: 'Diabetes',
    description: 'Type 2 diabetes medication'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Ahmed Ali',
    phone: '+92-300-1234567',
    email: 'ahmed.ali@email.com',
    address: 'Block A, Gulshan-e-Iqbal, Karachi',
    dateOfBirth: '1985-05-15',
    totalPurchases: 1250.00
  },
  {
    id: '2',
    name: 'Fatima Khan',
    phone: '+92-321-9876543',
    address: 'DHA Phase 2, Lahore',
    totalPurchases: 890.50
  },
  {
    id: '3',
    name: 'Muhammad Hassan',
    phone: '+92-333-5555555',
    email: 'hassan@email.com',
    address: 'F-7 Markaz, Islamabad',
    dateOfBirth: '1992-12-03',
    totalPurchases: 2100.75
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'MediCorp Distributors',
    contactPerson: 'Tariq Ahmed',
    phone: '+92-21-34567890',
    email: 'info@medicorp.pk',
    address: 'Industrial Area, Karachi',
    medicines: ['1', '2']
  },
  {
    id: '2',
    name: 'HealthPlus Supplies',
    contactPerson: 'Sana Malik',
    phone: '+92-42-35678901',
    email: 'contact@healthplus.pk',
    address: 'Main Boulevard, Lahore',
    medicines: ['3', '4']
  }
];

export const mockSales: Sale[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'Ahmed Ali',
    items: [
      { medicineId: '1', medicineName: 'Paracetamol 500mg', quantity: 10, price: 3.00, total: 30.00 },
      { medicineId: '2', medicineName: 'Amoxicillin 250mg', quantity: 5, price: 15.00, total: 75.00 }
    ],
    total: 105.00,
    date: '2025-01-13',
    paymentMethod: 'cash'
  },
  {
    id: '2',
    customerName: 'Walk-in Customer',
    items: [
      { medicineId: '3', medicineName: 'Vitamin D3 1000IU', quantity: 2, price: 11.00, total: 22.00 }
    ],
    total: 22.00,
    date: '2025-01-13',
    paymentMethod: 'card'
  }
];