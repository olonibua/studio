"use client";

// Force dynamic rendering for authentication-dependent pages
export const dynamic = 'force-dynamic';

import { useState } from "react";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import AnalyticsOverview from "@/components/analytics/analytics-overview";
import SalesChart from "@/components/analytics/sales-chart";
import ProductPerformance from "@/components/analytics/product-performance";
import InventoryManagement from "@/components/seller/inventory-management";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsPeriod, setAnalyticsPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [productSortBy, setProductSortBy] = useState<'views' | 'revenue' | 'orders' | 'conversion'>('revenue');

  // Mock data
  const stats = {
    totalProducts: 24,
    activeProducts: 18,
    totalSales: 1250000,
    monthlyRevenue: 450000,
    totalOrders: 89,
    pendingOrders: 5,
    completedOrders: 84,
    averageRating: 4.8,
    totalReviews: 156,
  };

  const recentOrders = [
    { id: "ORD-001", customer: "Adaora Johnson", product: "Traditional Mask", amount: 45000, status: "pending", date: "2024-01-15" },
    { id: "ORD-002", customer: "Michael Chen", product: "Kente Cloth", amount: 75000, status: "shipped", date: "2024-01-14" },
    { id: "ORD-003", customer: "Sarah Williams", product: "Bronze Sculpture", amount: 120000, status: "delivered", date: "2024-01-13" },
    { id: "ORD-004", customer: "David Brown", product: "Beaded Jewelry", amount: 25000, status: "processing", date: "2024-01-12" },
  ];

  const products = [
    { id: "1", title: "Traditional African Mask", price: 45000, stock: 5, status: "active", views: 120, likes: 15 },
    { id: "2", title: "Kente Cloth Textile", price: 75000, stock: 3, status: "active", views: 89, likes: 22 },
    { id: "3", title: "Bronze Sculpture", price: 120000, stock: 1, status: "active", views: 200, likes: 45 },
    { id: "4", title: "Beaded Jewelry Set", price: 25000, stock: 10, status: "draft", views: 67, likes: 8 },
  ];

  // Analytics mock data
  const analyticsMetrics = [
    { title: "Total Revenue", value: 1250000, change: 12.5, icon: "revenue", color: "bg-green-500/10 text-green-500" },
    { title: "Total Orders", value: "89", change: 8.3, icon: "orders", color: "bg-blue-500/10 text-blue-500" },
    { title: "New Customers", value: "34", change: -2.1, icon: "customers", color: "bg-purple-500/10 text-purple-500" },
    { title: "Conversion Rate", value: "3.2%", change: 5.7, icon: "conversion", color: "bg-orange-500/10 text-orange-500" },
    { title: "Page Views", value: "2,847", change: 15.2, icon: "views", color: "bg-indigo-500/10 text-indigo-500" },
    { title: "Average Rating", value: "4.8", change: 0.3, icon: "rating", color: "bg-yellow-500/10 text-yellow-500" }
  ];

  const salesData = [
    { date: "2024-01-01", sales: 45000, orders: 3 },
    { date: "2024-01-02", sales: 67000, orders: 4 },
    { date: "2024-01-03", sales: 52000, orders: 2 },
    { date: "2024-01-04", sales: 89000, orders: 6 },
    { date: "2024-01-05", sales: 76000, orders: 5 },
    { date: "2024-01-06", sales: 94000, orders: 7 },
    { date: "2024-01-07", sales: 112000, orders: 8 }
  ];

  const productMetrics = [
    { 
      id: "1", 
      title: "Traditional African Mask", 
      views: 1250, 
      likes: 89, 
      shares: 23, 
      orders: 15, 
      revenue: 675000, 
      conversionRate: 1.2, 
      stock: 5, 
      rating: 4.8, 
      reviewCount: 23 
    },
    { 
      id: "2", 
      title: "Kente Cloth Textile", 
      views: 890, 
      likes: 156, 
      shares: 45, 
      orders: 12, 
      revenue: 900000, 
      conversionRate: 1.35, 
      stock: 3, 
      rating: 4.9, 
      reviewCount: 18 
    },
    { 
      id: "3", 
      title: "Bronze Sculpture", 
      views: 2100, 
      likes: 234, 
      shares: 67, 
      orders: 8, 
      revenue: 960000, 
      conversionRate: 0.38, 
      stock: 1, 
      rating: 4.7, 
      reviewCount: 12 
    }
  ];

  const inventoryItems = [
    {
      id: "1",
      title: "Traditional African Mask",
      sku: "TAM-001",
      stock: 5,
      lowStockThreshold: 3,
      price: 45000,
      cost: 25000,
      category: "Masks",
      status: "active" as const,
      lastUpdated: "2024-01-15"
    },
    {
      id: "2",
      title: "Kente Cloth Textile",
      sku: "KCT-002",
      stock: 2,
      lowStockThreshold: 5,
      price: 75000,
      cost: 40000,
      category: "Textiles",
      status: "active" as const,
      lastUpdated: "2024-01-14"
    },
    {
      id: "3",
      title: "Bronze Sculpture",
      sku: "BS-003",
      stock: 0,
      lowStockThreshold: 2,
      price: 120000,
      cost: 70000,
      category: "Sculptures",
      status: "active" as const,
      lastUpdated: "2024-01-13"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-500";
      case "processing": return "text-blue-500";
      case "shipped": return "text-purple-500";
      case "delivered": return "text-green-500";
      case "active": return "text-green-500";
      case "draft": return "text-gray-500";
      default: return "text-text-muted";
    }
  };

  const handleUpdateStock = (id: string, newStock: number) => {
    console.log(`Updating stock for ${id} to ${newStock}`);
  };

  const handleUpdatePrice = (id: string, newPrice: number) => {
    console.log(`Updating price for ${id} to ${newPrice}`);
  };

  const handleUpdateStatus = (id: string, status: 'active' | 'inactive') => {
    console.log(`Updating status for ${id} to ${status}`);
  };

  const AnalyticsTab = () => (
    <div className="space-y-8">
      <AnalyticsOverview metrics={analyticsMetrics} period={analyticsPeriod} />
      <SalesChart 
        data={salesData} 
        period={analyticsPeriod} 
        onPeriodChange={setAnalyticsPeriod} 
      />
      <ProductPerformance 
        products={productMetrics} 
        sortBy={productSortBy} 
        onSortChange={setProductSortBy} 
      />
    </div>
  );

  const InventoryTab = () => (
    <InventoryManagement
      items={inventoryItems}
      onUpdateStock={handleUpdateStock}
      onUpdatePrice={handleUpdatePrice}
      onUpdateStatus={handleUpdateStatus}
    />
  );

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-light mb-2">Seller Dashboard</h1>
            <p className="text-text-muted">Manage your products and track your sales</p>
          </div>
          <Button className="bg-text-primary text-background-primary hover:bg-text-secondary">
            Add New Product
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-background-secondary rounded-lg p-1">
          {[
            { id: "overview", label: "Overview" },
            { id: "products", label: "Products" },
            { id: "inventory", label: "Inventory" },
            { id: "orders", label: "Orders" },
            { id: "analytics", label: "Analytics" },
            { id: "settings", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-text-primary text-background-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-text-primary">{formatPrice(stats.totalSales)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-500 text-sm">+12.5%</span>
                  <span className="text-text-muted text-sm ml-1">vs last month</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-sm">Total Products</p>
                    <p className="text-2xl font-bold text-text-primary">{stats.totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-text-muted text-sm">{stats.activeProducts} active</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-text-primary">{stats.totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-yellow-500 text-sm">{stats.pendingOrders} pending</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-sm">Average Rating</p>
                    <p className="text-2xl font-bold text-text-primary">{stats.averageRating}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-text-muted text-sm">{stats.totalReviews} reviews</span>
                </div>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="text-left py-3 text-text-muted">Order ID</th>
                      <th className="text-left py-3 text-text-muted">Customer</th>
                      <th className="text-left py-3 text-text-muted">Product</th>
                      <th className="text-left py-3 text-text-muted">Amount</th>
                      <th className="text-left py-3 text-text-muted">Status</th>
                      <th className="text-left py-3 text-text-muted">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-neutral-800/50">
                        <td className="py-4 font-medium">{order.id}</td>
                        <td className="py-4">{order.customer}</td>
                        <td className="py-4">{order.product}</td>
                        <td className="py-4">{formatPrice(order.amount)}</td>
                        <td className="py-4">
                          <span className={`capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-text-muted">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Your Products</h2>
              <div className="flex space-x-3">
                <Button variant="outline">Import Products</Button>
                <Button>Add New Product</Button>
              </div>
            </div>

            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="text-left py-3 text-text-muted">Product</th>
                      <th className="text-left py-3 text-text-muted">Price</th>
                      <th className="text-left py-3 text-text-muted">Stock</th>
                      <th className="text-left py-3 text-text-muted">Status</th>
                      <th className="text-left py-3 text-text-muted">Views</th>
                      <th className="text-left py-3 text-text-muted">Likes</th>
                      <th className="text-left py-3 text-text-muted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-neutral-800/50">
                        <td className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-background-tertiary rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium">{product.title}</p>
                              <p className="text-sm text-text-muted">ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">{formatPrice(product.price)}</td>
                        <td className="py-4">{product.stock}</td>
                        <td className="py-4">
                          <span className={`capitalize ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="py-4">{product.views}</td>
                        <td className="py-4">{product.likes}</td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === "inventory" && <InventoryTab />}

        {/* Analytics Tab */}
        {activeTab === "analytics" && <AnalyticsTab />}

        {/* Other tabs placeholder */}
        {activeTab === "orders" && (
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Orders Management</h2>
            <p className="text-text-muted">Advanced order management interface will be implemented here</p>
          </Card>
        )}

        {activeTab === "settings" && (
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Seller Settings</h2>
            <p className="text-text-muted">Seller profile and shop settings will be implemented here</p>
          </Card>
        )}
      </div>
    </div>
  );
} 