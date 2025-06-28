"use client";

import { Product } from "@/lib/types";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function ProductGrid({ 
  products, 
  loading = false, 
  emptyMessage = "No products found" 
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-background-secondary border border-neutral-800 rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-square bg-background-tertiary"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-background-tertiary rounded w-3/4"></div>
              <div className="h-3 bg-background-tertiary rounded w-full"></div>
              <div className="h-3 bg-background-tertiary rounded w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-background-tertiary rounded w-1/3"></div>
                <div className="h-4 bg-background-tertiary rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-background-secondary rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-text-primary mb-2">No Products Found</h3>
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.$id} product={product} />
      ))}
    </div>
  );
} 