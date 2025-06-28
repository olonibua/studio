"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

interface InventoryItem {
  id: string;
  title: string;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  price: number;
  cost: number;
  category: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  lastUpdated: string;
}

interface InventoryManagementProps {
  items: InventoryItem[];
  onUpdateStock: (id: string, newStock: number) => void;
  onUpdatePrice: (id: string, newPrice: number) => void;
  onUpdateStatus: (id: string, status: 'active' | 'inactive') => void;
}

export default function InventoryManagement({ 
  items, 
  onUpdateStock, 
  onUpdatePrice, 
  onUpdateStatus 
}: InventoryManagementProps) {
  const [filter, setFilter] = useState<'all' | 'low_stock' | 'out_of_stock' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ stock?: number; price?: number }>({});

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (filter) {
      case 'low_stock':
        return item.stock <= item.lowStockThreshold && item.stock > 0;
      case 'out_of_stock':
        return item.stock === 0;
      case 'inactive':
        return item.status === 'inactive';
      default:
        return true;
    }
  });

  const getStockStatus = (item: InventoryItem) => {
    if (item.stock === 0) return { text: 'Out of Stock', color: 'text-red-500' };
    if (item.stock <= item.lowStockThreshold) return { text: 'Low Stock', color: 'text-yellow-500' };
    return { text: 'In Stock', color: 'text-green-500' };
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item.id);
    setEditValues({ stock: item.stock, price: item.price });
  };

  const handleSave = (item: InventoryItem) => {
    if (editValues.stock !== undefined && editValues.stock !== item.stock) {
      onUpdateStock(item.id, editValues.stock);
    }
    if (editValues.price !== undefined && editValues.price !== item.price) {
      onUpdatePrice(item.id, editValues.price);
    }
    setEditingItem(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditValues({});
  };

  const lowStockCount = items.filter(item => item.stock <= item.lowStockThreshold && item.stock > 0).length;
  const outOfStockCount = items.filter(item => item.stock === 0).length;
  const totalValue = items.reduce((sum, item) => sum + (item.stock * item.cost), 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Total Items</p>
              <p className="text-2xl font-bold text-text-primary">{items.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-500">{lowStockCount}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Out of Stock</p>
              <p className="text-2xl font-bold text-red-500">{outOfStockCount}</p>
            </div>
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-muted">Inventory Value</p>
              <p className="text-2xl font-bold text-text-primary">{formatPrice(totalValue)}</p>
            </div>
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-text-primary">Inventory Management</h3>
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All Items' },
                { key: 'low_stock', label: `Low Stock (${lowStockCount})` },
                { key: 'out_of_stock', label: `Out of Stock (${outOfStockCount})` },
                { key: 'inactive', label: 'Inactive' }
              ].map((filterOption) => (
                <Button
                  key={filterOption.key}
                  variant={filter === filterOption.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(filterOption.key as any)}
                >
                  {filterOption.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button>Add Product</Button>
          </div>
        </div>
      </Card>

      {/* Inventory Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-3 text-text-muted">Product</th>
                <th className="text-left py-3 text-text-muted">SKU</th>
                <th className="text-left py-3 text-text-muted">Stock</th>
                <th className="text-left py-3 text-text-muted">Status</th>
                <th className="text-left py-3 text-text-muted">Price</th>
                <th className="text-left py-3 text-text-muted">Category</th>
                <th className="text-left py-3 text-text-muted">Last Updated</th>
                <th className="text-left py-3 text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const stockStatus = getStockStatus(item);
                const isEditing = editingItem === item.id;

                return (
                  <tr key={item.id} className="border-b border-neutral-800/50">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-background-tertiary rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{item.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-text-muted">{item.sku}</td>
                    <td className="py-4">
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editValues.stock || 0}
                          onChange={(e) => setEditValues(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                          className="w-20"
                          min="0"
                        />
                      ) : (
                        <span className={stockStatus.color}>{item.stock}</span>
                      )}
                    </td>
                    <td className="py-4">
                      <span className={`text-sm ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                    </td>
                    <td className="py-4">
                      {isEditing ? (
                        <Input
                          type="number"
                          value={editValues.price || 0}
                          onChange={(e) => setEditValues(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                          className="w-24"
                          min="0"
                          step="0.01"
                        />
                      ) : (
                        formatPrice(item.price)
                      )}
                    </td>
                    <td className="py-4 text-text-muted">{item.category}</td>
                    <td className="py-4 text-text-muted">{new Date(item.lastUpdated).toLocaleDateString()}</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        {isEditing ? (
                          <>
                            <Button size="sm" onClick={() => handleSave(item)}>Save</Button>
                            <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onUpdateStatus(item.id, item.status === 'active' ? 'inactive' : 'active')}
                            >
                              {item.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-text-muted">No items found matching your criteria.</p>
          </div>
        )}
      </Card>
    </div>
  );
} 