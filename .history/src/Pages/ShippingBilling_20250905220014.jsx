import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const ShippingBilling = () => {
  const [orders, setOrders] = useState([]); // এখন শুধু items না, পুরো order রাখব
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?._id) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orderInfo`, {
          params: { userId: user._id },
        });

        if (response.data.success) {
          setOrders(response.data.data || []); // multiple orders আসতে পারে
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user]);


  const allItems = orders.flatMap(order => order.items || []);

  const itemsTotal = allItems.reduce(
    (acc, item) => acc + Number(item.itemPrice || 0) * (item.quantity || 1),
    0
  );
  const deliveryFee = 70;
  const total = itemsTotal + deliveryFee;

  const allInfo ={
    orders,user,total

  }
  

   const handelPayment = async () => {
    const allInfo = {
      orders,
      user,
      total
    };
    console.log(allInfo);

    try {
      const response = await axios.post("http://localhost:5000/finalOrder", allInfo);
      console.log("Payment / Final Order Response:", response.data);
     
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };
  return (
    <div className="max-w-5xl mx-auto mt-10 grid grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="col-span-2 space-y-4">
        {/* প্রতিটা order এর Shipping Info */}
        {orders.map((order, index) => (
          <div key={order._id || index} className="bg-white rounded-2xl shadow p-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold">Shipping & Billing</h2>
              <button className="text-blue-600 hover:underline">EDIT</button>
            </div>

            <p className="mt-2 font-medium">{order.shipping.fullName}</p>
            <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mt-2">
              HOME
            </span>
            <p className="mt-1 text-gray-700">
              {order.shipping.address}, {order.shipping.area},{" "}
              {order.shipping.building}, {order.shipping.colony},{" "}
              {order.shipping.city}, {order.shipping.region}
            </p>
            <p className="text-gray-700 mt-1">
              Phone: {order.shipping.phoneNumber}
            </p>

            <div className="mt-3 border rounded p-3 text-blue-600 border-dashed">
              Collect your parcel from the nearest Pick-up Point with a reduced shipping fee
            </div>
          </div>
        ))}

        {/* সব items একত্রে দেখানো */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-4">
          <h3 className="text-md font-semibold border-b pb-2">
            Packages ({allItems.length} Items)
          </h3>

          {/* Delivery Option */}
          <div className="flex items-center justify-between border p-3 rounded cursor-pointer hover:bg-gray-50">
            <div className="flex items-center space-x-2">
              <input type="radio" checked readOnly />
              <span>৳ {deliveryFee} Standard Delivery</span>
            </div>
            <p className="text-gray-500 text-sm">Guaranteed by 7-11 Sep</p>
          </div>

          {/* Dynamic Item List */}
          {allItems.length > 0 ? (
            allItems.map((item, index) => (
              <div
                key={item._id || index}
                className="flex items-center space-x-4 border-t pt-4"
              >
                <img
                  src={item.itemImg}
                  alt={item.itemName}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">
                    {item.itemName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {item.brand || "No Brand"}
                  </p>
                  <div className="flex justify-between mt-2">
                    <span className="font-semibold text-orange-600">
                      ৳ {item.itemPrice}
                    </span>
                    <span className="text-gray-600">
                      Qty: {item.quantity || 1}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No items found in order.</p>
          )}
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
            Invoice and Contact Info{" "}
            <button className="text-blue-600 text-sm">Edit</button>
          </h2>
        </div>

        <div className="border-t pt-2 text-sm text-gray-700 space-y-1">
          <div className="flex justify-between">
            <span>Items Total ({allItems.length} Items)</span>
            <span>৳ {itemsTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>৳ {deliveryFee}</span>
          </div>
          <div className="flex justify-between font-bold text-orange-600 border-t pt-1">
            <span>Total:</span>
            <span>৳ {total}</span>
          </div>
          <p className="text-xs text-gray-500">
            VAT included, where applicable
          </p>
        </div>

        <button onClick={handelPayment} className="w-full bg-orange-500 text-white py-2 rounded font-medium hover:bg-orange-600">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default ShippingBilling;
