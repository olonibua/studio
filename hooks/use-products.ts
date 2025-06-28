import { useProductStore } from '@/store/product-store';

export const useProducts = () => {
  const {
    products,
    categories,
    featuredProducts,
    searchResults,
    currentProduct,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    priceRange,
    sortBy,
    showCustomizable,
    showInStock,
    currentPage,
    totalPages,
    totalProducts,
    setProducts,
    setCategories,
    setFeaturedProducts,
    setCurrentProduct,
    setLoading,
    setError,
    setSearchQuery,
    setSelectedCategory,
    setSelectedSubcategory,
    setPriceRange,
    setSortBy,
    setShowCustomizable,
    setShowInStock,
    clearFilters,
    setCurrentPage,
    setPagination,
  } = useProductStore();

  return {
    // State
    products,
    categories,
    featuredProducts,
    searchResults,
    currentProduct,
    isLoading,
    error,
    
    // Filters
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    priceRange,
    sortBy,
    showCustomizable,
    showInStock,
    
    // Pagination
    currentPage,
    totalPages,
    totalProducts,
    
    // Actions
    setProducts,
    setCategories,
    setFeaturedProducts,
    setCurrentProduct,
    setLoading,
    setError,
    setSearchQuery,
    setSelectedCategory,
    setSelectedSubcategory,
    setPriceRange,
    setSortBy,
    setShowCustomizable,
    setShowInStock,
    clearFilters,
    setCurrentPage,
    setPagination,
    
    // Computed values
    hasProducts: products.length > 0,
    hasSearchResults: searchResults.length > 0,
    hasFilters: !!(searchQuery || selectedCategory || selectedSubcategory || 
                   priceRange.min > 0 || priceRange.max < 1000000 || 
                   showCustomizable || showInStock),
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
}; 