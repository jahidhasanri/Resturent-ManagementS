import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { IoIosArrowDown } from "react-icons/io";
const Menu = () => {
  const [allDishes, setDishes] = useState([]);
  const {user}=useContext(AuthContext)
  console.log(user);
console.log(allDishes);
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("https://resturent-management-server-three.vercel.app/allsdishes");
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
    const res = await axios.post('https://resturent-management-server-three.vercel.app/cardItem', selectItem);

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
 const [open, setOpen] = useState(false);

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
        <div className="col-span-3 space-y-6 p-4">
  {/* Search Box */}
  <div className="bg-white shadow rounded-xl p-4">
    <h3 className="font-bold text-lg border-b-2 border-red-500 inline-block pb-1">
      Search
    </h3>
    <div className="mt-3 flex items-center bg-[#f4f1ea] rounded-md overflow-hidden">
      <input
        type="text"
        placeholder="Search here"
        className="w-full px-3 py-2 outline-none bg-transparent"
      />
      <button className="px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1110.6-10.6 7.5 7.5 0 01-10.6 10.6z"
          />
        </svg>
      </button>
    </div>
  </div>

  {/* Categories */}
  <div className="bg-white shadow rounded-xl p-4 pt-20">
    <h3 className="font-bold text-lg border-b-2 border-red-500 inline-block pb-1">
      Search
    </h3>
    <div className="mt-3 flex flex-wrap gap-2">
      {["Cheese", "Cocktail", "Drink", "Uncategorized", "Pizza", "Non Veg"].map(
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

  {/* Price Filter */}
  <div className="bg-white shadow rounded-xl p-4">
    <h3 className="font-bold text-lg border-b-2 border-red-500 inline-block pb-1">
      Filter By Price
    </h3>
    <div className="mt-5">
      {/* Range Slider */}
      <input
        type="range"
        min="100"
        max="1000"
        step="50"
        className="w-full accent-red-600"
      />
      <p className="mt-3 text-gray-700 font-semibold">
        Price: <span className="text-black">$100</span> -{" "}
        <span className="text-black">$1000</span>
      </p>
      <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
        FILTER
      </button>
    </div>
  </div>
</div>

        
        {/* sorting button */}

       
        <div className="col-span-9">
           <div className="relative flex justify-end w-full">
  {/* Dropdown Button */}
  <button
    onClick={() => setOpen(!open)}
    className="px-4 py-2 bg-white flex gap-4 items-center text-black rounded-md mt-10 mb-10 border border-black"
  >
    Default Sorting
    <IoIosArrowDown />
  </button>

  {/* Dropdown Menu */}
  {open && (
    <div className="absolute right-0 mt-20 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <ul className="py-2 text-sm text-gray-700">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left">
          Default Sorting
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left">
          Sort by popularity
        </li>
      
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left">
          Sort by price: low to high
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left">
          Sort by price: high to low
        </li>
      </ul>
    </div>
  )}
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
      </div>
 
  );
};

export default Menu;
