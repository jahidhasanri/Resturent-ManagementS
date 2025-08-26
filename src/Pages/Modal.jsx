import React, { useState } from "react";
import axios from "axios";

const Modal = ({ dish, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: dish.name,
    price: dish.price,
    quantity: dish.quantity,
    image: dish.image,
  });

  const [preview, setPreview] = useState(dish.image); // default old image
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        setFormData({ ...formData, image: file }); // file object রাখলাম
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = formData.image;

    try {
      // যদি নতুন file upload করা হয়
      if (formData.image instanceof File) {
        const imgData = new FormData();
        imgData.append("image", formData.image);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=8be0cdd4b85b2bb02d8b738407647b48`,
          imgData
        );

        imageUrl = imgRes.data.data.url;
      }

      // Update dish with imgbb link
      onSubmit({
        ...dish,
        ...formData,
        image: imageUrl,
      });

      setLoading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Dish</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-200"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-200"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-200"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="border p-2 w-full rounded text-gray-200"
            />
          </div>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded mx-auto text-gray-200"
            />
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
