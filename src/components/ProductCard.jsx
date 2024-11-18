// eslint-disable-next-line react/prop-types
const ProductCard = ({ imgSrc, category }) => {
  return (
    <div className="flex flex-col items-center rounded-lg shadow-md h-auto w-28 sm:w-32 md:w-64">
      <img
        src={imgSrc}
        alt={category}
        className="object-cover w-full h-32 sm:h-48 md:h-80 rounded-t-lg"
      />
      <div className="mt-2 text-center">
        <p className="font-semibold">{category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
