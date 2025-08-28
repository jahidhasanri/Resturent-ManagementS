import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import DonutChart from "../Chart/DonutChart";
import { IoCopy } from "react-icons/io5";

const Analytic = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-[#12121e] min-h-screen">
      <div className="py-10 px-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-white text-[24px] font-bold">ANALYTIC</h3>
          </div>
          <div className="flex gap-2 items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.image}
              alt="user"
            />
            <h4 className="text-white text-[14px] font-semibold">
              {user?.name}
            </h4>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="grid  gap-4">
            <div className="bg-[#1c1c2e] rounded-xl p-6 flex justify-between">
              <div>
                <h4 className="text-gray-400 text-sm">Orders</h4>
              <p className="text-white text-3xl font-bold">201</p>
              <p className="text-green-400 text-xs mt-2">
                ↑ 8.2% since last month
              </p>
              </div>
              <div><IoCopy className="text-white w-[50px] h-[50px]" /></div>
            </div>

            {/* Month total */}
            <div className="bg-[#1c1c2e] rounded-xl p-6">
              <h4 className="text-gray-400 text-sm">Month total</h4>
              <p className="text-white text-3xl font-bold">$25,410</p>
              <p className="text-red-400 text-xs mt-2">
                ↓ 0.2% since last month
              </p>
            </div>
          </div>
      
      <div className="grid gap-4">
        <div className="bg-[#1c1c2e] rounded-xl p-6">
              <h4 className="text-gray-400 text-sm">Approved</h4>
              <p className="text-white text-3xl font-bold">36</p>
              <p className="text-green-400 text-xs mt-2">
                ↑ 3.4% since last month
              </p>
            </div>

            {/* Revenue */}
            <div className="bg-[#1c1c2e] rounded-xl p-6">
              <h4 className="text-gray-400 text-sm">Revenue</h4>
              <p className="text-white text-3xl font-bold">$1,352</p>
              <p className="text-red-400 text-xs mt-2">
                ↓ 1.2% since last month
              </p>
            </div>
      </div>

          {/* Users (Complete Card) */}
          <div className="bg-[#1c1c2e] rounded-xl p-6  items-center justify-center">
            <h4 className="text-gray-400 text-sm">Users</h4>
            <p className="text-white text-3xl font-bold">4,890</p>
           <DonutChart></DonutChart>
            <div className="flex gap-4 mt-3 text-gray-300 text-xs">
              <p><span className="text-yellow-400">●</span> 62% New</p>
              <p><span className="text-orange-400">●</span> 26% Returning</p>
              <p><span className="text-yellow-200">●</span> 12% Inactive</p>
            </div>
          </div>


          {/* Subscriptions */}
          <div className="bg-[#1c1c2e] rounded-xl p-6  items-center justify-center">
            <h4 className="text-gray-400 text-sm">Subscriptions</h4>
            <p className="text-white text-3xl font-bold">1,201</p>
            {/* এখানে Subscriptions এর DonutChart বসানো যাবে */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytic;
