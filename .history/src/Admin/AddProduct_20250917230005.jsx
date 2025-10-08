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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

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
        setPreview(URL.createObjectURL(file));
        setFormData({ ...formData, image: file });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewValue = parseFloat(formData.review);
    const quantityValue = parseFloat(formData.quantity);
    const priceValue = parseFloat(formData.price);

    if (reviewValue < 1 || reviewValue > 5) {
      toast.error("Review stars must be between 1 and 5 ⭐");
      return;
    }
    if (quantityValue < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }
    if (priceValue < 1) {
      toast.error("Price must be at least 1");
      return;
    }

    try {
      const imgData = new FormData();
      imgData.append("image", formData.image);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=8be0cdd4b85b2bb02d8b738407647b48`,
        imgData
      );

      const imageUrl = imgRes.data.data.url;

      await axios.post("http://localhost:5000/alldishes", {
        ...formData,
        image: imageUrl,
        customerReview: [],
      });

      setTimeout(() => {
        toast.success("Dish added successfully!");
      }, 1000);

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

      // navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Dish registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-400 min-h-screen flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl font-bold mb-8 text-center">Add New Dish</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Dish Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-slate-100"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded bg-slate-100"
            required
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mx-auto"
            />
          )}

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

          <textarea
            name="details"
            placeholder="Details"
            value={formData.details}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-slate-100"
          />

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

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isBestSeller"
              checked={formData.isBestSeller}
              onChange={handleChange}
            />
            Is Best Seller?
          </label>

          <button
            type="submit"
            className="w-full sm:w-48 mx-auto block bg-red-600 text-white py-2 rounded hover:bg-red-800 transition"
          >
            Add Dish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
