import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api";
import Cookies from "js-cookie";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: null,
    first_name: "",
    middle_name: "",
    last_name: "",
    address: "",
    contact_phone: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    // if (formData.password !== formData.confirmPassword) {
    //   alert("Passwords do not match.");
    //   return;
    // }

    try {
      const response = await signUp(formData);
      const user_data = response.user;
      Cookies.set("user_data", JSON.stringify(user_data), { expires: 7 });
      navigate("/products");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center mt-2 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-tertiary">
          Sign Up
        </h2>

        {/* Profile Picture */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        {/* Names Row */}
        <div className="flex space-x-3 mb-4">
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Middle Name
            </label>
            <input
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        {/* Contact Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contact Phone
          </label>
          <input
            type="tel"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

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

        {/* Confirm Password */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
        >
          Sign Up
        </button>
        {/* Login Link */}
        <p className="text-xs text-center mt-3">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-accent font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
