import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [imageFile, setImageFile] = useState(null);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (imageFile) formData.append("image", imageFile);

      const response = await axios.put(
        `https://resturent-management-server-three.vercel.app/users/${user?._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success("✅ Profile updated successfully!");
        setShowEdit(false);
      } else {
        toast.error("❌ Failed to update profile!");
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Something went wrong!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow mt-28">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={
            user?.image?.startsWith("http")
              ? user.image
              : `http://localhost:5000${user?.image}`
          }
          alt={user?.name}
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowEdit(true)}
      >
        Edit Profile
      </button>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            {/* Name Field */}
            <div className="mb-3">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Image Upload Field */}
            <div className="mb-3">
              <label className="block mb-1 font-medium">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {/* Preview */}
            {imageFile && (
              <div className="mb-3">
                <p className="text-sm mb-1 font-medium">Preview:</p>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
