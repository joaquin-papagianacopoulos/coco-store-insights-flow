
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import { 
  dashboardMetrics, 
  dailySales,
  products
} from '../data/mockData';

const Dashboard: React.FC = () => {
  // In a real app, we would fetch this data from an API
  const [metrics, setMetrics] = useState(dashboardMetrics);
  const [salesData, setSalesData] = useState(dailySales);
  
  // Generate low stock items from products
  const lowStockItems = products
    .filter(product => product.stock < 35)
    .map(product => ({
      id: product.id,
      name: product.name,
      stock: product.stock,
      total: 100 // This would be the target stock level
    }));

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Dashboard" />
        <div className="flex-1 overflow-y-auto p-6">
          <DashboardOverview 
            metrics={metrics} 
            salesData={salesData}
            lowStockItems={lowStockItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
