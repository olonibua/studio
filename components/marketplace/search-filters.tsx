"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AFRICAN_ART_CATEGORIES, NIGERIAN_STATES } from "@/lib/constants";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  onClearFilters: () => void;
}

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedLocation,
  onLocationChange,
  onClearFilters,
}: SearchFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="bg-background-secondary border border-neutral-800 rounded-lg p-6">
      {/* Search Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search for African art, sculptures, paintings..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-background-tertiary border-neutral-700 text-text-primary placeholder:text-text-muted"
          />
        </div>
        <Button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          variant="outline"
          className="md:hidden"
        >
          Filters
        </Button>
      </div>

      {/* Filters */}
      <div className={`space-y-6 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full bg-background-tertiary border border-neutral-700 text-text-primary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-text-primary"
            >
              <option value="">All Categories</option>
              {AFRICAN_ART_CATEGORIES.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Price Range (₦)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0] || ''}
                onChange={(e) => onPriceRangeChange([Number(e.target.value) || 0, priceRange[1]])}
                className="w-full bg-background-tertiary border border-neutral-700 text-text-primary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-text-primary"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1] || ''}
                onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value) || 0])}
                className="w-full bg-background-tertiary border border-neutral-700 text-text-primary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-text-primary"
              />
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full bg-background-tertiary border border-neutral-700 text-text-primary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-text-primary"
            >
              <option value="">All Locations</option>
              {NIGERIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <Button
              onClick={onClearFilters}
              variant="outline"
              className="w-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-text-secondary">Quick filters:</span>
          {['Paintings', 'Sculptures', 'Textiles', 'Jewelry', 'Masks'].map((tag) => (
            <button
              key={tag}
              onClick={() => onCategoryChange(tag)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                selectedCategory === tag
                  ? 'bg-text-primary text-background-primary border-text-primary'
                  : 'bg-background-tertiary text-text-secondary border-neutral-700 hover:border-text-primary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 