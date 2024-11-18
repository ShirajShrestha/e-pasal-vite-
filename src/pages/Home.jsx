import {
  SiAdidas,
  SiApollographql,
  SiApple,
  SiDior,
  SiHandm,
  SiLg,
  SiNike,
  SiPuma,
} from "react-icons/si";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="">
      {/* Hero section */}
      <section className="relative h-[90vh] bg-gray-900 flex items-center justify-center z-10">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1445384763658-0400939829cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative text-center text-white px-4 sm:px-6 md:px-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            Discover Your Style with Our Exclusive Collections!
          </h1>
          <p className="text-md sm:text-lg md:text-xl mb-6">
            Your One-Stop Shop for Everything You Love
          </p>
          <Link to="/products">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-accent hover:bg-primary text-white font-semibold rounded-lg shadow-md transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <div className="w-full sm:w-11/12 md:w-4/5 m-auto">
        {/* Category section */}
        <section className="my-8">
          <div className="flex flex-col my-4 md:flex-row w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 md:w-1/3 md:ml-8">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:w-2/3 md:mr-20">
              {/* Categories */}
              <div className="flex items-center border border-gray-400 p-1 rounded-lg justify-center">
                <i className="fa-solid fa-shirt text-accent mr-1"></i>
                <span className="hidden sm:inline-block">Shirts</span>
              </div>
              <div className="flex items-center border border-gray-400 p-1 rounded-lg justify-center">
                <i className="fa-solid fa-spray-can-sparkles text-accent mr-1"></i>
                <span className="hidden sm:inline-block">Perfume</span>
              </div>
              <div className="flex items-center border border-gray-400 p-1 rounded-lg justify-center">
                <i className="fa-solid fa-ring text-accent mr-1"></i>
                <span className="hidden sm:inline-block">Accessories</span>
              </div>
              <div className="flex items-center border border-gray-400 p-1 rounded-lg justify-center">
                <i className="fa-solid fa-bag-shopping text-accent mr-1"></i>
                <span className="hidden sm:inline-block">Bags</span>
              </div>
              <div className="flex items-center border border-gray-400 p-1 rounded-lg justify-center">
                <i className="fa-solid fa-seedling text-accent mr-1"></i>
                <span className="hidden sm:inline-block">Plants</span>
              </div>
              <div className="flex items-center border border-gray-400 p-1 rounded-lg justify-center">
                <i className="fa-solid fa-mobile-screen-button text-accent mr-1"></i>
                <span className="hidden sm:inline-block">Gadgets</span>
              </div>
              <div className="flex items-center border border-gray-400 p-1 rounded-lg justify-center">
                <i className="fa-solid fa-wrench text-accent mr-1"></i>
                <span className="hidden sm:inline-block">Equipments</span>
              </div>
              <div className="flex items-center border border-gray-400 p-1 rounded-lg justify-center">
                <i className="fa-solid fa-utensils text-accent mr-1"></i>
                <span className="hidden sm:inline-block">Kitchen</span>
              </div>
            </div>
          </div>
          <p className="text-accent ml-4 md:ml-8 cursor-pointer">See more</p>
        </section>

        {/* New Arrival Section */}
        <section className="my-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 md:ml-8">
            New Arrivals
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {/* Cards */}
            <ProductCard
              imgSrc={
                "https://images.unsplash.com/photo-1628861997457-db259d8322ac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              category={"Clothes"}
            />

            {/* Additional product cards... */}
            <ProductCard
              imgSrc={
                "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              category={"Cosmetics"}
            />

            <ProductCard
              imgSrc={
                "https://images.unsplash.com/photo-1699571182719-b0a8c4636fa9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              category={"Toys"}
            />

            <ProductCard
              imgSrc={
                "https://images.unsplash.com/photo-1603210119709-26103832d0e8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              category={"Gadgets"}
            />
          </div>
        </section>

        {/* Brand Section */}
        <section className="my-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 md:ml-8">
            Product Brands
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:w-2/3 lg:w-4/5 m-auto text-3xl sm:text-5xl px-1 place-items-center">
            <SiAdidas />
            <SiPuma />
            <SiNike />
            <SiApollographql />
            <SiDior />
            <SiHandm />
            <SiLg />
            <SiApple />
          </div>
        </section>

        {/* Deals Section */}
        <section className="my-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 md:ml-8">
            Featured Deals
          </h2>
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Deal Cards */}
            <div className="bg-secondary p-6 rounded-xl flex flex-col md:flex-row md:items-center gap-3 text-white">
              <div className="md:w-1/2">
                <p className="font-bold text-lg sm:text-xl mb-2">
                  Indulge in exclusive deals
                </p>
                <p className="text-sm sm:text-base">
                  Shop now and enjoy latest fashion finds.
                </p>
                <button className="mt-4 px-3 py-1 rounded-xl bg-primary text-white w-1/2">
                  Shop now
                </button>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-full object-contain"
                />
              </div>
            </div>
            <div className="bg-primary p-6 rounded-xl flex flex-col md:flex-row md:items-center gap-3 text-white">
              <div className="md:w-1/2">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661551445894-16ad21e85b5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-full object-contain"
                />
              </div>
              <div className="md:w-1/2">
                <p className="font-bold text-lg sm:text-xl mb-2">
                  Welcome offer just for you
                </p>
                <p className="text-sm sm:text-base">
                  Enjoy a special discount on your first purchase.
                </p>
                <button className="mt-4 px-3 py-1 rounded-xl bg-secondary text-white w-1/2">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
