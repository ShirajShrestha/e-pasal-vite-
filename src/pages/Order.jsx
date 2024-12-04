import { useEffect, useState } from "react";
import { fetchAllOrders } from "../api";
import { getMyToken } from "../utils";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = getMyToken();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        if (!token) return;
        const fetchedOrders = await fetchAllOrders();
        setOrders(fetchedOrders?.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [token]);

  return (
    <div
      className="flex flex-col w-full md:w-[60vw] m-auto h-[75vh] overflow-y-auto 
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <h2 className="my-4 text-xl font-bold text-primary">My Orders</h2>
      {loading && <p>Loading your orders...</p>}
      {!loading && orders.length === 0 && <p>No orders available</p>}
      {!loading &&
        orders.map((order) => (
          <div key={order.id} className="my-2">
            <h2 className="text-xl font-semibold mb-4">Order ID: {order.id}</h2>
            {order.order_products.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border border-gray-300 rounded-lg shadow-lg bg-white hover:shadow-md transition-shadow duration-300 mb-5"
              >
                <div className="w-20 h-20 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="ml-4 w-full flex flex-col md:flex-row justify-between items-start md:items-center text-sm md:text-base md:gap-4">
                  <p className="flex-grow  text-secondary font-bold truncate">
                    {item.product.name}
                  </p>
                  <div className="flex flex-col items-center mt-2 md:mt-0">
                    <span className="text-gray-500 mr-2">Qty:</span>
                    <span className="text-primary font-semibold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-col items-center mt-2 md:mt-0">
                    <span className="text-gray-500 mr-2">Price:</span>
                    <span className="font-semibold">${item.product.price}</span>
                  </div>
                  <div className="flex flex-col items-center mt-2 md:mt-0">
                    <span className="text-gray-500 mr-2">Total:</span>
                    <span className="font-semibold">
                      ${(item.quantity * item.product.price).toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-2 md:mt-0 text-sm text-primary font-semibold">
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Order;
