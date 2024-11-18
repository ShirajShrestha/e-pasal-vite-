import { useState } from "react";

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const brands = ["Beauty", "Fragrances", "Furniture", "Groceries", "Laptops"];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full border px-4 py-2 rounded-lg text-gray-700 bg-gray-100 focus:outline-none"
        >
          Categories
          <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
        </button>
        {isOpen && (
          <div className="mt-2 border rounded-lg p-3 bg-white shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search categories"
                className="w-full outline-none px-2 py-1 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ul className="space-y-2">
              {brands
                .filter((brand) =>
                  brand.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((brand, index) => (
                  <li key={index} className="text-gray-700 hover:text-blue-500">
                    {brand}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            className="w-full border px-3 py-2 rounded-lg"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="font-semibold">to</span>
          <input
            type="number"
            placeholder="Max"
            className="w-full border px-3 py-2 rounded-lg"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
