import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserOrder = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

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

  // 🧩 Review Submit Handler
  const handleSubmitReview = async () => {
    if (!rating || !comment) return toast.error("Please fill all fields");

    try {
      const res = await axios.post("http://localhost:5000/addReview", {
        productId: selectedItem.itemId,
        userId: user._id,
        userName: user.displayName || user.name,
        userImage: user.photoURL,
        rating,
        comment,
      });

      if (res.data.success) {
        toast.success("Review submitted!");
        setShowModal(false);
        setRating("");
        setComment("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error submitting review");
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
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{index + 1}</td>

                {/* Loop through each item in this order */}
                {order?.orders?.[0]?.items?.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">
                      <img
                        src={item?.itemImg}
                        alt={item?.itemName}
                        className="w-16 h-16 rounded object-cover"
                      />
                    </td>
                    <td className="p-3 border-b">{order.total}</td>
                    <td className="p-3 border-b font-bold">
                      {order.orderStatus}
                    </td>
                    <td className="p-3 border-b text-center">
                      {order.orderStatus === "Completed" ? (
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowModal(true);
                          }}
                          className="btn btn-primary"
                        >
                          Review
                        </button>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}

      {/* ⭐ Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Write a Review
            </h2>

            <label className="block mb-2 font-medium">Rating (1–5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 w-full mb-3 rounded"
            />

            <label className="block mb-2 font-medium">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 w-full rounded mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
