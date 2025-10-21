import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  console.log(orders);
  console.log(selectedOrder);
  // ✅ Toastify initialize
  useEffect(() => {
    toast.dismiss(); // prevent multiple toasts stacking
  }, []);

  // ✅ Fetch all orders
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

  // ✅ Get color by status
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://resturent-management-server-three.vercel.app/finalorder/${orderId}`, {
        orderStatus: newStatus,
      });

      // local UI update
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );

      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order status!");
    }
  };

  // ✅ Handle details button
  const handleDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
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
              <th className="py-3 px-4">Customer Image</th>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Paid Status</th>
              <th className="py-3 px-4">Order Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={order?.user?.image || "https://i.pravatar.cc/40"}
                    alt="customer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4 text-gray-800">{order?.user?.name}</td>
                <td className="py-3 px-4 text-gray-700">{order?._id}</td>
                <td className="py-3 px-4 text-gray-700">${order?.total}</td>
                <td className="py-3 px-4 text-green-600 font-bold">
                  {order?.paidstatus}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={
                      order?.orderStatus
                        ? order.orderStatus.charAt(0).toUpperCase() +
                          order.orderStatus.slice(1).toLowerCase()
                        : "Pending"
                    } // 🔹 DB তে ছোট বা বড় যেভাবেই থাকুক, ঠিকভাবে দেখাবে
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium border outline-none ${getStatusColor(
                      order?.orderStatus
                    )}`}
                  >
                    <option value="Accepted">Accepted</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDetails(order)}
                    className="bg-gray-100 text-gray-700 px-4 py-1 rounded-lg hover:bg-gray-200 transition"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal */}
{showModal && selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-3 text-gray-500 text-xl font-bold"
      >
        ×
      </button>

      <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Order Details
      </h3>

      {/* ✅ Customer Info */}
      <div className="space-y-2 text-gray-700 mb-6">
        <p>
          <strong>Customer:</strong> {selectedOrder?.user?.name}
        </p>
        <p>
          <strong>Email:</strong> {selectedOrder?.user?.email}
        </p>
        <p>
          <strong>Order Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded ${
              selectedOrder?.orderStatus === "Completed"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {selectedOrder?.orderStatus}
          </span>
        </p>
        <p>
          <strong>Paid Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded ${
              selectedOrder?.paidstatus === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {selectedOrder?.paidstatus}
          </span>
        </p>
      </div>

      {/* ✅ Shipping Info Table */}
      <h4 className="text-lg font-semibold mb-2 text-gray-800">Shipping Info</h4>
      <table className="w-full text-left border border-gray-200 mb-6">
        <tbody>
          <tr className="border-b">
            <th className="p-2 w-1/3">Full Name</th>
            <td className="p-2">{selectedOrder?.orders?.[0]?.shipping?.fullName}</td>
          </tr>
          <tr className="border-b">
            <th className="p-2">Phone</th>
            <td className="p-2">{selectedOrder?.orders?.[0]?.shipping?.phoneNumber}</td>
          </tr>
          <tr className="border-b">
            <th className="p-2">Address</th>
            <td className="p-2">{selectedOrder?.orders?.[0]?.shipping?.address}</td>
          </tr>
          <tr className="border-b">
            <th className="p-2">City</th>
            <td className="p-2">{selectedOrder?.orders?.[0]?.shipping?.city}</td>
          </tr>
          <tr className="border-b">
            <th className="p-2">Region</th>
            <td className="p-2">{selectedOrder?.orders?.[0]?.shipping?.region}</td>
          </tr>
          <tr>
            <th className="p-2">Area</th>
            <td className="p-2">{selectedOrder?.orders?.[0]?.shipping?.area}</td>
          </tr>
        </tbody>
      </table>

      {/* ✅ Ordered Items Table */}
      <h4 className="text-lg font-semibold mb-2 text-gray-800">Ordered Items</h4>
      <table className="w-full text-left border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {selectedOrder?.orders?.[0]?.items?.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">
                <img
                  src={item?.itemImg}
                  alt={item?.itemName}
                  className="w-16 h-16 rounded object-cover"
                />
              </td>
              <td className="p-2">{item?.itemName}</td>
              <td className="p-2">${item?.itemPrice}</td>
             <td className="p-2">{item?.quantity || item?.itemQuantity}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}


    </div>
  );
};

export default ManageOrder;
