import Link from 'next/link'
 
const Categories = () => {
  const categories = [
    { name: "Electronics", color: "bg-blue-500" },
    { name: "Clothing", color: "bg-green-500" },
    { name: "Accessories", color: "bg-purple-500" },
    { name: "Home & Garden", color: "bg-orange-500" }
  ]
 
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our wide range of product categories
          </p>
        </div>
 
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/products?category=${category.name.toLowerCase()}`}
              className={`${category.color} text-white p-6 rounded-lg text-center hover:opacity-90 transition-opacity duration-200`}
            >
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-sm opacity-90">Shop Now</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
 
export default Categories