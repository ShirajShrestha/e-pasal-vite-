import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Filter = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // For category dropdown
  const [localSearchTerm, setLocalSearchTerm] = useState(""); // Local state for search term input

  const brands = ["Beauty", "Fragrances", "Furniture", "Groceries", "Laptops"]; // Example categories

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${localSearchTerm}`);
    setLocalSearchTerm("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Filters</h2>

      {/* Search Products */}
      <form onSubmit={handleSumbit}>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
            {/* <IoMdSearch size={20} /> */}
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input
            type="text"
            placeholder="Search products"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
            value={localSearchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </form>

      {/* Categories */}
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full border px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
        >
          <span className="font-semibold">Categories</span>
          <span className="ml-2 text-sm">{isOpen ? "▲" : "▼"}</span>
        </button>
        {isOpen && (
          <div className="mt-3 bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <ul className="space-y-2">
              {brands
                .filter((brand) =>
                  brand.toLowerCase().includes(localSearchTerm.toLowerCase())
                )
                .map((brand, index) => (
                  <li
                    key={index}
                    className="cursor-pointer text-gray-700 hover:text-blue-500 hover:underline"
                  >
                    {brand}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
