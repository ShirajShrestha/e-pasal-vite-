import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Filter from "../components/Filter";
import { selectProducts, setProducts } from "../stores/productSlice";
import { useSearchParams } from "react-router-dom";
import { requestAllProducts, searchProducts } from "../api";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchKeyword) {
          const response = await searchProducts(searchKeyword);
          dispatch(setProducts(response));
        } else {
          const response = await requestAllProducts();
          dispatch(setProducts(response.data));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch, searchKeyword]);

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

        {/* Products Section */}
        <div className="md:w-3/4">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  image={product.image_urls[0]}
                  id={product.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
