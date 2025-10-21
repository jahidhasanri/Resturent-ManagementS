import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://resturent-management-server-three.vercel.app/finalorder");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Manage Orders
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="py-3 px-4 font-medium text-gray-800 flex items-center gap-3">
                  <img
                    src={order.customerImage || "https://i.pravatar.cc/40"}
                    alt="customer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p>{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerType}</p>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">{order.orderId}</td>
                <td className="py-3 px-4 text-gray-700">${order.amount}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-lg hover:bg-gray-200 transition">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            1
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            2
          </button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
