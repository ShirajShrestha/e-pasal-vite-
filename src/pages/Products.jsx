import { useEffect, useState } from "react";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, setProducts } from "../stores/productSlice";
import { requestAllProducts, searchProducts } from "../api";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search");
  const [paginationInfo, setPaginationInfo] = useState({
    next_page_url: null,
    prev_page_url: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        if (searchKeyword) {
          const response = await searchProducts(searchKeyword);
          dispatch(setProducts(response));
        } else {
          const response = await requestAllProducts();
          dispatch(setProducts(response.data));
          setPaginationInfo({
            next_page_url: response.next_page_url,
            prev_page_url: response.prev_page_url,
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch, searchKeyword]);

  const handlePrevPage = async () => {
    if (paginationInfo.prev_page_url) {
      try {
        const response = await requestAllProducts(paginationInfo.prev_page_url);
        dispatch(setProducts(response.data));
        setPaginationInfo({
          next_page_url: response.next_page_url,
          prev_page_url: response.prev_page_url,
        });
      } catch (error) {
        console.error("Error fetching previous page:", error);
      }
    }
  };

  const handleNextPage = async () => {
    if (paginationInfo.next_page_url) {
      try {
        setLoading(true);
        const response = await requestAllProducts(paginationInfo.next_page_url);
        dispatch(setProducts(response.data));
        setPaginationInfo({
          next_page_url: response.next_page_url,
          prev_page_url: response.prev_page_url,
        });
      } catch (error) {
        console.error("Error fetching next page:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {/* Banner Image */}
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

        {/* Products Section */}
        <div className="md:w-3/4">
          {loading ? (
            <p className="text-center font-bold text-secondary min-h-[50vh]">
              Loading...
            </p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  name={product.title}
                  brand={product.brand}
                  price={product.price}
                  image={product.image}
                  id={product.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-center font-bold text-secondary min-h-[50vh]">
              No products available
            </p>
          )}
        </div>
      </div>
      {/* Prev and Next Buttons */}
      <div className="flex justify-center align-center my-8 gap-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
          onClick={handlePrevPage}
          disabled={!paginationInfo.prev_page_url}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
          onClick={handleNextPage}
          disabled={!paginationInfo.next_page_url}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
