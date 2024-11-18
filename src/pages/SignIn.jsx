import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../stores/authActions";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data submitted:", formData);
    dispatch(loginUser(formData));
  };

  return (
    <div className="flex justify-center mt-2 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg my-8"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-tertiary">
          Sign In
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
          {isLoading ? "Signing In..." : "Sign In"}
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
