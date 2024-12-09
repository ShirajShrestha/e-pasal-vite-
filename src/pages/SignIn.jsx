import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api";
import { getUserData, setCookieData } from "../utils";
import { useDispatch } from "react-redux";
import { resetCartCount, setCartCount } from "../stores/cartSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await signIn(formData);
      const { token, user } = response.data;
      if (response.status === 200) {
        setCookieData(token, user);

        const userData = getUserData();
        if (userData?.id) {
          const orders = JSON.parse(
            localStorage.getItem(`orders_${userData.id}`) || "[]"
          );
          dispatch(setCartCount(orders.length));
        } else {
          dispatch(resetCartCount());
        }
        navigate("/products");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred while signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg my-8 lg:my-[15vh]"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-tertiary">
          Sign In
        </h2>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
        >
          {loading ? (
            <p className="cursor-not-allowed">Signing In</p>
          ) : (
            <p>Sign In</p>
          )}
        </button>

        <p className="text-xs text-center mt-3">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-accent font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
