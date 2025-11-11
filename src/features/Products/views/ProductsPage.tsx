import { useState } from "react";
import { ProductFilters } from "../components/ProductFilter";
import { ProductList } from "../components/ProductList";
import { useProducts } from "../hooks/useProducts";


export const ProductsPage: React.FC = () => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    price_min: undefined as number | undefined,
    price_max: undefined as number | undefined,
  });

  const { data: products, isLoading } = useProducts(filters);

  // const { alert } = useCart();

  // useEffect(() => {
  //   if (alert) {
  //     addToast({
  //       title: "Toast title",
  //       description: "Toast displayed successfully",
  //       icon: (
  //         <svg height={24} viewBox="0 0 24 24" width={24}>
  //           <g
  //             fill="none"
  //             stroke="currentColor"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeMiterlimit={10}
  //             strokeWidth={1.5}
  //           >
  //             <path
  //               d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
  //               data-name="Stroke 1"
  //             />
  //             <path
  //               d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
  //               data-name="Stroke 3"
  //             />
  //           </g>
  //         </svg>
  //       ),
  //     });
  //   }
  // }, [alert]);

  return (
    <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50 dark:bg-neutral-900 transition-colors">
      <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-8">
        Educational Products
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <ProductFilters onApply={setFilters} />

        {/* Products Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6 text-gray-700 dark:text-gray-300">
            <p>Showing {products ? products.length : 0} products</p>
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

          <ProductList isLoading={isLoading} products={products}/>
        </div>
      </div>
    </main>
  );
};
