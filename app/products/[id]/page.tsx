import { productsApi } from '@/lib/api';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const productResponse = await productsApi.getProduct(parseInt(resolvedParams.id));
  
  if (!productResponse.data) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  const product = productResponse.data;
  return {
    title: `${product.title} | FakeStore`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const resolvedParams = await params;
  const productResponse = await productsApi.getProduct(parseInt(resolvedParams.id));

  if (!productResponse.data) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-red-800 mb-2">Product Not Found</h1>
            <p className="text-red-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={productResponse.data} error={productResponse.error} />;
};

export default ProductPage;
export { generateMetadata };
