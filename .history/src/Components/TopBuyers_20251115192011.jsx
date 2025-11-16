import React, { useEffect, useState } from "react";
import axios from "axios";

const TopBuyers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await axios.get("https://resturent-management-server-three.vercel.app/TopThreeUser"); 
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our Top Buyers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-500 mt-1">Orders: {user.totalOrders}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBuyers;
