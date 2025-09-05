import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const ShippingBilling = () => {
    const {items,setItems}=useState([]);
    const{user}=useContext(AuthContext);
    useEffect(()=>{
        const fetchItem = async()=>{
             try {
        const response = await axios.get(`http://localhost:5000/orderInfo`, {
          params: { userId: user._id },
        });
        if (response.data.success) {
          setItems(response.data.data);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }

        }
        fetchItem();
    },[])
  return (
    <div className="max-w-5xl mx-auto mt-10 grid grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="col-span-2 space-y-4">
        {/* Shipping & Billing */}
        <div className="bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Shipping & Billing</h2>
            <button className="text-blue-600 hover:underline">EDIT</button>
          </div>
          <p className="mt-2 font-medium">Consectetur qui quo &nbsp; 01731847198</p>
          <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mt-2">HOME</span>
          <p className="mt-1 text-gray-700">
            Enim et laborum Min, Mirpur Rupnagar, Dhaka - North, Dhaka
          </p>
          <div className="mt-3 border rounded p-3 text-blue-600 border-dashed">
            Collect your parcel from the nearest Daraz Pick-up Point with a reduced shipping fee
          </div>
        </div>

        {/* Package */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-4">
          <h3 className="text-md font-semibold border-b pb-2">Package 1 of 1</h3>

          {/* Delivery Option */}
          <div className="flex items-center justify-between border p-3 rounded cursor-pointer hover:bg-gray-50">
            <div className="flex items-center space-x-2">
              <input type="radio" checked readOnly />
              <span>৳ 70 Standard Delivery</span>
            </div>
            <p className="text-gray-500 text-sm">Guaranteed by 7-11 Sep</p>
          </div>

          {/* Item */}
          <div className="flex items-center space-x-4 border-t pt-4">
            <img
              src="https://static-01.daraz.com.bd/p/1aa2d1c66f504a5f9919c8285d286276.jpg"
              alt="Item"
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">
                2Pcs Game King - Sweatproof Gloves for PUBG Mobile Gaming - Black - Finger Grip For Gaming - PUBG Finger
              </h4>
              <p className="text-sm text-gray-500">No Brand, Color Family: Black</p>
              <div className="flex justify-between mt-2">
                <span className="font-semibold text-orange-600">৳ 90</span>
                <span className="text-gray-600">Qty: 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-white rounded-2xl shadow p-4 h-fit space-y-4">
        <div>
          <h2 className="font-semibold">Promotion</h2>
          <div className="flex mt-2 space-x-2">
            <input
              type="text"
              placeholder="Enter Store/Daraz Code"
              className="flex-1 border rounded px-2 py-1"
            />
            <button className="bg-blue-500 text-white px-3 rounded">APPLY</button>
          </div>
        </div>

        <div className="border-t pt-2">
          <h2 className="font-semibold flex justify-between">
            Invoice and Contact Info <button className="text-blue-600 text-sm">Edit</button>
          </h2>
        </div>

        <div className="border-t pt-2 text-sm text-gray-700 space-y-1">
          <div className="flex justify-between">
            <span>Items Total (3 Items)</span>
            <span>৳ 270</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>৳ 70</span>
          </div>
          <div className="flex justify-between font-bold text-orange-600 border-t pt-1">
            <span>Total:</span>
            <span>৳ 340</span>
          </div>
          <p className="text-xs text-gray-500">VAT included, where applicable</p>
        </div>

        <button className="w-full bg-orange-500 text-white py-2 rounded font-medium hover:bg-orange-600">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default ShippingBilling;
