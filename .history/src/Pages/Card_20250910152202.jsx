import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [cardItems, setCardItems] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cardItems`, {
          params: { userId: user._id },
        });
        if (response.data.success) {
          setCardItems(response.data.data);
        } else {
          setCardItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/cardItems/${itemId}`);
      setCardItems((prev) => prev.filter((item) => item._id !== itemId));
      toast.success("Item removed from cart successfully");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleQuantityChange = async (itemId, delta) => {
    setCardItems((prev) =>
      prev.map((item) => {
        if (item.itemId === itemId) {
          const newQuantity = Math.max(1, (item.quantity || 1) + delta);
          if (newQuantity !== (item.quantity || 1)) {
            axios
              .patch(`http://localhost:5000/cardItems/${item._id}`, {
                quantity: newQuantity,
              })
              .catch((err) => {
                console.error("Error updating quantity:", err);
              });
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const calculateTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const grandTotal = cardItems
    .reduce((sum, item) => sum + item.itemPrice * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <div className="p-4">
      {/* Banner */}
      <div
        className="w-full h-[40vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/breadcumb.jpg')" }}
      >
        <h1 className="font-bold text-center text-4xl sm:text-5xl md:text-6xl text-white">
          SHOP LIST
        </h1>
      </div>

      <div className="container mx-auto">
        {cardItems.length === 0 ? (
          <p className="text-center mt-10 text-lg sm:text-xl">
            No items in your cart.
          </p>
        ) : (
          <div className="overflow-x-auto mt-10">
            <table className="w-full min-w-[600px] border-collapse border border-gray-300 text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 sm:px-4 py-2">Menu Image</th>
                  <th className="px-2 sm:px-4 py-2">Menu Name</th>
                  <th className="px-2 sm:px-4 py-2">Price</th>
                  <th className="px-2 sm:px-4 py-2">Quantity</th>
                  <th className="px-2 sm:px-4 py-2">Total</th>
                  <th className="px-2 sm:px-4 py-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cardItems.map((item) => (
                  <tr key={item.itemId} className="text-center">
                    <td className="px-2 sm:px-4 py-2">
                      <img
                        src={item.itemImg}
                        alt={item.itemName}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover mx-auto rounded-full"
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-2">{item.itemName}</td>
                    <td className="px-2 sm:px-4 py-2">${item.itemPrice}</td>
                    <td className="px-2 sm:px-4 py-2 flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.itemId, -1)}
                        className="px-2 py-1 border rounded"
                      >
                        −
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(item.itemId, 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      ${calculateTotal(item.itemPrice, item.quantity || 1)}
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 font-bold text-base sm:text-lg"
                  >
                    Total Amount: ${grandTotal}
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <button
                      onClick={() => navigate("/menu")}
                      className="px-3 sm:px-4 py-2 border rounded mr-2 hover:bg-gray-200 text-sm sm:text-base"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => navigate("/shippingAddr")}
                      className="px-3 sm:px-4 py-2 border rounded bg-green-500 text-white hover:bg-green-600 text-sm sm:text-base"
                    >
                      Proceed to Checkout
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
