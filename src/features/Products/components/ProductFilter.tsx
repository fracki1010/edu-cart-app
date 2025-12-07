import { useState } from "react";

const filterList = [
  { label: "Books", key: "libros" },
  { label: "Tech Gadgets", key: "Herramientas tecnologicas" },
  { label: "Stationery", key: "Papeleria" },
  { label: "Workspace", key: "Material de oficina" },
];

export const ProductFilters = ({
  onApply,
}: {
  onApply: (filters: any) => void;
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const applyFilters = () => {
    onApply({
      categories: selectedCategories,
      price_min: priceRange[0],
      price_max: priceRange[1],
    });
  };

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md h-fit sticky top-4 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Filters
      </h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-200">
          Categories
        </h3>
        {filterList.map((cat) => (
          <label
            key={cat.key}
            className="flex items-center dark:text-gray-100 space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.key)}
              onChange={() => handleCategoryChange(cat.key)}
            />
            <span>{cat.label}</span>
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-200">
          Price Range
        </h3>
        <input
          type="range"
          min={0}
          max={500}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full h-2 bg-indigo-500 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Apply Filters
      </button>
    </aside>
  );
};
