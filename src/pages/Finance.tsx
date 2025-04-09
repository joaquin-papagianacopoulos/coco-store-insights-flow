
import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import FinanceTracker from '../components/Finance/FinanceTracker';
import { financeEntries as initialEntries } from '../data/mockData';
import { FinanceEntry } from '../types';
import { toast } from 'sonner';

const Finance: React.FC = () => {
  const [entries, setEntries] = useState<FinanceEntry[]>(initialEntries);

  const handleAddEntry = (entry: FinanceEntry) => {
    setEntries([entry, ...entries]);
    toast.success('Finance entry added successfully');
  };

  const handleRemoveEntry = (entryId: string) => {
    setEntries(entries.filter(entry => entry.id !== entryId));
    toast.success('Finance entry removed');
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Finance" />
        <div className="flex-1 overflow-y-auto p-6">
          <FinanceTracker 
            entries={entries}
            onAddEntry={handleAddEntry}
            onRemoveEntry={handleRemoveEntry}
          />
        </div>
      </div>
    </div>
  );
};

export default Finance;
