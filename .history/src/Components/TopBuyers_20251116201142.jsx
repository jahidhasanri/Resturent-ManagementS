import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../topBuyer.css"

const TopBuyers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get(
          "https://resturent-management-server-three.vercel.app/TopThreeUser"
        );
        if (response.data.success) {
          setTopUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-14 bg-white">
      <p className="text-xl font-semibold text-center text-[#fc7819] mt-5 mb-4">
        Our Top Buyers
      </p>
      <h2 className="text-2xl font-bold text-center mt-5 mb-8">
        Meet the valued customers who trust and inspire us every day
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topUsers.map((user) => (
          <div key={user._id} className="card relative p-6 rounded-xl bg-white flex flex-col items-center text-center shadow-md transition-transform transform hover:scale-105 hover:shadow-xl overflow-hidden">
            
            {/* Animated Border */}
            <span className="top"></span>
            <span className="right"></span>
            <span className="bottom"></span>
            <span className="left"></span>

            {/* Card Content */}
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover mb-4 z-10 relative"
            />
            <h3 className="text-xl font-semibold z-10 relative">{user.name}</h3>
            <p className="text-gray-500 mt-1 z-10 relative">Orders: {user.totalOrders}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBuyers;
