"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SalesData {
  date: string;
  sales: number;
  orders: number;
}

interface SalesChartProps {
  data: SalesData[];
  period: 'week' | 'month' | 'year';
  onPeriodChange: (period: 'week' | 'month' | 'year') => void;
}

export default function SalesChart({ data, period, onPeriodChange }: SalesChartProps) {
  const maxSales = Math.max(...data.map(d => d.sales));
  const totalSales = data.reduce((sum, d) => sum + d.sales, 0);
  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (period === 'week') {
      return date.toLocaleDateString('en-NG', { weekday: 'short' });
    } else if (period === 'month') {
      return date.toLocaleDateString('en-NG', { day: 'numeric' });
    } else {
      return date.toLocaleDateString('en-NG', { month: 'short' });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Sales Overview</h3>
          <div className="flex items-center space-x-6 mt-2">
            <div>
              <p className="text-sm text-text-muted">Total Sales</p>
              <p className="text-xl font-bold text-text-primary">{formatCurrency(totalSales)}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Total Orders</p>
              <p className="text-xl font-bold text-text-primary">{totalOrders}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Avg. Order Value</p>
              <p className="text-xl font-bold text-text-primary">{formatCurrency(avgOrderValue)}</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {(['week', 'month', 'year'] as const).map((p) => (
            <Button
              key={p}
              variant={period === p ? "default" : "outline"}
              size="sm"
              onClick={() => onPeriodChange(p)}
              className="capitalize"
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between space-x-2 pl-12">
          {data.map((item, index) => {
            const height = maxSales > 0 ? (item.sales / maxSales) * 100 : 0;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full relative group">
                  {/* Bar */}
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-500 hover:to-blue-300"
                    style={{ height: `${height}%` }}
                  />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background-secondary border border-neutral-700 rounded-lg p-2 text-xs whitespace-nowrap z-10">
                    <p className="font-medium">{formatDate(item.date)}</p>
                    <p className="text-text-muted">Sales: {formatCurrency(item.sales)}</p>
                    <p className="text-text-muted">Orders: {item.orders}</p>
                  </div>
                </div>
                
                {/* Date Label */}
                <p className="text-xs text-text-muted mt-2">{formatDate(item.date)}</p>
              </div>
            );
          })}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-text-muted">
          <span>{formatCurrency(maxSales)}</span>
          <span>{formatCurrency(maxSales * 0.75)}</span>
          <span>{formatCurrency(maxSales * 0.5)}</span>
          <span>{formatCurrency(maxSales * 0.25)}</span>
          <span>₦0</span>
        </div>
      </div>
    </Card>
  );
} 