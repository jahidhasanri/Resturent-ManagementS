import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
const Menu = () => {
  const [allDishes, setDishes] = useState([]);
  const {user}=useContext(AuthContext)
  console.log(user);
console.log(allDishes);
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allsdishes");
        setDishes(response.data); 
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

const handelAddTOCard = async(food)=>{
const selectItem = {
  itemId: food?._id,
  itemImg: food?.image,
  itemName: food?.name,
  itemPrice: food?.price,
  userId:user._id,
  itemQuantity: 1
};
console.log(selectItem);
try {
    const res = await axios.post('http://localhost:5000/cardItem', selectItem);

   if (res.data.success) {
      toast.success('Item added to cart successfully! 🛒');
       window.dispatchEvent(new Event("cart-updated"));
    } else {
      toast.error(res.data.message || 'Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error(error);
    toast.error('Failed to add item to cart.');
  }

}

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-500 text-xl">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400 text-xl">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-[#f4f1ea]">
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
        <div className="col-span-3 bg-gray-200">
          {/* Sidebar / 3 columns */}
          Sidebar Content
        </div>
        <div className="col-span-9 grid lg:grid-cols-4 gap-4 p-4">
          {allDishes.map((food, idx) => (
            <div
              key={idx}
              className="bg-white shadow-xl rounded-2xl text-center p-5"
            >
              <div className="relative mx-auto w-[200px] h-[200px] pb-4">
                <div className="absolute inset-0  border-4 border-dotted border-red-500 rounded-full animate-spin-slow"></div>
                <img
                  src={food?.image}
                  alt={food?.name}
                  className="w-[300px] h-[200px]  object-cover rounded-full z-10 relative p-2"
                />
              </div>
              <h2 className="text-lg font-bold mt-2">{food?.name}</h2>

              <div className="mt-0">{renderStars(food?.review || 0)}</div>
              <p className="text-red-600 text-lg font-semibold mt-2">
                <span className="font-bold">Price: $</span> {food?.price}
              </p>

              <button onClick={()=>{
                handelAddTOCard(food)
              }}
                className="rounded-3xl mx-auto w-[182px] bg-[#fde5e9] text-red-600 mt-4 
             hover:bg-red-700 hover:text-white 
             transition-colors duration-500 ease-in-out"
              >
                <div className="flex gap-2 items-center justify-center p-2">
                  Order Now <FaShoppingBasket />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
