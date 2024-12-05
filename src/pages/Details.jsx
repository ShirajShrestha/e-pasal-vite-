import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  setProductDetails,
} from "../stores/productDetailsSlice";
import { postReview, requestSingleProduct } from "../api";
import { getMyToken } from "../utils";
import Cookies from "js-cookie"; // Remove this later

const Details = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(setProductDetails);
  const [toggleReview, setToggleReview] = useState("description");
  const [quantity, setQuantity] = useState(1);
  // const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const myToken = getMyToken();
  let orders = JSON.parse(localStorage.getItem(`orders_${myToken}`)) || [];

  const addToCart = () => {
    const newProduct = {
      // image: details.images?.[0],
      id: details.id,
      image: details.image,
      name: details.title,
      price: details.price,
      quantity: quantity,
    };

    let checkIfExist = orders.find((item) => item.id === newProduct.id);
    if (checkIfExist) {
      checkIfExist.quantity += newProduct.quantity;
      alert("Product updated in cart");
    } else {
      orders.push(newProduct);
      alert("Product added in cart");
    }

    let orderString = JSON.stringify(orders);
    localStorage.setItem(`orders_${myToken}`, orderString);
    window.dispatchEvent(new Event("cartUpdated"));
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

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const userData = JSON.parse(Cookies.get("user_data"));
    const userId = userData.id;

    try {
      const response = await postReview(id, comment, userId);
      if (response.status === "created") {
        const newComment = {
          content: comment,
          user: {
            first_name: userData.first_name,
            last_name: userData.last_name,
          },
        };
        //Update the comments state
        setComments((prevComments) => [...prevComments, newComment]);
        setComment("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (!details || details.id !== id) {
          const response = await requestSingleProduct(id);
          dispatch(fetchProductDetails(response));
          // setMainImage(response.images?.[0]);
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
    <>
      {loading ? (
        <p className="text-center font-bold text-primary min-h-[60vh]">
          Loading product details
        </p>
      ) : (
        <div className="my-4">
          {/* Image and details section  */}
          <div className="flex flex-col lg:flex-row m-4 lg:mx-20">
            <div className="flex-1">
              {/* Main Image */}
              <img
                // src={mainImage}
                src={details.image}
                alt={details.name}
                className="lg:w-96 object-cover m-auto rounded-md"
              />
              {/* Thumbnails */}
              {/* <div className="flex gap-2 mt-4 justify-center">
          {details.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-16 h-16 object-cover cursor-pointer rounded-md border hover:border-accent"
              onClick={() => setMainImage(img)} // Update main image on click
            />
          ))}
        </div> */}
            </div>
            <div className="flex-1 p-4 font-semibold">
              <div className="lg:w-3/4">
                <p className="font-bold text-2xl">{details.title}</p>
                <div className="flex items-center justify-between pb-4">
                  <p className="font-semibold text-gray-600 ml-2">
                    Brand: {details.brand}
                  </p>
                  {/* <FiHeart className="text-xl cursor-pointer hover:text-accent mr-10" /> */}
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
                {details.stock === 0 ? (
                  <p className="text-red-600">Out of stock!</p>
                ) : (
                  <>
                    <div className="mb-4">
                      <p className="font-bold mb-1">Qty</p>
                      <div>
                        <button
                          className="border border-black px-2 py-1 rounded cursor-pointer"
                          onClick={decreaseQuantity}
                        >
                          -
                        </button>
                        <span className="m-1">{quantity}</span>
                        <button
                          className="border border-black px-2 py-1 rounded cursor-pointer disabled:cursor-not-allowed"
                          onClick={increaseQuantity}
                          disabled={quantity == details.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="bg-accent w-full my-2 rounded-md p-2 text-white font-normal"
                      onClick={() => addToCart()}
                    >
                      Add to cart
                    </button>
                  </>
                )}
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
                Comments
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
                <form action="" onSubmit={handleCommentSubmit}>
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
                        value={comment}
                        onChange={handleChange}
                      />
                      <button className="bg-accent p-2 rounded-full">
                        <FiSend />
                      </button>
                    </div>
                  </div>
                </form>
                {/* reviews for this product */}
                {comments.map((review, index) => (
                  <div className="flex gap-2 mb-4" key={index}>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
                      alt=""
                      className="w-8 h-8 rounded-full object-cover border border-black"
                    />
                    <div>
                      <p className="text-md">
                        {review.user.first_name} {review.user.last_name}
                      </p>
                      <p className="bg-gray-300 p-2 rounded-lg">
                        {review.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
