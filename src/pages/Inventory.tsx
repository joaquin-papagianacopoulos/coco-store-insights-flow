
import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import InventoryManager from '../components/Inventory/InventoryManager';
import { products as initialProducts } from '../data/mockData';
import { toast } from 'sonner';

const Inventory: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts(
      products.map(product =>
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
    toast.success('Stock updated successfully');
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Inventory" />
        <div className="flex-1 overflow-y-auto p-6">
          <InventoryManager products={products} onUpdateStock={handleUpdateStock} />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
