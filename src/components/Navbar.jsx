import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { signOut } from "../api";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  let userData = null;
  const [cartCount, setcartCount] = useState(0);

  const updateCartCount = () => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    setcartCount(orders.length);
  };

  const handleSignOut = () => {
    signOut();
    toggleProfileMenu();
  };

  useEffect(() => {
    updateCartCount();

    const handleCartUpdate = () => updateCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  try {
    const cookieData = Cookies.get("user_data");
    if (cookieData) {
      userData = JSON.parse(cookieData);
    }
  } catch (error) {
    console.error("Failed to parse user_data cookie:", error);
  }

  // Toggle function for profile dropdown
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchData}`);
    setSearchData("");
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
            <i className="fa-regular fa-heart text-xl cursor-pointer hover:text-accent"></i>
            <Link to="/contacts">
              <i className="fa-solid fa-phone text-xl cursor-pointer hover:text-accent"></i>
            </Link>
            <div className="relative">
              <div
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1723200166097-4eed8c141f03?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="user"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-gray-700 font-semibold">
                  {userData.first_name}
                </p>
              </div>

              {/* Profile Dropdown */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50 border border-black">
                  <a
                    href="/profile"
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <i className="fa-regular fa-user mr-2"></i> Profile
                  </a>
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
              <Link to="/products" className="flex items-center space-x-2">
                <i className="fa-solid fa-bag-shopping text-xl text-gray-700"></i>
                <span>Products</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Link to="/cart">
                  <i className="fa-solid fa-cart-shopping text-xl text-gray-700 cursor-pointer hover:text-accent"></i>
                  <span>Cart</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-regular fa-heart text-xl text-gray-700"></i>
                <span>Favorites</span>
              </div>
              <Link to="/contacts" className="flex items-center space-x-2">
                <i className="fa-solid fa-phone text-xl text-gray-700"></i>
                <span>Contact</span>
              </Link>

              <div className="relative mt-4">
                <div
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1723200166097-4eed8c141f03?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-gray-700 font-semibold">
                    {userData.first_name}{" "}
                  </p>
                </div>
                {profileMenuOpen && (
                  <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-10">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                    >
                      <i className="fa-regular fa-user mr-2"></i> Profile
                    </Link>
                    <Link
                      to="/logout"
                      className="flex items-center px-4 py-2 hover:bg-gray-100"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>{" "}
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <Link
                to="/signup"
                className="block text-center bg-accent text-white px-3 py-2 rounded hover:bg-primary"
              >
                Sign Up
              </Link>
              <Link
                to="/signin"
                className="block text-center bg-accent text-white px-3 py-2 rounded hover:bg-primary"
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
