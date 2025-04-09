
import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  CartesianGrid, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip, 
  XAxis, 
  YAxis
} from 'recharts';
import { DashboardMetric } from '@/types';

interface MetricCardProps {
  metric: DashboardMetric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
        <div className="rounded-full p-1">
          {metric.trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-coco-green" />
          ) : metric.trend === 'down' ? (
            <TrendingDown className="h-4 w-4 text-destructive" />
          ) : (
            <Clock className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <p className="text-xs text-muted-foreground">
          {metric.change > 0 ? '+' : ''}{metric.change}% from last period
        </p>
      </CardContent>
    </Card>
  );
};

interface SalesChartProps {
  data: { date: string; total: number }[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          <span>Sales Trend</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
            />
            <YAxis />
            <RechartsTooltip />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="hsl(var(--primary))" 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface LowStockItemProps {
  id: string;
  name: string;
  stock: number;
  total: number;
}

interface LowStockCardProps {
  items: LowStockItemProps[];
}

const LowStockCard: React.FC<LowStockCardProps> = ({ items }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground">{item.stock}/{item.total}</span>
              </div>
              <Progress value={(item.stock / item.total) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardOverviewProps {
  metrics: DashboardMetric[];
  salesData: { date: string; total: number }[];
  lowStockItems: LowStockItemProps[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  metrics,
  salesData,
  lowStockItems
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <SalesChart data={salesData} />
        <LowStockCard items={lowStockItems} />
      </div>
    </div>
  );
};

export default DashboardOverview;
