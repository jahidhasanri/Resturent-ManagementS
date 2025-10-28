import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserOrder = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch Orders
  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user?.email]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/finalOrders?email=${user.email}`
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Handle Cancel Button
  const handleCancelClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Confirm Delete
const confirmDelete = async () => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/finalOrders/${selectedOrder._id}`
    );

    if (res.data.success) {
      toast.success("Order cancelled successfully!");
      setOrders((prev) =>
        prev.filter((o) => o._id !== selectedOrder._id)
      );
    } else {
      toast.error(res.data.message || "Failed to delete order!");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error deleting order!");
  } finally {
    setShowModal(false);
  }
};



  return (
    <div className="p-6 mt-24">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Item Img</th>
              <th className="p-3 border-b">Total</th>
              <th className="p-3 border-b">Payment</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Transaction ID</th>
              <th className="p-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{index + 1}</td>
                {order?.orders?.[0]?.items?.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">
                      <img
                        src={item?.itemImg}
                        alt={item?.itemName}
                        className="w-16 h-16 rounded object-cover"
                      />
                    </td>
                    
                  </tr>
                ))}
                <td className="p-3 border-b">{order.total}</td>
                <td className="p-3 border-b capitalize text-green-600 font-bold">{order.paidstatus}</td>
                <td className="p-3 border-b font-bold">{order.orderStatus}</td>
                <td className="p-3 border-b">{order.tran_id}</td>
                <td className="p-3 border-b text-center">
                  <button className="btn btn-primary mr-2">Download Invoice</button>
                  {order.orderStatus === "Pending" ? (
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => handleCancelClick(order)}
                    >
                      Cancel Order
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Are you sure you want to cancel this order?
            </h2>
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
