import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Advanced Mathematics Textbook",
    price: 49.99,
    category: "Books",
    image: "http://static.photos/education/640x360/10",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Notebook",
    price: 24.99,
    category: "Stationery",
    image: "http://static.photos/workspace/640x360/11",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: 89.99,
    category: "Tech Gadgets",
    image: "http://static.photos/technology/640x360/12",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Ergonomic Study Chair",
    price: 199.99,
    category: "Workspace",
    image: "http://static.photos/office/640x360/13",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Programming Fundamentals Book",
    price: 34.99,
    category: "Books",
    image: "http://static.photos/education/640x360/14",
    rating: 4.3,
  },
  {
    id: 6,
    name: "Graphing Calculator",
    price: 129.99,
    category: "Tech Gadgets",
    image: "http://static.photos/technology/640x360/15",
    rating: 4.6,
  },
  {
    id: 7,
    name: "Premium Highlighters Set",
    price: 12.99,
    category: "Stationery",
    image: "http://static.photos/workspace/640x360/16",
    rating: 4.1,
  },
];

const addToCart = (product: Product) => {
  console.log("Adding to cart:", product);
};

export const ProductsPage: React.FC = () => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50 dark:bg-neutral-900 transition-colors">
      <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-8">
        Educational Products
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md h-fit sticky top-4 transition-colors">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Filters
          </h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-200">
              Categories
            </h3>
            <ul className="space-y-2">
              {["Books", "Tech Gadgets", "Stationery", "Workspace"].map(
                (cat) => (
                  <li key={cat}>
                    <label className="flex items-center space-x-2 cursor-pointer text-gray-800 dark:text-gray-200">
                      <input
                        type="checkbox"
                        className="rounded text-indigo-600 dark:text-indigo-400"
                      />
                      <span>{cat}</span>
                    </label>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-200">
              Price Range
            </h3>
            <input
              type="range"
              min={0}
              max={500}
              defaultValue={250}
              className="w-full h-2 bg-indigo-200 dark:bg-indigo-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
              <span>$0</span>
              <span>$500</span>
            </div>
          </div>

          <button className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors">
            Apply Filters
          </button>
        </aside>

        {/* Products Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6 text-gray-700 dark:text-gray-300">
            <p>Showing {products.length} products</p>
            <div className="flex items-center">
              <span className="mr-2">Sort by:</span>
              <select className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500">
                <option selected>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {product.name}
                    </h3>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex mr-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`feather feather-star w-4 h-4 ${
                            i < Math.round(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {product.rating}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Category: {product.category}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
