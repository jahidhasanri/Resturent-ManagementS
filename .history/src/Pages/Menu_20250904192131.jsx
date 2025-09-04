import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = () => {
    const [allDishes,setDishes]=useState('')
    useEffect(() => {
        const fetchDishes = async () => {
          try {
            const response = await axios.get("http://localhost:5000/allsdishes");
            setDishes(response);
          } catch (error) {
            console.error("Error fetching dishes:", error);
          }
        };
        fetchDishes();
      }, []);
      console.log(allDishes);
  return (
    <div className="bg-[#f4f1ea]">
        <div
          style={{
            backgroundImage: "url('/public/images/breadcumb.jpg')",
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
        <div className="col-span-9 bg-gray-100">
          {/* Main Content / 9 columns */}
          {/* {allDishes.map((food, idx) => (
            <div className="bg-white shadow-xl rounded-lg text-center p-5 my-10">
                
              <div className="relative mx-auto w-32 h-32 pb-4">
                <div className="absolute inset-0 border-4 border-dotted border-red-500  rounded-full animate-spin-slow"></div>
                <img
                  src={food.img}
                  alt={food.title}
                  className="w-[200px] h-[130px] object-cover rounded-full z-10 relative p-2"
                />
              </div>
              <h2 className="text-lg font-bold">{food.title}</h2>
              <p className="text-gray-500">The Registration Fee</p>
              <p className="text-red-600 text-lg font-semibold">{food.price}</p>
            </div>
        ))} */}
        </div>
      </div>
    </div>
  );
};

export default Menu;
