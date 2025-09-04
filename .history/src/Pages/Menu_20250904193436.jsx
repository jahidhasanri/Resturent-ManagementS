import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = () => {
  const [allDishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allsdishes");
        setDishes(response.data); // এখানে response.data দিতে হবে
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-500 text-xl">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-400 text-xl">★</span>);
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
              className="bg-white shadow-xl rounded-lg text-center p-5"
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
              <div className="mt-3">{renderStars(food?.review || 0)}</div> 
              <p className="text-red-600 text-lg font-semibold mt-2">Price: {food?.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
