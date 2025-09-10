import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import DonutChart from "../Chart/DonutChart";
import { IoCopyOutline } from "react-icons/io5";
import { CiSquareChevRight } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { CiMoneyCheck1 } from "react-icons/ci";
import DonutChart2 from "../Chart/Donutchart2";
import Layout3 from "../Chart/Layout3";

const Analytic = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-[#12121e] min-h-screen">
      <div className="py-10 xl:px-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div>
            <h3 className="text-white text-[24px] font-bold">ANALYTIC</h3>
          </div>
          <div className="flex gap-2 items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={user?.image}
              alt="user"
            />
            <h4 className="text-white text-[14px]  font-semibold">
              {user?.name}
            </h4>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-6">
          <div className="grid  gap-4">
            <div className="bg-[#1c1c2e] w-[310px] xl:w-[410px] 2xl:w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
              <div>
                <h4 className="text-gray-400 text-sm mb-3">Users</h4>
              <p className="text-white text-3xl font-bold mb-3">201</p>
              <p className="text-green-400 text-xs">
                ↑ 8.2% since last month
              </p>
              </div>
              <div><IoCopyOutline className="text-white w-[50px] h-[50px]" /></div>
            </div>

            {/* Month total */}
            <div className="bg-[#1c1c2e] w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
              <div className="">
                <h4 className="text-gray-400 text-sm  mb-3">Month total</h4>
              <p className="text-white text-3xl font-bold mb-3">$25,410</p>
              <p className="text-red-400 text-xs ">
                ↓ 0.2% since last month
              </p>
              </div>
              <div>
                <BsCurrencyDollar className="text-white w-[50px] h-[50px]" />
              </div>
            </div>
          </div>
      
      <div className="grid gap-4">
        <div className="bg-[#1c1c2e] w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
              <div className="">
              <h4 className="text-gray-400 text-sm mb-3">Approved</h4>
              <p className="text-white text-3xl font-bold mb-3">36</p>
              <p className="text-green-400 text-xs ">
                ↑ 3.4% since last month
              </p>
              </div>
              <div><CiSquareChevRight className="text-white w-[50px] h-[50px]" /></div>
            </div>

            {/* Revenue */}
            <div className="bg-[#1c1c2e] w-[310px] mx-auto rounded-xl p-6 flex justify-between h-[165px]">
              <div>
                <h4 className="text-gray-400 text-sm mb-3">Revenue</h4>
              <p className="text-white text-3xl font-bold mb-3">$1,352</p>
              <p className="text-red-400 text-xs mt-2">
                ↓ 1.2% since last month
              </p>
              </div>
              <div><CiMoneyCheck1 className="text-white w-[50px] h-[50px]" /></div>
            </div>
      </div>

          {/* order (Complete Card) */}
          <div className="bg-[#1c1c2e] rounded-xl p-6 w-[310px] mx-auto items-center justify-center h-[346px]">
            <h4 className="text-gray-400 text-sm mb-3">Orders</h4>
            <p className="text-white text-3xl font-bold">4,890</p>
           <DonutChart></DonutChart>
            <div className="flex gap-4 mt-3 text-gray-300 text-xs">
              <p><span className="text-yellow-400">●</span> 62% Done </p>
              <p><span className="text-orange-400">●</span> 30% Pending</p>
              <p><span className="text-yellow-200">●</span> 8% Cancel</p>
            </div>
          </div>


          {/* Subscriptions */}
          <div className="bg-[#1c1c2e] rounded-xl p-6 w-[310px] mx-auto items-center justify-center h-[346px]">
            <h4 className="text-gray-400 text-sm mb-3">Subscriptions</h4>
            <p className="text-white text-3xl font-bold mb-2">1,201</p>
            <p className="text-white font-light text-xl">Since last month</p>
            <DonutChart2></DonutChart2>
          </div>

        </div>
        {/* layout3 */}
        <Layout3></Layout3>
      </div>
    </div>
  );
};

export default Analytic;
