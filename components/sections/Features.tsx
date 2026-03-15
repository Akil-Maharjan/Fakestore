import { Package, ShoppingCart, Shield } from 'lucide-react'

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose FakeStore?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer the best shopping experience with quality products and great service
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Package className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality Products</h3>
            <p className="text-gray-600">Premium quality items carefully selected for you</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <ShoppingCart className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Easy Shopping</h3>
            <p className="text-gray-600">Simple and intuitive shopping experience</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Payment</h3>
            <p className="text-gray-600">Safe and secure payment methods</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
