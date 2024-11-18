import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Card = ({ name, brand, price, image, id }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
      {/* Image Section */}
      <div className="h-48 lg:h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-2">
        <p className="text-xs text-gray-500 uppercase tracking-wide">{brand}</p>
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-secondary font-bold text-sm">Price: ${price}</p>
      </div>

      <div className="p-4 pt-0 flex justify-between items-center">
        <Link to={`/products/${id}`}>
          <button className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
