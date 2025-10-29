import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
          order._id === orderId
            ? { ...order, orderStatus: newStatus }
            : order
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
                <td className="py-3 px-4 text-gray-800">
                  {order?.user?.name}
                </td>
                <td className="py-3 px-4 text-gray-700">{order?._id}</td>
                <td className="py-3 px-4 text-gray-700">${order?.total}</td>
                <td className="py-3 px-4 text-green-600 font-bold">
                  {order?.paidstatus}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={order?.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={`px-3 py-1 rounded-full text-sm font-medium border outline-none ${getStatusColor(
                      order?.orderStatus
                    )}`}
                  >
                    <option value="Accepted">Accepted</option>
                    <option value="Completed">Completed</option>
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
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Order Details
            </h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Customer:</strong> {selectedOrder?.user?.name}</p>
              <p><strong>Email:</strong> {selectedOrder?.user?.email}</p>
              <p><strong>Order ID:</strong> {selectedOrder?._id}</p>
              <p><strong>Total:</strong> ${selectedOrder?.total}</p>
              <p><strong>Paid Status:</strong> {selectedOrder?.paidstatus}</p>
              <p><strong>Order Status:</strong> {selectedOrder?.orderStatus}</p>
              <p><strong>Payment Method:</strong> {selectedOrder?.paymentMethod}</p>
              <p><strong>Address:</strong> {selectedOrder?.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
