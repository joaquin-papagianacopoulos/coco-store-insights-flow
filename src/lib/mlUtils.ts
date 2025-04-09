
import { Sale } from '../types';

/**
 * Simple linear regression to predict future sales based on historical data
 */
export const predictSales = (historicalSales: Sale[], daysToPredict: number = 7) => {
  // Group sales by date
  const salesByDate = historicalSales.reduce((acc, sale) => {
    const date = sale.date.split('T')[0];
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += sale.amount;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array of [day_number, amount] pairs for regression
  const data = Object.entries(salesByDate).map(([date, amount], index) => {
    return [index, amount];
  });

  if (data.length < 2) {
    throw new Error('Not enough data for prediction');
  }

  // Simple linear regression
  const n = data.length;
  
  // Calculate means
  let sumX = 0;
  let sumY = 0;
  
  data.forEach(([x, y]) => {
    sumX += x;
    sumY += y;
  });
  
  const meanX = sumX / n;
  const meanY = sumY / n;
  
  // Calculate slope and intercept
  let numerator = 0;
  let denominator = 0;
  
  data.forEach(([x, y]) => {
    numerator += (x - meanX) * (y - meanY);
    denominator += Math.pow(x - meanX, 2);
  });
  
  const slope = numerator / denominator;
  const intercept = meanY - (slope * meanX);
  
  // Generate predictions
  const predictions = [];
  const today = new Date();
  
  for (let i = 1; i <= daysToPredict; i++) {
    const day = n + i - 1; // predict from next day
    const predictedValue = slope * day + intercept;
    const confidenceInterval = 0.15 * predictedValue; // simple 15% confidence interval
    
    const predictionDate = new Date(today);
    predictionDate.setDate(today.getDate() + i);
    
    predictions.push({
      date: predictionDate.toISOString().split('T')[0],
      predictedSales: Math.max(0, predictedValue),
      lowerBound: Math.max(0, predictedValue - confidenceInterval),
      upperBound: predictedValue + confidenceInterval
    });
  }
  
  return predictions;
};

/**
 * Recommend stock levels based on sales velocity
 */
export const recommendStockLevels = (historicalSales: Sale[], products: any[]) => {
  // Create a map to track sales velocity by product
  const productSales = products.reduce((acc, product) => {
    acc[product.id] = {
      id: product.id,
      name: product.name,
      totalSold: 0,
      currentStock: product.stock
    };
    return acc;
  }, {} as Record<string, any>);
  
  // Calculate total sales for each product
  historicalSales.forEach(sale => {
    sale.items.forEach(item => {
      if (productSales[item.productId]) {
        productSales[item.productId].totalSold += item.quantity;
      }
    });
  });
  
  // Calculate average daily sales and recommended stock levels
  const daysCovered = 30; // assume we have 30 days of data
  const stockDaysTarget = 14; // target 14 days of stock
  
  return Object.values(productSales).map(product => {
    const dailySales = product.totalSold / daysCovered;
    const recommendedStock = Math.ceil(dailySales * stockDaysTarget);
    const needsReorder = product.currentStock < recommendedStock;
    
    return {
      id: product.id,
      name: product.name,
      currentStock: product.currentStock,
      recommendedStock,
      needsReorder
    };
  });
};

/**
 * Detect sales anomalies
 */
export const detectSalesAnomalies = (historicalSales: Sale[]) => {
  // Group sales by date
  const salesByDate = historicalSales.reduce((acc, sale) => {
    const date = sale.date.split('T')[0];
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += sale.amount;
    return acc;
  }, {} as Record<string, number>);
  
  const salesArray = Object.values(salesByDate);
  
  if (salesArray.length < 5) {
    return []; // Not enough data
  }
  
  // Calculate mean and standard deviation
  const mean = salesArray.reduce((sum, val) => sum + val, 0) / salesArray.length;
  
  const squaredDiffs = salesArray.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / salesArray.length;
  const stdDev = Math.sqrt(variance);
  
  // Find anomalies (values more than 2 standard deviations from mean)
  const anomalies = Object.entries(salesByDate)
    .filter(([_, amount]) => {
      return Math.abs(amount - mean) > 2 * stdDev;
    })
    .map(([date, amount]) => ({
      date,
      amount,
      expected: mean,
      deviation: (amount - mean) / stdDev
    }));
  
  return anomalies;
};
