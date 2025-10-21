import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 11;

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

  // ✅ Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center md:text-left">
        Manage Orders
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="w-full text-left border-collapse text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Paid Status</th>
              <th className="py-3 px-4">Order Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
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
                  <div className="text-gray-800">{order?.user?.name}</div>
                </td>
                <td className="py-3 px-4 text-gray-700 break-words">
                  {order?._id}
                </td>
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
                    }
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
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Section */}
      <div className="flex justify-center mt-6 flex-wrap gap-2">
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
          }
          disabled={currentPage === 1}
          className={`px-3 py-1 border rounded-md ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          ← Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i + 1
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < totalPages ? prev + 1 : prev
            )
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border rounded-md ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Next →
        </button>
      </div>

      {/* ✅ Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
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
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              Shipping Info
            </h4>
            <table className="w-full text-left border border-gray-200 mb-6 text-sm">
              <tbody>
                {Object.entries(
                  selectedOrder?.orders?.[0]?.shipping || {}
                ).map(([key, value]) => (
                  <tr key={key} className="border-b">
                    <th className="p-2 capitalize w-1/3">
                      {key.replace(/([A-Z])/g, " $1")}
                    </th>
                    <td className="p-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ Ordered Items Table */}
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              Ordered Items
            </h4>
            <table className="w-full text-left border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.orders?.[0]?.items?.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">
                      <img
                        src={item?.itemImg}
                        alt={item?.itemName}
                        className="w-16 h-16 rounded object-cover"
                      />
                    </td>
                    <td className="p-2">{item?.itemName}</td>
                    <td className="p-2">${item?.itemPrice}</td>
                    <td className="p-2">
                      {item?.quantity || item?.itemQuantity}
                    </td>
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
