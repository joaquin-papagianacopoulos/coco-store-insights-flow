
import React from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import AnalyticsView from '../components/Analytics/AnalyticsView';
import { 
  dailySales, 
  salesByCategory, 
  salesPredictions 
} from '../data/mockData';

const Analytics: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Analytics" />
        <div className="flex-1 overflow-y-auto p-6">
          <AnalyticsView 
            dailySales={dailySales} 
            salesByCategory={salesByCategory}
            salesPredictions={salesPredictions}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
