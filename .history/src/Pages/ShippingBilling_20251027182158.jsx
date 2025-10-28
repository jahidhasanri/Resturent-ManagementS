import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const ShippingBilling = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?._id) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orderInfo`, {
          params: { userId: user._id },
        });

        if (response.data.success) {
          setOrders(response.data.data || []);
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

  const allItems = orders.flatMap((order) => order.items || []);

  const itemsTotal = allItems.reduce(
    (acc, item) => acc + Number(item.itemPrice || 0) * (item.quantity || 1),
    0
  );
  const deliveryFee = 70;
  const total = itemsTotal + deliveryFee;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/finalOrder", {
        orders,
        user,
        total,
      });

      if (response.data.url) {
        window.location.replace(response.data.url);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-8 mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-3 md:px-0">
      {/* Left Section */}
      <div className="md:col-span-2 space-y-4">
        {orders.map((order, index) => (
          <div
            key={order._id || index}
            className="bg-white rounded-2xl shadow p-3 md:p-4"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-base md:text-lg font-semibold">
                Shipping & Billing
              </h2>
              <button className="text-blue-600 hover:underline text-sm md:text-base">
                EDIT
              </button>
            </div>

            <p className="mt-2 font-medium text-sm md:text-base">
              {order.shipping.fullName}
            </p>
            <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mt-2">
              HOME
            </span>
            <p className="mt-1 text-gray-700 text-sm md:text-base">
              {order.shipping.address}, {order.shipping.area},{" "}
              {order.shipping.building}, {order.shipping.colony},{" "}
              {order.shipping.city}, {order.shipping.region}
            </p>
            <p className="text-gray-700 mt-1 text-sm md:text-base">
              Phone: {order.shipping.phoneNumber}
            </p>

            <div className="mt-3 border rounded p-2 md:p-3 text-blue-600 border-dashed text-xs md:text-sm">
              Collect your parcel from the nearest Pick-up Point with a reduced
              shipping fee
            </div>
          </div>
        ))}

        {/* Items List */}
        <div className="bg-white rounded-2xl shadow p-3 md:p-4 space-y-4">
          <h3 className="text-sm md:text-md font-semibold border-b pb-2">
            Packages ({allItems.length} Items)
          </h3>

          {/* Delivery Option */}
          <div className="flex items-center justify-between border p-2 md:p-3 rounded cursor-pointer hover:bg-gray-50 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <input type="radio" checked readOnly />
              <span>৳ {deliveryFee} Standard Delivery</span>
            </div>
            <p className="text-gray-500 text-xs md:text-sm">
              Guaranteed by 7-11 Sep
            </p>
          </div>

          {/* Dynamic Item List */}
          {allItems.length > 0 ? (
            allItems.map((item, index) => (
              <div
                key={item._id || index}
                className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 border-t pt-4 text-sm md:text-base"
              >
                <img
                  src={item.itemImg}
                  alt={item.itemName}
                  className="w-20 h-20 object-cover rounded mb-2 sm:mb-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-medium text-gray-800">
                    {item.itemName}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500">
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
            <p className="text-gray-500 text-center">
              No items found in order.
            </p>
          )}
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-white rounded-2xl shadow p-3 md:p-4 h-fit space-y-4">
        <div>
          <h2 className="font-semibold text-sm md:text-base">Promotion</h2>
          <div className="flex mt-2 space-x-2">
            <input
              type="text"
              placeholder="Enter Store/Daraz Code"
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <button className="bg-blue-500 text-white px-3 rounded text-sm">
              APPLY
            </button>
          </div>
        </div>

        <div className="border-t pt-2">
          <h2 className="font-semibold flex justify-between text-sm md:text-base">
            Invoice and Contact Info{" "}
            <button className="text-blue-600 text-xs md:text-sm">Edit</button>
          </h2>
        </div>

        <div className="border-t pt-2 text-xs md:text-sm text-gray-700 space-y-1">
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
          <p className="text-[10px] md:text-xs text-gray-500">
            VAT included, where applicable
          </p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-2 rounded font-medium text-sm md:text-base ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {loading ? "Processing..." : "Proceed to Pay"}
        </button>
      </div>
    </div>
  );
};

export default ShippingBilling;
