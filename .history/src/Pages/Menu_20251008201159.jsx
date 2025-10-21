import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { IoIosArrowDown } from "react-icons/io";

const Menu = () => {
  const [allDishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const dishesPerPage = 12;
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("https://resturent-management-server-three.vercel.app/allsdishes");
        setDishes(response.data);
        setFilteredDishes(response.data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  // Add to Cart
  const handelAddTOCard = async (food) => {
    const selectItem = {
      itemId: food?._id,
      itemImg: food?.image,
      itemName: food?.name,
      itemPrice: food?.price,
      userId: user._id,
      itemQuantity: 1,
    };

    try {
      const res = await axios.post("https://resturent-management-server-three.vercel.app/cardItem", selectItem);

      if (res.data.success) {
        toast.success("Item added to cart successfully! 🛒");
        window.dispatchEvent(new Event("cart-updated"));
      } else {
        toast.error(res.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to cart.");
    }
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${i <= rating ? "text-yellow-500" : "text-gray-400"} text-xl`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Handle sorting
  const handleSort = (type) => {
    let sorted = [...filteredDishes];
    setSortType(type);

    if (type === "popularity") {
      sorted.sort((a, b) => (b.review || 0) - (a.review || 0));
    } else if (type === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted = [...allDishes];
    }

    setFilteredDishes(sorted);
    setCurrentPage(1);
    setOpen(false);
  };

  // Handle search
  useEffect(() => {
    let result = allDishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDishes(result);
    setCurrentPage(1);
  }, [searchQuery, allDishes]);

  // Pagination logic
  const indexOfLastDish = currentPage * dishesPerPage;
  const indexOfFirstDish = indexOfLastDish - dishesPerPage;
  const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);
  const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);

  return (
    <div className="bg-[#f4f1ea]">
      {/* Banner */}
      <div
        style={{
          backgroundImage: "url('/images/breadcumb.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          width: "100%",
        }}
      >
        <h1 className="font-bold text-center pt-[150px] text-[60px] text-white">
          Shop
        </h1>
      </div>

      <div className="container mx-auto grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-3 space-y-6 p-4 lg:pt-[140px]">
          {/* Search Box */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-bold text-lg border-b-2 border-red-500 inline-block pb-1">
              Search
            </h3>
            <div className="mt-3 flex items-center bg-[#f4f1ea] rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 outline-none bg-transparent"
              />
              <button className="px-3 text-gray-500">🔍</button>
            </div>
          </div>

          {/* Categories (static for now) */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-bold text-lg border-b-2 border-red-500 inline-block pb-1">
              Categories
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Fast Food", "Drinks", "Dessert", "Main Course", "Snacks"].map(
                (cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#f4f1ea] rounded-md text-sm cursor-pointer hover:bg-red-500 hover:text-white transition"
                  >
                    {cat}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="col-span-9">
          {/* Sorting */}
          <div className="relative flex justify-end w-full">
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-2 bg-white flex gap-4 items-center text-black rounded-md mt-10 mb-10 border border-black"
            >
              {sortType === "default"
                ? "Default Sorting"
                : sortType === "popularity"
                ? "Sort by Popularity"
                : sortType === "lowToHigh"
                ? "Price: Low to High"
                : "Price: High to Low"}
              <IoIosArrowDown />
            </button>

            {open && (
              <div className="absolute right-0 mt-20 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-2 text-sm text-gray-700">
                  <li
                    onClick={() => handleSort("default")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                  >
                    Default Sorting
                  </li>
                  <li
                    onClick={() => handleSort("popularity")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                  >
                    Sort by popularity
                  </li>
                  <li
                    onClick={() => handleSort("lowToHigh")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                  >
                    Sort by price: low to high
                  </li>
                  <li
                    onClick={() => handleSort("highToLow")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                  >
                    Sort by price: high to low
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Dishes */}
          <div className="grid lg:grid-cols-4 gap-4 p-4">
            {currentDishes.length > 0 ? (
              currentDishes.map((food, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-xl rounded-2xl text-center p-5"
                >
                  <div className="relative mx-auto w-[200px] h-[200px] pb-4">
                    <div className="absolute inset-0 border-4 border-dotted border-red-500 rounded-full animate-spin-slow"></div>
                    <img
                      src={food?.image}
                      alt={food?.name}
                      className="w-[300px] h-[200px] object-cover rounded-full z-10 relative p-2"
                    />
                  </div>
                  <h2 className="text-lg font-bold mt-2">{food?.name}</h2>
                  <div className="mt-0">{renderStars(food?.review || 0)}</div>
                  <p className="text-red-600 text-lg font-semibold mt-2">
                    <span className="font-bold">Price: $</span> {food?.price}
                  </p>

                  <button
                    onClick={() => handelAddTOCard(food)}
                    className="rounded-3xl mx-auto w-[182px] bg-[#fde5e9] text-red-600 mt-4 hover:bg-red-700 hover:text-white transition-colors duration-500 ease-in-out"
                  >
                    <div className="flex gap-2 items-center justify-center p-2">
                      Order Now <FaShoppingBasket />
                    </div>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-4 text-lg">
                No items found 😔
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6 mb-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md hover:bg-red-500 hover:text-white disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-red-600 text-white"
                    : "hover:bg-red-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md hover:bg-red-500 hover:text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
