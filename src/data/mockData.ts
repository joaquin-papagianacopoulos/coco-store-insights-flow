
import { Sale, Product, FinanceEntry, SalesPrediction, DashboardMetric } from '../types';

const today = new Date();
const oneDay = 24 * 60 * 60 * 1000;

// Helper to create dates in the past
const daysAgo = (days: number): string => {
  return new Date(today.getTime() - (days * oneDay)).toISOString().split('T')[0];
};

// Mock Products
export const products: Product[] = [
  {
    id: 'p1',
    name: 'Coco Shampoo',
    description: 'Natural coconut shampoo',
    price: 12.99,
    stock: 45,
    category: 'Personal Care',
    costPrice: 5.50
  },
  {
    id: 'p2',
    name: 'Coconut Oil',
    description: 'Organic virgin coconut oil',
    price: 8.99,
    stock: 78,
    category: 'Foods',
    costPrice: 3.75
  },
  {
    id: 'p3',
    name: 'Coco Body Lotion',
    description: 'Moisturizing coconut body lotion',
    price: 14.50,
    stock: 32,
    category: 'Personal Care',
    costPrice: 6.20
  },
  {
    id: 'p4',
    name: 'Coconut Water',
    description: 'Pure coconut water',
    price: 3.49,
    stock: 120,
    category: 'Drinks',
    costPrice: 1.25
  },
  {
    id: 'p5',
    name: 'Coconut Lip Balm',
    description: 'Hydrating coconut lip balm',
    price: 4.99,
    stock: 65,
    category: 'Personal Care',
    costPrice: 1.80
  }
];

// Mock Sales
export const sales: Sale[] = [
  {
    id: 's1',
    date: daysAgo(0),
    amount: 26.98,
    items: [
      {
        id: 'si1',
        productId: 'p1',
        productName: 'Coco Shampoo',
        quantity: 1,
        unitPrice: 12.99,
        total: 12.99
      },
      {
        id: 'si2',
        productId: 'p2',
        productName: 'Coconut Oil',
        quantity: 1,
        unitPrice: 8.99,
        total: 8.99
      },
      {
        id: 'si3',
        productId: 'p5',
        productName: 'Coconut Lip Balm',
        quantity: 1,
        unitPrice: 4.99,
        total: 4.99
      }
    ],
    customer: 'Maria Rodriguez',
    paymentMethod: 'cash'
  },
  {
    id: 's2',
    date: daysAgo(1),
    amount: 18.98,
    items: [
      {
        id: 'si4',
        productId: 'p3',
        productName: 'Coco Body Lotion',
        quantity: 1,
        unitPrice: 14.50,
        total: 14.50
      },
      {
        id: 'si5',
        productId: 'p4',
        productName: 'Coconut Water',
        quantity: 1,
        unitPrice: 3.49,
        total: 3.49
      }
    ],
    customer: 'John Smith',
    paymentMethod: 'credit'
  },
  {
    id: 's3',
    date: daysAgo(1),
    amount: 27.98,
    items: [
      {
        id: 'si6',
        productId: 'p1',
        productName: 'Coco Shampoo',
        quantity: 1,
        unitPrice: 12.99,
        total: 12.99
      },
      {
        id: 'si7',
        productId: 'p3',
        productName: 'Coco Body Lotion',
        quantity: 1,
        unitPrice: 14.50,
        total: 14.50
      }
    ],
    customer: 'Ana Lopez',
    paymentMethod: 'debit'
  },
  {
    id: 's4',
    date: daysAgo(2),
    amount: 12.99,
    items: [
      {
        id: 'si8',
        productId: 'p1',
        productName: 'Coco Shampoo',
        quantity: 1,
        unitPrice: 12.99,
        total: 12.99
      }
    ],
    paymentMethod: 'cash'
  },
  {
    id: 's5',
    date: daysAgo(3),
    amount: 13.98,
    items: [
      {
        id: 'si9',
        productId: 'p4',
        productName: 'Coconut Water',
        quantity: 4,
        unitPrice: 3.49,
        total: 13.96
      }
    ],
    customer: 'Carlos Mendez',
    paymentMethod: 'cash'
  },
  {
    id: 's6',
    date: daysAgo(3),
    amount: 31.47,
    items: [
      {
        id: 'si10',
        productId: 'p2',
        productName: 'Coconut Oil',
        quantity: 2,
        unitPrice: 8.99,
        total: 17.98
      },
      {
        id: 'si11',
        productId: 'p5',
        productName: 'Coconut Lip Balm',
        quantity: 3,
        unitPrice: 4.49,
        total: 13.47
      }
    ],
    customer: 'Elena Torres',
    paymentMethod: 'credit'
  },
];

// Mock Finance Entries
export const financeEntries: FinanceEntry[] = [
  {
    id: 'f1',
    date: daysAgo(0),
    amount: 500,
    category: 'Salary',
    description: 'Withdrew for employee salary',
    type: 'expense'
  },
  {
    id: 'f2',
    date: daysAgo(7),
    amount: 300,
    category: 'Rent',
    description: 'Store rent payment',
    type: 'expense'
  },
  {
    id: 'f3',
    date: daysAgo(10),
    amount: 2500,
    category: 'Investment',
    description: 'Personal investment into business',
    type: 'income'
  },
  {
    id: 'f4',
    date: daysAgo(14),
    amount: 150,
    category: 'Utilities',
    description: 'Electricity bill',
    type: 'expense'
  },
  {
    id: 'f5',
    date: daysAgo(21),
    amount: 800,
    category: 'Supplies',
    description: 'New product inventory',
    type: 'expense'
  }
];

// Mock Sales Predictions
export const salesPredictions: SalesPrediction[] = [
  { date: daysAgo(-1), predictedSales: 120, lowerBound: 100, upperBound: 140 },
  { date: daysAgo(-2), predictedSales: 130, lowerBound: 110, upperBound: 150 },
  { date: daysAgo(-3), predictedSales: 125, lowerBound: 105, upperBound: 145 },
  { date: daysAgo(-4), predictedSales: 140, lowerBound: 120, upperBound: 160 },
  { date: daysAgo(-5), predictedSales: 135, lowerBound: 115, upperBound: 155 },
  { date: daysAgo(-6), predictedSales: 150, lowerBound: 130, upperBound: 170 },
  { date: daysAgo(-7), predictedSales: 145, lowerBound: 125, upperBound: 165 }
];

// Dashboard metrics
export const dashboardMetrics: DashboardMetric[] = [
  {
    label: 'Total Sales (Today)',
    value: '$125.45',
    change: 12.5,
    trend: 'up'
  },
  {
    label: 'Items Sold (Today)',
    value: '18',
    change: 5.3,
    trend: 'up'
  },
  {
    label: 'Low Stock Items',
    value: '3',
    change: -2,
    trend: 'down'
  },
  {
    label: 'Profit Margin',
    value: '32%',
    change: 1.2,
    trend: 'up'
  }
];

// Daily sales for the last 30 days (for charts)
export const dailySales: { date: string; total: number }[] = Array.from({ length: 30 }, (_, i) => {
  const randomSale = Math.floor(Math.random() * 150) + 50;
  return {
    date: daysAgo(29 - i),
    total: randomSale
  };
});

// Sales by category
export const salesByCategory = [
  { category: 'Personal Care', total: 1245.67 },
  { category: 'Foods', total: 876.32 },
  { category: 'Drinks', total: 543.21 }
];

// Low stock products
export const lowStockProducts = products.filter(p => p.stock < 35);
