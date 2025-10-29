import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Review = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviewedItems, setReviewedItems] = useState([]); // 🔹 step 1
console.log(user);
  // 🔹 Fetch all orders
  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user?.email]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`https://resturent-management-server-three.vercel.app/finalOrders?email=${user.email}`);
      setOrders(res.data);

      // Collect all purchased items
      const items = [];
      res.data.forEach((order) => {
        if (order?.orders?.[0]?.items?.length > 0) {
          order.orders[0].items.forEach((item) => {
            if (order.orderStatus === "Completed") {
              items.push({
                ...item,
                orderId: order._id,
                orderStatus: order.orderStatus,
              });
            }
          });
        }
      });
      setAllItems(items);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // 🔹 Submit review
  const handleSubmitReview = async () => {
    if (!rating || rating < 1 || rating > 5) {
    toast.error("Rating must be between 1 and 5!");
    return;
  }
  if (!comment) {
    toast.error("Please write a comment!");
    return;
  }
    

    try {
      const res = await axios.post("https://resturent-management-server-three.vercel.app/addReview", {
        productId: selectedItem.itemId,
        userId: user._id,
        userName: user.displayName || user.name,
        userImage: user.photoURL || user.image,
        rating,
        comment,
      });

      if (res.data.success) {
        toast.success("Review submitted successfully!");
        setShowModal(false);
        setRating("");
        setComment("");
    
      } else {
        toast.error(res.data.message);
        setShowModal(false)
      }
    } catch (error) {
      console.error(error);
      toast.error("You have already reviewed this product.");
      setShowModal(false)
    }
  };

  return (
    <div className="mt-24 p-6">
      <h2 className="text-2xl font-bold mb-4">My Purchased Items</h2>

      {allItems.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">#</th>
              <th className="p-3 border-b text-left">Item Image</th>
              <th className="p-3 border-b text-left">Item Name</th>
              <th className="p-3 border-b text-left">Price</th>
              <th className="p-3 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border-b">{index + 1}</td>
                <td className="p-3 border-b">
                  <img
                    src={item.itemImg}
                    alt={item.itemName}
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td className="p-3 border-b">{item.itemName}</td>
                <td className="p-3 border-b">${item.itemPrice}</td>
                <td className="p-3 border-b text-center">
                  {item.orderStatus === "Completed" ? (
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowModal(true);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Review
                    </button>
                  ) : (
                    <span className="text-gray-400">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No completed orders found.</p>
      )}

      {/* ⭐ Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-center">Write a Review</h2>

            <label className="block font-medium mb-2">Rating (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-2 w-full rounded mb-3"
            />

            <label className="block font-medium mb-2">Comment</label>
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

export default Review;
