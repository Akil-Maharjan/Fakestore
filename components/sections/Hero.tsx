import Link from 'next/link'
import { Package, ShoppingCart, ArrowRight } from 'lucide-react'
 
const Hero = () => {
  return (
    <section className="bg-linear-to-r max-w-[2000px] mx-auto from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to FakeStore
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Your Premium E-commerce Destination
        </p>
        <p className="text-lg mb-12 text-blue-200 max-w-3xl mx-auto">
          Discover amazing products with unbeatable prices and exceptional quality
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            <Package className="h-5 w-5" />
            Shop Now
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200"
          >
            <ShoppingCart className="h-5 w-5" />
            View Cart
          </Link>
        </div>
      </div>
    </section>
  )
}
 
export default Hero