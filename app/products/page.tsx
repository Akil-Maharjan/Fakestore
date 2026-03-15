import { productsApi } from '@/lib/api';
import ProductsClient from './ProductsClient';

const ProductsPage = async () => {
  // Fetch products and categories server-side
  const productsResponse = await productsApi.getProducts(); // No default sorting
  const categoriesResponse = await productsApi.getCategories();

  // Calculate max price for price range filter
  const maxPrice = productsResponse.data 
    ? Math.max(...productsResponse.data.map(p => p.price))
    : 1000;

  return (
    <ProductsClient 
      initialProducts={productsResponse.data || []}
      initialCategories={categoriesResponse.data || []}
      maxPrice={maxPrice}
      error={productsResponse.error}
    />
  );
};

export default ProductsPage;
