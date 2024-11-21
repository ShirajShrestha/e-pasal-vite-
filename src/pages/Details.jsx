import { useEffect, useState } from "react";
import { FiHeart, FiSend } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  setProductDetails,
} from "../stores/productDetailsSlice";
import { requestSingleProduct } from "../api";

const Details = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(setProductDetails);
  const [toggleReview, setToggleReview] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const navigate = useNavigate();
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  const addToCart = () => {
    const newProduct = {
      image: details.images?.[0],
      name: details.name,
      price: details.price,
      quantity: quantity,
    };
    orders.push(newProduct);
    let orderString = JSON.stringify(orders);
    localStorage.setItem("orders", orderString);
    navigate("/cart");
  };

  const increaseQuantity = () => {
    if (quantity < details.stock) {
      setQuantity((quantity) => quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (!details || details.id !== id) {
          const response = await requestSingleProduct(id);
          dispatch(fetchProductDetails(response));
          setMainImage(response.images?.[0]);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, dispatch]);

  if (!details || loading) {
    return <p>Loading...</p>;
  }

  return (
    // <div className="my-4">
    //   {/* Image and details section  */}
    //   <div className="flex flex-col lg:flex-row m-4 lg:mx-20">
    //     <div className="flex-1 ">
    //       <img
    //         src={details.images?.[0]}
    //         alt={details.title}
    //         className="lg:w-96 object-cover m-auto rounded-md"
    //       />
    //     </div>
    //     <div className="flex-1  p-4 font-semibold">
    //       <div className="lg:w-3/4">
    //         <p className="font-bold text-2xl">{details.title}</p>
    //         <div className="flex items-center justify-between pb-4">
    //           <p className="font-semibold text-gray-600 ml-2 ">
    //             Brand: {details.brand}
    //           </p>
    //           <FiHeart className="text-xl cursor-pointer hover:text-accent mr-10" />
    //         </div>
    //         <p className="text-xl font-bold">
    //           ${" "}
    //           {Math.floor(
    //             (details.price -
    //               (details.discountPercentage / 100) * details.price) *
    //               100
    //           ) / 100}
    //         </p>
    //         <p className="mb-4">
    //           <span className="line-through text-gray-500">
    //             $ {details.price}{" "}
    //           </span>
    //           <span className="text-red-600">
    //             {" "}
    //             {details.discountPercentage} &#37; discount
    //           </span>
    //         </p>
    //         <p className="text-gray-500 mb-4">
    //           Stock: <span className="text-black">{details.stock} </span>{" "}
    //         </p>
    //         <div className="mb-4">
    //           <p className="font-bold mb-1">Qty</p>
    //           <div>
    //             <span
    //               className="border border-black px-2 py-1 rounded cursor-pointer"
    //               onClick={decreaseQuantity}
    //             >
    //               -
    //             </span>
    //             <span className="m-1">{quantity}</span>
    //             <span
    //               className="border border-black px-2 py-1 rounded cursor-pointer"
    //               onClick={increaseQuantity}
    //             >
    //               +
    //             </span>
    //           </div>
    //         </div>
    //         <button className="bg-accent w-full my-2 rounded-md p-2 text-white  font-normal">
    //           Add to cart
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Description and Review section  */}
    //   <div className="rounded-md m-4 shadow-lg mb-8 lg:w-3/4 lg:m-auto border border-gray-200">
    //     <section className="flex items-center justify-around border border-bottom shadow-md p-1 cursor-pointer">
    //       <div
    //         className={
    //           toggleReview === "description" &&
    //           "text-accent underline underline-offset-4 "
    //         }
    //         onClick={() => setToggleReview("description")}
    //       >
    //         Descriptions
    //       </div>
    //       <div
    //         onClick={() => setToggleReview("review")}
    //         className={
    //           toggleReview === "review" &&
    //           "text-accent underline underline-offset-4"
    //         }
    //       >
    //         Reviews
    //       </div>
    //     </section>

    //     {/* Conditional description and review rendering */}
    //     {toggleReview === "description" ? (
    //       <section className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
    //         {details.description}
    //       </section>
    //     ) : (
    //       <div className="px-8 my-4 min-h-[200px] max-h-[400px] overflow-y-auto">
    //         {/* post a review */}
    //         <div className="flex items-center gap-2 mb-4">
    //           <img
    //             src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
    //             alt=""
    //             className="w-8 h-8 rounded-full object-cover border border-black"
    //           />
    //           <div className="flex border border-black w-full lg:w-1/2 rounded-3xl pl-2 pr-1 py-1">
    //             <input
    //               type="text"
    //               placeholder="Leave a comment..."
    //               className="p-1 w-full outline-none border-none"
    //             />
    //             <button className="bg-accent p-2 rounded-full">
    //               <FiSend />
    //             </button>
    //           </div>
    //         </div>
    //         {/* reviews for this product */}
    //         {details.reviews.map((review) => (
    //           <div className="flex gap-2 mb-4" key={review.id}>
    //             <img
    //               src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
    //               alt=""
    //               className="w-8 h-8 rounded-full object-cover border border-black"
    //             />
    //             <p className="bg-gray-300 p-2 rounded-lg" key={review.id}>
    //               {review.comment}
    //             </p>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div className="my-4">
      {/* Image and details section  */}
      <div className="flex flex-col lg:flex-row m-4 lg:mx-20">
        <div className="flex-1">
          {/* Main Image */}
          <img
            src={mainImage}
            alt={details.name}
            className="lg:w-96 object-cover m-auto rounded-md"
          />
          {/* Thumbnails */}
          <div className="flex gap-2 mt-4 justify-center">
            {details.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 object-cover cursor-pointer rounded-md border hover:border-accent"
                onClick={() => setMainImage(img)} // Update main image on click
              />
            ))}
          </div>
        </div>
        <div className="flex-1 p-4 font-semibold">
          <div className="lg:w-3/4">
            <p className="font-bold text-2xl">{details.name}</p>
            <div className="flex items-center justify-between pb-4">
              <p className="font-semibold text-gray-600 ml-2">
                Brand: {details.brand}
              </p>
              <FiHeart className="text-xl cursor-pointer hover:text-accent mr-10" />
            </div>
            <p className="text-xl font-bold">
              ${" "}
              {Math.floor(
                (details.price -
                  (details.discount_percentage / 100) * details.price) *
                  100
              ) / 100}
            </p>
            <p className="mb-4">
              <span className="line-through text-gray-500">
                $ {details.price}{" "}
              </span>
              <span className="text-red-600">
                {" "}
                {details.discount_percentage} &#37; discount
              </span>
            </p>
            <p className="text-gray-500 mb-4">
              Stock: <span className="text-black">{details.stock} </span>{" "}
            </p>
            <div className="mb-4">
              <p className="font-bold mb-1">Qty</p>
              <div>
                <span
                  className="border border-black px-2 py-1 rounded cursor-pointer"
                  onClick={decreaseQuantity}
                >
                  -
                </span>
                <span className="m-1">{quantity}</span>
                <span
                  className="border border-black px-2 py-1 rounded cursor-pointer"
                  onClick={increaseQuantity}
                >
                  +
                </span>
              </div>
            </div>
            <button
              className="bg-accent w-full my-2 rounded-md p-2 text-white font-normal"
              onClick={() => addToCart()}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Description and Review section  */}
      <div className="rounded-md m-4 shadow-lg mb-8 lg:w-3/4 lg:m-auto border border-gray-200">
        <section className="flex items-center justify-around border-b shadow-md p-1 cursor-pointer">
          <div
            className={
              toggleReview === "description" &&
              "text-accent underline underline-offset-4"
            }
            onClick={() => setToggleReview("description")}
          >
            Descriptions
          </div>
          <div
            onClick={() => setToggleReview("review")}
            className={
              toggleReview === "review" &&
              "text-accent underline underline-offset-4"
            }
          >
            Reviews
          </div>
        </section>

        {/* Conditional description and review rendering */}
        {toggleReview === "description" ? (
          <section className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
            {details.description}
          </section>
        ) : (
          <div
            className="px-8 my-4 min-h-[200px] max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            {/* post a review */}
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
                alt=""
                className="w-8 h-8 rounded-full object-cover border border-black"
              />
              <div className="flex border border-black w-full lg:w-1/2 rounded-3xl pl-2 pr-1 py-1">
                <input
                  type="text"
                  placeholder="Leave a comment..."
                  className="p-1 w-full outline-none border-none"
                />
                <button className="bg-accent p-2 rounded-full">
                  <FiSend />
                </button>
              </div>
            </div>
            {/* reviews for this product */}
            {details.reviews?.map((review, index) => (
              <div className="flex gap-2 mb-4" key={index}>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-black"
                />
                <p className="bg-gray-300 p-2 rounded-lg">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
