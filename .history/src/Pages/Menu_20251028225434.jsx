import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaShoppingBasket } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Menu = () => {
 
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dishesPerPage = 12;
  const { user,allDishes } = useContext(AuthContext);
  console.log(user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Fetch data
  useEffect(() => {
  if (allDishes && allDishes.length > 0) {
    setFilteredDishes(allDishes);
  }
}, [allDishes]);

  // Add to Cart with login check
  const handelAddTOCard = async (food) => {
    if (!user) {
      toast.warning("You must login first!");
      navigate("/login");
      return;
    }

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

  // Sorting
  const handleSort = (type) => {
    let sorted = [...filteredDishes];
    setSortType(type);

    if (type === "popularity") sorted.sort((a, b) => (b.review || 0) - (a.review || 0));
    else if (type === "lowToHigh") sorted.sort((a, b) => a.price - b.price);
    else if (type === "highToLow") sorted.sort((a, b) => b.price - a.price);
    else sorted = [...allDishes];

    setFilteredDishes(sorted);
    setCurrentPage(1);
    setOpen(false);
  };

  // Filter (Search + Category)
  useEffect(() => {
    filterItems(searchQuery, selectedCategory);
  }, [searchQuery, allDishes, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterItems(searchQuery, category);
  };

  const filterItems = (search, category) => {
    let filtered = allDishes;

    if (category && category !== "All") {
      filtered = filtered.filter(
        (dish) => dish.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter((dish) =>
        dish.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredDishes(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastDish = currentPage * dishesPerPage;
  const indexOfFirstDish = indexOfLastDish - dishesPerPage;
  const currentDishes = filteredDishes.slice(indexOfFirstDish, indexOfLastDish);
  const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);

  return (
    <div className="bg-[#f4f1ea] ">
      {/* Banner */}
      <div
        className="bg-cover bg-center w-full h-[50vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/breadcumb.jpg')" }}
      >
        <h1 className="font-bold text-[60px] text-white text-center">Shop</h1>
      </div>

      <div className="container mx-auto grid grid-cols-12 gap-4 px-2 lg:px-5">
        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-3 space-y-6 pt-8 lg:pt-[140px]">
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

          {/* Categories */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-bold text-lg border-b-2 border-red-500 inline-block pb-1">
              Categories
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["All", "Fast Food", "Drinks", "Dessert", "Main Course", "Snacks"].map(
                (cat, idx) => (
                  <span
                    key={idx}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-3 py-1 rounded-md text-sm cursor-pointer transition ${
                      selectedCategory === cat
                        ? "bg-red-500 text-white"
                        : "bg-[#f4f1ea] hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    {cat}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="col-span-12 lg:col-span-9 pt-8 lg:pt-[140px]">
          {/* Sorting */}
          <div className="relative flex justify-end w-full">
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-2 bg-white flex gap-2 items-center text-black rounded-md mb-4 border border-black"
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
              <div className="absolute right-0 mt-12 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 lg:p-4">
            {currentDishes.length > 0 ? (
              currentDishes.map((food, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-xl rounded-2xl text-center p-5"
                >
                  <div className="relative mx-auto w-[180px] h-[200px] pb-4 sm:w-[200px] sm:h-[200px]">
                    <div className="absolute inset-0 border-4 border-dotted border-red-500 rounded-full animate-spin-slow"></div>
                    <img
                      src={food?.image}
                      alt={food?.name}
                      className="w-full h-[200px] object-cover rounded-full z-10 relative p-2"
                    />
                  </div>
                  <h2 className="text-lg font-bold mt-2">{food?.name}</h2>
                  <div className="mt-0">{renderStars(food?.review || 0)}</div>
                  <p className="text-red-600 text-lg font-semibold mt-2">
                    <span className="font-bold">Price: $</span> {food?.price}
                  </p>

                  <div className="lg:flex items-center justify-between gap-3">
                  <div>
                    <button className="rounded-3xl mx-auto xl:w-[40px] sm:w-[182px] bg-[#fde5e9] text-red-600 mt-4 hover:bg-red-700 hover:text-white transition-colors duration-500 ease-in-out">
                    <div className="flex gap-2 items-center justify-center p-2">
                   View Info <FaEye size={18} />
                    </div>
                    </button>
                  </div>
                  <div>
                    <button
                    onClick={() => handelAddTOCard(food)}
                    className="rounded-3xl mx-auto xl:w-[40px] sm:w-[182px] bg-[#fde5e9] text-red-600 mt-4 hover:bg-red-700 hover:text-white transition-colors duration-500 ease-in-out"
                  >
                    <div className="flex gap-2 items-center justify-center p-2">
                      Order Now <FaShoppingBasket />
                    </div>
                  </button>
                  </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3 text-lg">
                No items found 😔
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6 mb-10 flex-wrap">
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


