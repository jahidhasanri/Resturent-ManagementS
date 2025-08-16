import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    review: "",
    details: "",
    quantity: "",
    price: "",
    isBestSeller: false,
  });

  const [preview, setPreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Block negative input for review, quantity, price
    if (["review", "quantity", "price"].includes(name)) {
      if (value === "" || parseFloat(value) >= 1) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
      return;
    }

    if (type === "file") {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData({ ...formData, image: imageUrl });
        setPreview(imageUrl);
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewValue = parseFloat(formData.review);
    const quantityValue = parseFloat(formData.quantity);
    const priceValue = parseFloat(formData.price);

    // Validation
    if (reviewValue < 1 || reviewValue > 5) {
      alert("Review stars must be between 1 and 5 ⭐");
      return;
    }
    if (quantityValue < 1) {
      alert("Quantity must be at least 1");
      return;
    }
    if (priceValue < 1) {
      alert("Price must be at least 1");
      return;
    }

    try {
      await axios.post("http://localhost:5000/alldishes", {
        ...formData,
        customerReview: [],
      });

      toast.success("Dish added successfully!");

      // Reset form
      setFormData({
        name: "",
        image: "",
        review: "",
        details: "",
        quantity: "",
        price: "",
        isBestSeller: false,
      });
      setPreview(null);

      // navigate("/"); // Uncomment if you want redirect after add
    } catch (err) {
      console.error(err);
      toast.error("Dish registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-400 min-h-screen">
      <div className="pt-[100px] pb-[100px]">
        <div className="container lg:w-[1000px] pt-[50px] pb-[100px] mx-auto p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-2xl font-bold mb-10 text-center">
            Add New Dish
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Dish Name */}
            <input
              type="text"
              name="name"
              placeholder="Dish Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-slate-100"
              required
            />

            {/* Image */}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border p-2 rounded bg-slate-100"
              required
            />

            {/* Image Preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mx-auto"
              />
            )}

            {/* Review */}
            <input
              type="number"
              name="review"
              placeholder="Review (Stars: 1-5)"
              value={formData.review}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              className="w-full border p-2 rounded bg-slate-100"
              required
            />

            {/* Details */}
            <textarea
              name="details"
              placeholder="Details"
              value={formData.details}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-slate-100"
            />

            {/* Quantity */}
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-slate-100"
              required
            />

            {/* Price */}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-slate-100"
              min="1"
              required
            />

            {/* Best Seller */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isBestSeller"
                checked={formData.isBestSeller}
                onChange={handleChange}
              />
              Is Best Seller?
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[200px] mx-auto block bg-red-600 text-white py-2 rounded hover:bg-red-800"
            >
              Add Dish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
