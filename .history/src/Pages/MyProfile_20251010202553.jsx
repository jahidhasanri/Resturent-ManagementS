import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios"; // Database update এর জন্য

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");

  const handleUpdate = async () => {
    try {
      // Example: Update API call
      const response = await axios.put(`/api/users/${user?.email}`, {
        name,
        image,
      });
      console.log(response.data);
      alert("Profile updated successfully!");
      setShowEdit(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow mt-28">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user?.image}
          alt={user?.name}
          className="w-20 h-20 rounded-full object-cover"
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

      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-3">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
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
