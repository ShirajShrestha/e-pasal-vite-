import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, signOut } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { resetCartCount, setCartCount } from "../stores/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  let userData = null;
  // const [cartCount, setcartCount] = useState(0);
  const cartCount = useSelector((state) => state.cart.cartCount);
  const dispatch = useDispatch();

  // const updateCartCount = () => {
  //   try {
  //     const userData = getUserData();
  //     if (!userData || !userData.id) {
  //       return;
  //     }
  //     const id = userData.id;
  //     const orders = JSON.parse(localStorage.getItem(`orders_${id}`) || []);
  //     setcartCount(Array.isArray(orders) ? orders.length : 0);
  //   } catch (error) {
  //     console.error("Failed to update cart count:", error);
  //   }
  // };

  const updateCartCount = () => {
    const userData = getUserData();
    if (userData?.id) {
      const orders = JSON.parse(
        localStorage.getItem(`orders_${userData.id}`) || "[]"
      );
      dispatch(setCartCount(orders.length));
    } else {
      dispatch(resetCartCount());
    }
  };

  const handleSignOut = () => {
    signOut();
    dispatch(resetCartCount());
    toggleProfileMenu();
  };

  useEffect(() => {
    updateCartCount();

    // const handleCartUpdate = () => updateCartCount();
    // window.addEventListener("cartUpdated", handleCartUpdate);

    // return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  userData = getUserData();

  // Toggle function for profile dropdown
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchData}`);
    setSearchData("");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white font-primary shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo section*/}
        <Link to="/" className="text-2xl font-bold text-primary">
          E-Pasal
        </Link>
        {/* Search Bar (Only visible on larger screens) */}
        <form
          className="hidden lg:flex items-center w-1/2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-accent focus:border-accent block w-full pl-10 p-2"
              placeholder="Search product name..."
              required
            />
          </div>
          <button
            type="submit"
            className="ml-2 p-2 text-white bg-accent rounded-lg border border-accent hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-secondary"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <span className="sr-only">Search</span>
          </button>
        </form>
        {/* Icons and User Profile section (Only visible on larger screens) */}
        {userData ? (
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/products">
              <i className="fa-solid fa-bag-shopping text-xl cursor-pointer hover:text-accent"></i>
            </Link>
            <Link to="/cart">
              <div className="relative">
                <i className="fa-solid fa-cart-shopping text-xl cursor-pointer hover:text-accent "></i>
                <span className="absolute top-0 right-0 bg-blue-200 px-2 py-0.5 rounded-full -mt-4 -mr-3">
                  {cartCount}
                </span>
              </div>
            </Link>
            <Link to="/order">
              <i className="fa-regular fa-clipboard text-xl cursor-pointer hover:text-accent"></i>
            </Link>
            <Link to="/contacts">
              <i className="fa-solid fa-phone text-xl cursor-pointer hover:text-accent"></i>
            </Link>
            <div className="relative">
              <div
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 cursor-pointer"
              >
                {userData.image ? (
                  <div>
                    <img src={userData.image} alt={userData.first_name} />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center">
                    {" "}
                    <span className="font-bold">
                      {userData.first_name.charAt(0).toUpperCase()}
                    </span>{" "}
                  </div>
                )}
                <p className="text-gray-700 font-semibold">
                  {userData.first_name}
                </p>
              </div>

              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50 border border-black">
                  {/* <a
                    href="/profile"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <i className="fa-regular fa-user mr-2"></i> Profile
                  </a> */}
                  <a
                    href="/"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>{" "}
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex gap-2 mr-2">
            <Link
              to="/signup"
              className="text-white bg-accent px-2 py-1 rounded-2xl hover:bg-primary"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="text-white bg-accent px-2 py-1 rounded-2xl hover:bg-primary"
            >
              Sign In
            </Link>
          </div>
        )}
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-accent"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="fa-solid fa-bars" size={24}></i>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden transition-transform transform ${
          menuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="bg-gray-50 shadow-lg rounded-lg p-4">
          {/* Search Bar */}
          <form
            className="flex items-center bg-white p-2 rounded-lg shadow-sm"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2"
              placeholder="Search product..."
              required
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-accent text-white rounded-lg"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          {/* Links and Profile Options */}
          {userData ? (
            <div className="space-y-4 mt-4">
              <Link
                to="/products"
                className="flex items-center space-x-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <i className="fa-solid fa-bag-shopping text-xl text-gray-700"></i>
                <span>Products</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Link
                  to="/cart"
                  className="flex items-center space-x-2"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <i className="fa-solid fa-cart-shopping text-xl text-gray-700 cursor-pointer hover:text-accent"></i>
                  <span> Cart</span>
                </Link>
              </div>
              <Link
                to="/order"
                className="flex items-center space-x-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div className="flex items-center space-x-2">
                  <i className="fa-regular fa-clipboard text-xl text-gray-700"></i>
                  <span>Orders</span>
                </div>
              </Link>
              <Link
                to="/contacts"
                className="flex items-center space-x-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <i className="fa-solid fa-phone text-xl text-gray-700"></i>
                <span>Contact</span>
              </Link>

              <div className="relative mt-4">
                <div
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  {userData.image ? (
                    <div>
                      <img src={userData.image} alt={userData.first_name} />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center">
                      {" "}
                      <span className="font-bold">
                        {userData.first_name.charAt(0).toUpperCase()}
                      </span>{" "}
                    </div>
                  )}
                  <p className="text-gray-700 font-semibold">
                    {userData.first_name}{" "}
                  </p>
                </div>
                <Link
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSignOut()}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                  Logout
                </Link>
                {/* {profileMenuOpen && (
                  <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-10">
                    <Link
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleSignOut()}
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                      Logout
                    </Link>
                  </div>
                )} */}
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <Link
                to="/signup"
                className="block text-center bg-accent text-white px-3 py-2 rounded hover:bg-primary"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                className="block text-center bg-accent text-white px-3 py-2 rounded hover:bg-primary"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
