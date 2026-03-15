import Link from 'next/link'
 
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-400">FakeStore</h3>
            <p className="text-gray-400">Your trusted e-commerce platform</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
              <li><Link href="/login" className="hover:text-white">Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products?category=electronics" className="hover:text-white">Electronics</Link></li>
              <li><Link href="/products?category=clothing" className="hover:text-white">Clothing</Link></li>
              <li><Link href="/products?category=accessories" className="hover:text-white">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white">FAQs</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FakeStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
 
export default Footer