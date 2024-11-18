import { FiTrash2 } from "react-icons/fi";

const Cart = () => {
  const handleDelete = () => {
    window.confirm("Are you sure to remove this product?");
  };
  return (
    <div className="flex flex-col w-full md:w-[60vw] m-auto">
      <p className="my-4 text-xl font-bold text-primary">My cart</p>
      <div className="flex px-[2rem] py-[0.4rem] border border-white  shadow-[0_4px_8px_rgba(0,0,0,0.06)] my-5 pt-3">
        <div className="w-[15%] shrink-0">
          <img
            src="https://th.bing.com/th/id/OIP.ZZsn6lD6PCjocBzx1tuu1QHaEo?w=284&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            alt=""
          />
        </div>
        <div className="w-[85%] flex mx-2 text-sm md:text-lg">
          <div className="w-[50%] mx-2 ">
            <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis">
              this is any content isn9hfg lorem32 db fh fbhdsfbdfdf cbsdhfdfbd
              lorem32 vdgfvvfddfsss
            </p>
          </div>
          <div className="flex flex-col items-center mx-4 w-[25%]  ">
            <p className="text-secondary">Rs 300</p>
            <button className="pt-4" onClick={handleDelete}>
              <FiTrash2 className="hover:text-red-400" />
            </button>
          </div>
          <div className="w-[25%] flex justify-center">
            Qty: <span className="text-secondary">1</span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button className="ml-4 px-4 py-2 text-base md:text-md bg-accent text-gray-800 rounded-lg hover:bg-primary transition duration-200 my-3 ">
          Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
