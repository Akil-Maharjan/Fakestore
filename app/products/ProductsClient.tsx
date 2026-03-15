'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/prodcutTypes';
import { ProductFilters } from '@/lib/api';
import { ShoppingCart, Star, Search, ChevronDown } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { isLoggedIn } from '@/lib/auth';

interface ProductsClientProps {
  initialProducts: Product[];
  initialCategories: string[];
  maxPrice: number;
  error?: string;
}

function ProductsClientContent({
  initialProducts,
  initialCategories,
  maxPrice,
  error
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  
  // State for filters and sorting
  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    minPrice: parseFloat(searchParams.get('minPrice') || '0'),
    maxPrice: parseFloat(searchParams.get('maxPrice') || maxPrice.toString()),
    search: searchParams.get('search') || ''
  });

  const [sort, setSort] = useState<'price-asc' | 'price-desc' | 'category-asc' | 'category-desc' | undefined>(
    (searchParams.get('sort') as 'price-asc' | 'price-desc' | 'category-asc' | 'category-desc') || undefined
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const productsPerPage = 12;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest('.category-dropdown')) {
        setIsDropdownOpen(false);
      }
      if (isSortDropdownOpen && !(event.target as Element).closest('.sort-dropdown')) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen, isSortDropdownOpen]);

  // Update URL when filters or sort change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categories.length > 0) {
      params.set('categories', filters.categories.join(','));
    }
    if (filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice < maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.search) params.set('search', filters.search);
    if (sort) params.set('sort', sort);
    if (currentPage > 1) params.set('page', currentPage.toString());

    const newUrl = `/products${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl, { scroll: false });
  }, [filters, sort, currentPage, router, maxPrice]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Apply filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category.toLowerCase())
      );
    }

    if (filters.minPrice > 0) {
      filtered = filtered.filter(product => product.price >= filters.minPrice!);
    }

    if (filters.maxPrice < maxPrice) {
      filtered = filtered.filter(product => product.price <= filters.maxPrice!);
    }

    if (filters.search) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }

    // Apply sorting only if sort is selected
    if (sort) {
      filtered.sort((a, b) => {
        switch (sort) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'category-asc':
            return a.category.localeCompare(b.category);
          case 'category-desc':
            return b.category.localeCompare(a.category);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [initialProducts, filters, sort, maxPrice]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSortChange = (newSort: 'price-asc' | 'price-desc' | 'category-asc' | 'category-desc' | undefined) => {
    setSort(newSort);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h2 className="text-red-800 font-semibold">Error loading products</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {initialProducts.length} products
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Multi-Select Category Dropdown */}
            <div className="relative category-dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-48"
              >
                <span className="truncate">
                  {filters.categories.length === 0 
                    ? 'All Categories' 
                    : filters.categories.length === 1 
                    ? filters.categories[0].charAt(0).toUpperCase() + filters.categories[0].slice(1)
                    : `${filters.categories.length} Categories`
                  }
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="max-h-48 overflow-y-auto">
                    {initialCategories.map(category => (
                      <label
                        key={category}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category.toLowerCase())}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleFilterChange({ 
                                categories: [...filters.categories, category.toLowerCase()] 
                              });
                            } else {
                              handleFilterChange({ 
                                categories: filters.categories.filter(c => c !== category.toLowerCase()) 
                              });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 p-2">
                    <button
                      onClick={() => handleFilterChange({ categories: [] })}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                min="0"
                max={maxPrice}
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange({ minPrice: parseFloat(e.target.value) || 0 })}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                min="0"
                max={maxPrice}
                value={filters.maxPrice === maxPrice ? '' : filters.maxPrice}
                onChange={(e) => handleFilterChange({ maxPrice: parseFloat(e.target.value) || maxPrice })}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative sort-dropdown">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-48"
              >
                <span className="truncate">
                  {sort === 'price-asc' ? 'Price: Low to High' :
                   sort === 'price-desc' ? 'Price: High to Low' :
                   sort === 'category-asc' ? 'Category: A to Z' :
                   sort === 'category-desc' ? 'Category: Z to A' :
                   'Sort By'}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSortDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleSortChange('price-asc');
                        setIsSortDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => {
                        handleSortChange('price-desc');
                        setIsSortDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                    >
                      Price: High to Low
                    </button>
                    <button
                      onClick={() => {
                        handleSortChange('category-asc');
                        setIsSortDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                    >
                      Category: A to Z
                    </button>
                    <button
                      onClick={() => {
                        handleSortChange('category-desc');
                        setIsSortDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                    >
                      Category: Z to A
                    </button>
                    <div className="border-t border-gray-200 mt-1">
                      <button
                        onClick={() => {
                          handleSortChange(undefined);
                          setIsSortDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-600"
                      >
                        Clear Sort
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
              <Link href={`/products/${product.id}`}>
                <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                {renderStars(product.rating.rate)}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => {
                      if (!isLoggedIn()) {
                        router.push('/login');
                        return;
                      }
                      addItem({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                      });
                    }}
                    className="bg-blue-600 cursor-pointer text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 cursor-pointer py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 cursor-pointer py-2 border rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 cursor-pointer py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductsClient: React.FC<ProductsClientProps> = (props) => (
  <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
    <ProductsClientContent {...props} />
  </Suspense>
);

export default ProductsClient;
