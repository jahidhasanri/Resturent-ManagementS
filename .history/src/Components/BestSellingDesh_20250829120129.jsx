import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight, FaEye, FaHeart } from "react-icons/fa";
import { MdShoppingBasket } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const BestSellingDesh = () => {
  const [dishes, setDishes] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);
console.log(dishes);
  // Modal State
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Fetch all best selling dishes
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allsdishes");
        const bestSeller = response.data.filter((dish) => dish.isBestSeller);
        setDishes(bestSeller);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  // 🔹 Fetch user's wishlist from backend
  useEffect(() => {
    if (!user?._id) return;
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/wishes?userId=${user._id}`
        );
        const wishlistIds = res.data.map((wish) => wish.itemId); // only itemIds
        setWishlist(wishlistIds);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, [user?._id]);

  // 🔹 Add item to wishlist
  const handelWish = (dish) => {
    const wishlistInf = {
      itemId: dish._id,
      userId: user?._id,
    };

    Swal.fire({
      title: "Do you want to add this item to your wishlist?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add",
      denyButtonText: `Don't add`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("http://localhost:5000/wishes", wishlistInf)
          .then(() => {
            setWishlist((prev) => [...prev, dish._id]); // 🔹 update state
            Swal.fire(
              "Added!",
              "This item has been added to your wishlist.",
              "success"
            );
          })
          .catch((err) => {
            console.error("Error adding to wishlist:", err);
            Swal.fire(
              "Error!",
              "Something went wrong. Try again later.",
              "error"
            );
          });
      } else if (result.isDenied) {
        Swal.fire(
          "Not added",
          "This item was not added to your wishlist.",
          "info"
        );
      }
    });
  };

  // 🔹 Modal Handler
  const handleView = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedDish(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f5f2eb]">
      <div className="container mx-auto pt-[127px] pb-[117px]">
        <img
          src="/public/images/popularDishesShape1_1.png"
          className="absolute left-0 lg:mt-[565px]"
          alt=""
        />
        <img
          src="/public/images/popularDishesShape1_2.png"
          className="absolute right-5 mt-[-50px] animate-float"
          alt=""
        />

        <h2 className="text-xl font-semibold mb-4 text-center text-[#fc7819]">
          POPULAR DISHES
        </h2>
        <h2 className="text-[40px] font-bold mb-10 text-center">
          Best Selling Dishes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {dishes.map((dish) => (
            <div
              key={dish._id}
              className="relative group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500"
            >
              {/* Hover Background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://i.ibb.co.com/99mz085T/freepik-upload-50378.png')",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => handelWish(dish)}
                disabled={wishlist.includes(dish._id)} // 🔹 disable if already in wishlist
                className={`absolute top-4 right-4 z-30 rounded-full p-2 shadow-md transition ${
                  wishlist.includes(dish._id)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-white hover:bg-red-100"
                }`}
              >
                <FaHeart
                  className={`${
                    wishlist.includes(dish._id)
                      ? "text-gray-400"
                      : "text-red-500"
                  }`}
                  size={20}
                />
              </button>

              {/* Image */}
              <div className="relative z-20 flex justify-center mt-10">
                <img
                  src={dish?.image}
                  alt={dish?.name}
                  className="w-[170px] h-[170px] rounded-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="relative z-20 p-6 text-center transition-all duration-500 group-hover:text-white">
                <h3 className="font-bold text-xl mb-2">{dish.name}</h3>
                <p className="text-gray-500 text-[18px] mb-4 group-hover:text-white/90">
                  The Dish price
                </p>
                <p className="text-lg font-bold text-[#fc7819] group-hover:text-white">
                  ${dish.price}
                </p>
              </div>

              {/* Hover Icons */}
              <div className="absolute top-16 right-4 flex flex-col gap-3 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-30">
                <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition">
                  <MdShoppingBasket size={18} />
                </button>
                <button
                  onClick={() => handleView(dish)}
                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
                >
                  <FaEye size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 uppercase rounded shadow flex items-center gap-2 text-center transition duration-300 ease-in-out">
            VIEW ALL ITEM <FaArrowRight className="text-white" />
          </button>
        </div>
      </div>

      {/* 🔹 Modal */}
      {isModalOpen && selectedDish && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 lg:w-[900px] relative">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        ✖
      </button>

      {/* Content Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div className="flex justify-center items-center bg-[#fefaf6] rounded-lg p-6">
          <div className="relative mx-auto w-32 h-32 pb-4">
                <div className="absolute inset-0 border-4 border-dotted border-red-500  rounded-full animate-spin-slow"></div>
               <img
            src={selectedDish.image}
            alt={selectedDish.name}
            className="w-[320px] h-[320px] object-cover rounded-full"
          />
              </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-start">
          {/* Title + Price */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{selectedDish.name}</h2>
            <p className="text-2xl font-bold text-[#fc7819]">
              ${selectedDish.price}
            </p>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">★★★★★</span>
            <p className="text-sm text-gray-500">(2 customer reviews)</p>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-4">
            {selectedDish.description ||
              "Aliquam hendrerit a augue insu suscipit. Etiam aliquam massa quis des mauris commodo venenatis ligula commodo leez sed blandit convallis."}
          </p>

          {/* Quantity + Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border rounded">
              <button className="px-3 py-1">-</button>
              <input
                type="text"
                value={1}
                readOnly
                className="w-12 text-center border-x"
              />
              <button className="px-3 py-1">+</button>
            </div>

            <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 flex items-center gap-2">
              <MdShoppingBasket /> Add to Cart
            </button>

            <button className="bg-[#fc7819] text-white px-5 py-2 rounded hover:bg-orange-600 flex items-center gap-2">
              <FaHeart /> Add to Wishlist
            </button>
          </div>

          {/* Social Share */}
          <div className="flex items-center gap-3 mt-6">
            <p className="font-semibold">Share With Friends:</p>
            <div className="flex gap-3 text-gray-600">
              <i className="fab fa-facebook-f cursor-pointer hover:text-blue-600"></i>
              <i className="fab fa-youtube cursor-pointer hover:text-red-600"></i>
              <i className="fab fa-twitter cursor-pointer hover:text-sky-500"></i>
              <i className="fab fa-instagram cursor-pointer hover:text-pink-500"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default BestSellingDesh;
