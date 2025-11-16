import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaHeart, FaShoppingBasket } from "react-icons/fa";
import { MdShoppingBasket } from "react-icons/md";
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
  const { user, allDishes } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Modal & Wishlist State
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Fetch data
  useEffect(() => {
    if (allDishes && allDishes.length > 0) {
      setFilteredDishes(allDishes);
    }
  }, [allDishes]);

  // Add to Cart
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
      const res = await axios.post(
        "https://resturent-management-server-three.vercel.app/cardItem",
        selectItem
      );
      if (res.data.success) {
        toast.success("Item added to cart successfully! 🛒");
        window.dispatchEvent(new Event("cart-updated"));
      } else {
        toast.error(
          res.data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to cart.");
    }
  };

  // Wishlist
  const handelWish = (dish) => {
    if (!user) {
      toast.warning("Login required! Please login.");
      navigate("/login");
      return;
    }
    if (wishlist.includes(dish._id)) return;

    setWishlist((prev) => [...prev, dish._id]);
    toast.success("Added to wishlist!");
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${
            i <= rating ? "text-yellow-500" : "text-gray-400"
          } text-xl`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Modal handlers
  const handleView = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedDish(null);
    setIsModalOpen(false);
  };

  // Sorting
  const handleSort = (type) => {
    let sorted = [...filteredDishes];
    setSortType(type);

    if (type === "popularity")
      sorted.sort((a, b) => (b.review || 0) - (a.review || 0));
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
        <h1 className="font-bold text-[60px] text-white text-center">MENUS</h1>
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
              {[
                "All",
                "Fast Food",
                "Drinks",
                "Dessert",
                "Main Course",
                "Snacks",
                "Salad",
              ].map((cat, idx) => (
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
              ))}
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
                    Price: Low to High
                  </li>
                  <li
                    onClick={() => handleSort("highToLow")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left"
                  >
                    Price: High to Low
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Dishes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 p-2 lg:p-4">
            {currentDishes.length > 0 ? (
              currentDishes.map((food, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-xl rounded-2xl text-center p-5"
                >
                  <div
                    className="relative mx-auto 
      w-[180px] h-[180px]        
      sm:w-[180px] sm:h-[180px]   
      md:w-[220px] md:h-[220px]   
      lg:w-[230px] lg:h-[230px]
      2xl:w-[240px] 2xl:h-[240px]"
                  >
                    <div className="absolute inset-0 border-4 border-dotted border-red-500 rounded-full animate-spin-slow"></div>

                    <img
                      src={food?.image}
                      alt={food?.name}
                      className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] 
               object-cover rounded-full z-10"
                    />
                  </div>
                  <h2 className="text-lg font-bold mt-2">{food?.name}</h2>
                  <div className="mt-0">{renderStars(food?.review || 0)}</div>
                  <p className="text-red-600 text-lg font-semibold mt-2">
                    <span className="font-bold">Price: $</span> {food?.price}
                  </p>

                  <div className="2xl:flex items-center justify-between gap-3">
                    <div>
                      <button
                        onClick={() => handleView(food)}
                        className="rounded-3xl mx-auto xl:w-[150px] sm:w-[182px] bg-[#fde5e9] text-red-600 mt-4 hover:bg-red-700 hover:text-white transition-colors duration-500 ease-in-out"
                      >
                        <div className="flex gap-2 items-center justify-center p-2">
                          View Info <FaEye size={18} />
                        </div>
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handelAddTOCard(food)}
                        className="rounded-3xl mx-auto xl:w-[150px] sm:w-[182px] bg-[#fde5e9] text-red-600 mt-4 hover:bg-red-700 hover:text-white transition-colors duration-500 ease-in-out"
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

      {/* Modal */}

      {isModalOpen && selectedDish && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
          <div
            className="
  bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-[950px] relative
  max-h-[85vh] overflow-y-auto
  sm:max-h-[85vh] sm:overflow-y-auto
  md:max-h-[85vh] md:overflow-y-auto
"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>

            {/* Content Wrapper */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* LEFT IMAGE AREA */}
              <div className="flex justify-center items-center bg-[#fefaf6] rounded-lg p-4 sm:p-6">
                <div className="relative mx-auto w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[330px] lg:h-[330px] pb-4">
                  <div className="absolute inset-0 border-4 border-dotted border-red-500 rounded-full animate-spin-slow"></div>

                  <img
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[310px] lg:h-[310px] object-cover rounded-full mt-[10px] ml-[10px]"
                  />
                </div>
              </div>

              {/* RIGHT CONTENT AREA */}
              <div className="flex flex-col justify-start">
                {/* Title + Price */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-6">
                  <h2 className="text-2xl font-bold">{selectedDish.name}</h2>
                  <p className="text-2xl font-bold text-[#fc7819]">
                    ${selectedDish.price}
                  </p>
                </div>

                {/* Reviews Stars */}
                <div className="mt-2">
                  <span className="text-yellow-500">
                    {"★".repeat(selectedDish.review || 0)}
                    {"☆".repeat(5 - (selectedDish.review || 0))}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    ({selectedDish.customerReview?.length || 0} customer
                    reviews)
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 mt-4 text-justify">
                  {selectedDish.details ||
                    "Aliquam hendrerit a augue insu suscipit. Etiam aliquam massa quis des mauris commodo venenatis ligula commodo leez sed blandit convallis."}
                </p>

                <p className="mt-5 font-medium">
                  Available quantity: {selectedDish.quantity}
                </p>

                {/* Quantity Component */}
                <QuantitySection selectedDish={selectedDish} />

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <button
                    onClick={() => handelAddTOCard(selectedDish)}
                    className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <MdShoppingBasket /> Add to Cart
                  </button>

                  <button
                    onClick={() => handelWish(selectedDish)}
                    disabled={wishlist.includes(selectedDish._id)}
                    className={`px-5 py-2 rounded flex items-center gap-2 w-full sm:w-auto justify-center ${
                      wishlist.includes(selectedDish._id)
                        ? "bg-gray-300 cursor-not-allowed text-gray-600"
                        : "bg-[#fc7819] text-white hover:bg-orange-600"
                    }`}
                  >
                    <FaHeart />
                    {wishlist.includes(selectedDish._id)
                      ? "In Wishlist"
                      : "Add to Wishlist"}
                  </button>
                </div>

                {/* Reviews Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Customer Reviews
                  </h3>

                  {selectedDish.customerReview &&
                  selectedDish.customerReview.length > 0 ? (
                    selectedDish.customerReview.slice(0, 5).map((rev, idx) => (
                      <div key={idx} className="flex gap-4 mb-4 border-b pb-3">
                        <img
                          src={
                            rev.userImage || "https://via.placeholder.com/50"
                          }
                          alt={rev.userName}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold">
                              {rev.userName}
                            </span>
                            <span className="text-yellow-500">
                              {"★".repeat(Number(rev.rating))}
                              {"☆".repeat(5 - Number(rev.rating))}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {rev.comment}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// QuantitySection Component
const QuantitySection = ({ selectedDish }) => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < selectedDish.quantity) setQuantity(quantity + 1);
    else toast.error(`Only ${selectedDish.quantity} items available!`);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
    else toast.warning("Quantity cannot be less than 1!");
  };

  return (
    <div className="flex gap-10 items-center mt-8">
      <h3>Quantity</h3>
      <div className="flex items-center border rounded">
        <button onClick={decrease} className="px-3 py-1">
          -
        </button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="w-12 text-center border-x bg-white"
        />
        <button onClick={increase} className="px-3 py-1">
          +
        </button>
      </div>
    </div>
  );
};

export default Menu;
