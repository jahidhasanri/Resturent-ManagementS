import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Card = () => {
const [cardItems, setCardItems] = useState([]);
  const { user } = useContext(AuthContext);

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
      toast.success('item deleted to card successfully');
       window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      toast.error("Failed to remove item:", error);
    }
  };

  const handleQuantityChange = (itemId, delta) => {
    setCardItems((prev) =>
      prev.map((item) =>
        item.itemId === itemId
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    );
  };

  const calculateTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  return (
    <div className=" p-4">
      <div
        style={{
          backgroundImage: "url('/images/breadcumb.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          width: "100%",
        }}
      >
        <h1 className="font-bold text-center pt-[150px] text-[60px] text-white">
          SHOP LIST
        </h1>
      </div>
      <div className="container mx-auto">
        {cardItems.length === 0 ? (
          <p className="text-center mt-10">No items in your cart.</p>
        ) : (
          <table className="w-full mt-10 border-collapse  border border-gray-300">
            <thead className="bg-gray-100 pt-5 pb-5">
              <tr className="pt-2 pb-2">
                <th className=" px-4 py-2">Menu Image</th>
                <th className="px-4 py-2">Menu Name</th>
                <th className=" px-4 py-2">Price</th>
                <th className=" px-4 py-2">Quantity</th>
                <th className=" px-4 py-2">Total</th>
                <th className=" px-4 py-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cardItems.map((item) => (
                <tr key={item.itemId} className="text-center mb-6">
                  <td className=" px-4 py-2">
                    <img
                      src={item.itemImg}
                      alt={item.itemName}
                      className="w-16 h-16 object-cover mx-auto rounded-full"
                    />
                  </td>
                  <td className=" px-4 py-2">{item.itemName}</td>
                  <td className=" px-4 py-2">${item.itemPrice}</td>
                  <td className=" px-4 py-2 flex items-center justify-center gap-2">
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
                  <td className=" px-4 py-2">
                    ${calculateTotal(item.itemPrice, item.quantity || 1)}
                  </td>
                  <td className=" px-4 py-2">
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
          </table>
        )}
      </div>
    </div>
  );
};

export default Card;
