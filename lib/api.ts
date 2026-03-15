import { Product } from "@/types/prodcutTypes";

// API Response wrapper
interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fakestoreapi.com';
// API interceptor wrapper with retry mechanism
async function apiFetch<T>(url: string, options?: RequestInit, retries = 2): Promise<ApiResponse<T>> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${baseUrl}${url}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          ...options?.headers,
        },
        cache: 'no-store',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Handle 403 and other HTTP errors gracefully
        if (response.status === 403) {
          if (attempt < retries) {
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            continue;
          }
          return { data: null, error: 'API rate limit exceeded. Please try again later.' };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, error: undefined };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return { data: null, error: 'Request timeout. Please try again.' };
        }
        if (attempt === retries) {
          return { data: null, error: error.message };
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
  return { data: null, error: 'An unexpected error occurred' };
}

// Products API - extending existing productApi
export const productsApi = {
  // Get all products with optional sorting
  getProducts: async (sort?: 'asc' | 'desc') => {
    const url = sort ? `/products?sort=${sort}` : '/products';
    return apiFetch<Product[]>(url);
  },

  // Get single product
  getProduct: async (id: number) => {
    return apiFetch<Product>(`/products/${id}`);
  },

  // Get all categories
  getCategories: async () => {
    return apiFetch<string[]>('/products/categories');
  },

  // Get products by category
  getProductsByCategory: async (category: string) => {
    return apiFetch<Product[]>(`/products/category/${category}`);
  },
};

export interface ProductFilters {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  search: string;
}

export const login = async (username: string, password: string): Promise<ApiResponse<{ token: string }>> => {
  return apiFetch<{ token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};
