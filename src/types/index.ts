
export interface Sale {
  id: string;
  date: string;
  amount: number;
  items: SaleItem[];
  customer?: string;
  paymentMethod: 'cash' | 'credit' | 'debit' | 'other';
}

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  costPrice?: number;
}

export interface FinanceEntry {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
}

export interface SalesPrediction {
  date: string;
  predictedSales: number;
  lowerBound?: number;
  upperBound?: number;
}

export interface DashboardMetric {
  label: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
  }[];
}
