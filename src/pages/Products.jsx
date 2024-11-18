import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Filter from "../components/Filter";
import axios from "axios";
import { fetchProducts, setProducts } from "../stores/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  //For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products per page
  const products = useSelector(setProducts);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        dispatch(fetchProducts(response.data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [dispatch]);

  //Calculate the indices of the current page's products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  //Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <div className="lg:h-96">
        <img
          src="https://images.unsplash.com/photo-1445384763658-0400939829cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Banner"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center my-8 gap-4 w-[90vw] md:w-full lg:w-4/5 mx-4">
        {/* Filter Section */}
        <div className="md:w-1/4">
          <Filter />
        </div>

        <div className="md:w-3/4">
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <Card
                    key={product.id}
                    name={product.title}
                    brand={product.brand}
                    price={product.price}
                    image={product.images[0]}
                    id={product.id}
                  />
                ))}
              </div>

              {/* Pagination Section */}
              <div className="flex justify-center items-center mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Prev
                </button>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber + 1)}
                    className={`px-4 py-2 mx-1 rounded-lg ${
                      currentPage === pageNumber + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition`}
                  >
                    {pageNumber + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
