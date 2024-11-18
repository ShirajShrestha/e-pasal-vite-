import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 py-10  bottom-0 w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">E-Pasal</h3>
            <p className="text-sm">
              Your one-stop destination for quality products at unbeatable
              prices. Shop with confidence and ease, every day.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Shop
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Customer Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/faqs" className="hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/returns" className="hover:text-white">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/tracking" className="hover:text-white">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <p className="text-sm">
              Kathmandu <br />
              Phone: 9841234567
              <br />
              Email: support@epasal.com
            </p>

            {/* Social Media Links */}
            <div className="mt-4 flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-white">
                <i className="fa-brands fa-facebook-f" size={20}></i>{" "}
                {/* Font Awesome Facebook icon */}
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <i className="fa-brands fa-x-twitter" size={20}></i>{" "}
                {/* Font Awesome Twitter icon */}
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <i className="fa-brands fa-instagram" size={20}></i>{" "}
                {/* Font Awesome Instagram icon */}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} E-Pasal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
