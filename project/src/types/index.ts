export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  minStockLevel: number;
  purchasePrice: number;
  sellingPrice: number;
  category: string;
  description?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  dateOfBirth?: string;
  totalPurchases: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  medicines: string[];
}

export interface Sale {
  id: string;
  customerId?: string;
  customerName: string;
  items: SaleItem[];
  total: number;
  date: string;
  paymentMethod: 'cash' | 'card' | 'upi';
}

export interface SaleItem {
  medicineId: string;
  medicineName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface DashboardStats {
  totalMedicines: number;
  lowStockItems: number;
  todaySales: number;
  totalCustomers: number;
  monthlyRevenue: number;
  expiringSoon: number;
}