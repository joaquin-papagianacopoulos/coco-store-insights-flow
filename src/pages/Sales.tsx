
import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import SalesRegister from '../components/Sales/SalesRegister';
import { Sale } from '../types';
import { toast } from 'sonner';

const Sales: React.FC = () => {
  const [recentSales, setRecentSales] = useState<Sale[]>([]);

  const handleSaleComplete = (sale: Sale) => {
    setRecentSales([sale, ...recentSales]);
    toast.success('Sale registered successfully!');
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Sales Register" />
        <div className="flex-1 overflow-y-auto p-6">
          <SalesRegister onSaleComplete={handleSaleComplete} />
        </div>
      </div>
    </div>
  );
};

export default Sales;
