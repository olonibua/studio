"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice } from "@/lib/utils";
import WishlistButton from "@/components/ui/wishlist-button";

export default function BuyerDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();
  const [activeTab, setActiveTab] = useState("overview");

  // Get tab from URL params if available
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  if (!user) {
    router.push('/login');
    return null;
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "wishlist", label: "Wishlist", icon: "❤️" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  // Mock data
  const mockOrders = [
    {
      id: "MOSE-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 45000,
      items: 2,
    },
    {
      id: "MOSE-002",
      date: "2024-01-10",
      status: "Shipped",
      total: 28500,
      items: 1,
    },
    {
      id: "MOSE-003",
      date: "2024-01-05",
      status: "Processing",
      total: 67200,
      items: 3,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-sm">Total Orders</p>
                    <p className="text-2xl font-semibold text-text-primary">12</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-sm">Total Spent</p>
                    <p className="text-2xl font-semibold text-text-primary">{formatPrice(485000)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-muted text-sm">Wishlist Items</p>
                    <p className="text-2xl font-semibold text-text-primary">{wishlistItems.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">❤️</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {mockOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-lg">
                    <div>
                      <p className="font-medium text-text-primary">Order #{order.id}</p>
                      <p className="text-sm text-text-muted">{order.date} • {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-text-primary">{formatPrice(order.total)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Order History</h3>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-background-secondary rounded-lg">
                    <div>
                      <p className="font-medium text-text-primary">Order #{order.id}</p>
                      <p className="text-sm text-text-muted">{order.date} • {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-text-primary">{formatPrice(order.total)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                        order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case "wishlist":
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">My Wishlist</h3>
                <p className="text-text-muted">{wishlistItems.length} items</p>
              </div>
              
              {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-background-secondary rounded-full flex items-center justify-center">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <h4 className="text-lg font-medium text-text-primary mb-2">Your wishlist is empty</h4>
                  <p className="text-text-muted mb-4">Save items you love to buy them later</p>
                  <Button onClick={() => router.push('/products')}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((product) => (
                    <Card key={product.$id} className="overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          src={product.images?.[0] || "/placeholder-product.jpg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <WishlistButton product={product} />
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-text-primary mb-2">{product.title}</h4>
                        <p className="text-text-muted text-sm mb-2">
                          by {product.sellerName}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-text-primary">
                            {formatPrice(product.salePrice || product.price)}
                          </span>
                          <Button
                            size="sm"
                            onClick={() => router.push(`/products/${product.$id}`)}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full bg-background-secondary border border-neutral-700 text-text-primary rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user.name || ''}
                    className="w-full bg-background-secondary border border-neutral-700 text-text-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-text-primary"
                  />
                </div>
                <div className="pt-4">
                  <Button className="mr-4">Save Changes</Button>
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-light mb-4">Buyer Dashboard</h1>
          <p className="text-text-muted">Welcome back, {user.name || user.email}!</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-neutral-800 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-text-primary text-text-primary"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
} 