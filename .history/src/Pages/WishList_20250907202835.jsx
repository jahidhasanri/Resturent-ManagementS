import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const WishList = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [wishlistDishes, setWishlistDishes] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchData = async () => {
      try {
        // Step 1: user এর wishlist
        const wishRes = await axios.get(
          `http://localhost:5000/wishes?userId=${user._id}`
        );
        setWishlist(wishRes.data);

        // Step 2: সব dishes
        const dishRes = await axios.get(`http://localhost:5000/allsdishes`);
        setAllDishes(dishRes.data);

        // Step 3: match করে filter
        const matchedDishes = dishRes.data
          .map((dish) => {
            const wishItem = wishRes.data.find((wish) => wish.itemId === dish._id);
            if (wishItem) return { ...dish, wishId: wishItem._id }; // wishlist _id attach
            return null;
          })
          .filter(Boolean);

        setWishlistDishes(matchedDishes);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [user?._id]);

  const handleDelete = async (wishId) => {
    // Swal confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item from wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/wishes/${wishId}`);
        const newWishlist = wishlist.filter((item) => item._id !== wishId);
        setWishlist(newWishlist);

        const newWishlistDishes = wishlistDishes.filter((item) => item.wishId !== wishId);
        setWishlistDishes(newWishlistDishes);

        Swal.fire("Deleted!", "The item has been removed.", "success");
      } catch (err) {
        console.error("Error deleting wishlist item:", err);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Image</th>
              <th className="p-3">Product Name</th>
              <th className="p-3">Unit Price</th>
              <th className="p-3">Stock Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistDishes.map((dish, index) => (
              <tr key={dish._id} className="text-center border-b border-gray-200">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-16 h-16 rounded-full mx-auto"
                  />
                </td>
                <td className="p-3 font-semibold">{dish.name}</td>
                <td className="p-3 text-orange-500 font-bold">${dish.price}</td>
                <td className="p-3">
                  {dish.inStock ? (
                    <span className="text-green-500">✓ In stock</span>
                  ) : (
                    <span className="text-red-500">✗ Out of Stock</span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(dish.wishId)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                  >
                    Add to Cart
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(dish.wishId)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;
 