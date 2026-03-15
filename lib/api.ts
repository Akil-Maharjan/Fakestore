import { Product } from "@/types/prodcutTypes";

// API Response wrapper
interface ApiResponse<T> {
  data: T | null;
  error?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fakestoreapi.com';
// API interceptor wrapper
async function apiFetch<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: undefined };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return { data: null, error: 'Request timeout. Please try again.' };
      }
      return { data: null, error: error.message };
    }
    return { data: null, error: 'An unexpected error occurred' };
  }
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
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return { data: data, error: undefined };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Login failed', data: null };
  }
};
