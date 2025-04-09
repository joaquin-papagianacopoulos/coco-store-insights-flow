
import React from 'react';
import { 
  BarChart,
  Bar,
  LineChart as RLineChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartPie, LineChart, BarChart2, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SalesPrediction } from '@/types';
import { cn } from '@/lib/utils';

interface SalesDataProps {
  dailySales: { date: string; total: number }[];
  salesByCategory: { category: string; total: number }[];
  salesPredictions: SalesPrediction[];
}

const COLORS = ['#4CAF50', '#8B5A2B', '#0288D1', '#D2B48C'];

const AnalyticsView: React.FC<SalesDataProps> = ({
  dailySales,
  salesByCategory,
  salesPredictions
}) => {
  return (
    <Tabs defaultValue="trends">
      <TabsList className="mb-6">
        <TabsTrigger value="trends" className="flex items-center gap-2">
          <LineChart size={16} />
          <span>Trends</span>
        </TabsTrigger>
        <TabsTrigger value="categories" className="flex items-center gap-2">
          <ChartPie size={16} />
          <span>By Category</span>
        </TabsTrigger>
        <TabsTrigger value="predictions" className="flex items-center gap-2">
          <Brain size={16} />
          <span>ML Predictions</span>
          <Badge variant="outline" className="ml-2 bg-coco-blue-light text-white">AI</Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="trends" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart size={20} />
              <span>Daily Sales Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ResponsiveContainer width="100%" height={400}>
              <RLineChart data={dailySales} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                  }}
                />
                <YAxis />
                <RechartsTooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Sales']}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return `Date: ${date.toLocaleDateString()}`;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  name="Sales" 
                  stroke="#4CAF50" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </RLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="categories" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartPie size={20} />
              <span>Sales by Category</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="total"
                    nameKey="category"
                  >
                    {salesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total Sales']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 size={20} />
              <span>Category Comparison</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesByCategory}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total Sales']}
                  />
                  <Bar dataKey="total" fill="#8B5A2B" name="Sales">
                    {salesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="predictions">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Brain size={20} />
              <span>Sales Predictions (ML-powered)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Sales predictions for the next 7 days based on machine learning analysis of your historical data.
                The shaded area represents the prediction confidence interval.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <RLineChart
                data={salesPredictions}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                  }}
                />
                <YAxis />
                <RechartsTooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Predicted Sales']}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return `Date: ${date.toLocaleDateString()}`;
                  }}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="lowerBound"
                  stroke="#4CAF50"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="monotone"
                  dataKey="upperBound"
                  stroke="#4CAF50"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                  activeDot={false}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Line
                  type="monotone"
                  dataKey="predictedSales"
                  name="Predicted Sales"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Legend />
              </RLineChart>
            </ResponsiveContainer>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Prediction Details</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="text-left">
                      <th className="py-2 px-4 font-medium">Date</th>
                      <th className="py-2 px-4 font-medium">Prediction</th>
                      <th className="py-2 px-4 font-medium">Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {salesPredictions.map((prediction, index) => (
                      <tr key={index} className={cn(index % 2 === 0 ? 'bg-muted/50' : '')}>
                        <td className="py-2 px-4">
                          {new Date(prediction.date).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4">
                          ${prediction.predictedSales.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-muted-foreground">
                          ${prediction.lowerBound?.toFixed(2)} - ${prediction.upperBound?.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsView;
