import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Cookies from "js-cookie";
import { postOrder } from "../api";

const Cart = () => {
  let retString = localStorage.getItem("orders");
  let initialOrders = JSON.parse(retString) || [];
  const [orders, setOrders] = useState(initialOrders);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  let simplifiedOrders = initialOrders.map((order) => ({
    product_id: order.id,
    quantity: order.quantity,
  }));

  useEffect(() => {
    const userData = JSON.parse(Cookies.get("user_data"));
    setUserId(userData.id);
  }, [userId]);

  const handleOrder = async () => {
    try {
      setLoading(true);
      const response = await postOrder(simplifiedOrders, userId);
      console.log("response after ordering", response);

      if (response.status == 201) {
        localStorage.setItem("orders", JSON.stringify([]));
        alert("Your order has been sent");
        window.location.reload(); // Refresh the page
      } else {
        alert("Failed to place the order. Please try again.");
        console.error("Order error:", response.status, response.statusText);
      }
    } catch (error) {
      alert("An error occurred while placing the order. Please try again.");
      console.error("Error during order handling:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure to remove this product?"
    );
    if (confirmDelete) {
      // Filter out the item to be deleted
      const updatedOrders = orders.filter((_, i) => i !== index);
      setOrders(updatedOrders); // Update state
      localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Update localStorage
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };
  return (
    <div
      className="flex flex-col w-full md:w-[60vw] m-auto h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      <p className="my-4 text-xl font-bold text-primary">My cart</p>
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <div
            className="flex px-[2rem] py-[0.4rem] border border-white  shadow-[0_4px_8px_rgba(0,0,0,0.06)] my-5 pt-3"
            key={order.id}
          >
            <div className="w-[15%] shrink-0">
              <img src={order.image} alt={order.name} />
            </div>
            <div className="w-[85%] flex mx-2 text-sm md:text-lg">
              <div className="w-[50%] mx-2 ">
                <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis">
                  {order.name}
                </p>
              </div>
              <div className="flex flex-col items-center mx-4 w-[25%]  ">
                <p className="text-secondary">${order.price}</p>
                <button className="pt-4" onClick={() => handleDelete(index)}>
                  <FiTrash2 className="hover:text-red-400" />
                </button>
              </div>
              <div className="w-[25%] flex justify-center">
                Qty: <span className="text-secondary">{order.quantity} </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center my-6 text-lg font-semibold text-gray-500">
          Your cart is empty.
        </p>
      )}

      {orders && orders.length > 0 && (
        <div className="flex items-center">
          <button
            className="ml-4 px-4 py-2 text-base md:text-md bg-accent text-gray-800 rounded-lg hover:bg-primary transition duration-200 my-3 "
            onClick={handleOrder}
          >
            {loading ? "Ordering" : " Send Order"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
