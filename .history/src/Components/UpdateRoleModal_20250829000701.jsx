import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateRoleModal = ({ user, onClose, onRoleUpdate }) => {
  const [role, setRole] = useState(user.role);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${user._id}/role`, { role });
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `${user.email} role updated to ${role}`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      onRoleUpdate({ ...user, role });
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Update failed. Try again.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Role for {user.email}</h2>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
          <option value="user">User</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoleModal;
