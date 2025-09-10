import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UpdateRoleModal from "../Components/UpdateRoleModal";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/allusers");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${user.email}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/users/${user._id}`);
        setUsers(users.filter((u) => u._id !== user._id));
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `"${user.email}" has been deleted.`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (err) {
        Swal.fire("Error!", "Delete failed. Try again.", "error");
      }
    }
  };

  // Open modal for updating role
  const handleUpdateRole = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  // Update user role in state after modal submit
  const handleRoleUpdate = (updatedUser) => {
    setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={user?.image}
                    alt={user.email}
                    className="w-12 h-12 object-cover mx-auto rounded-full"
                  />
                </td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border flex justify-center gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleUpdateRole(user)}
                  >
                    Update Role
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <UpdateRoleModal
          user={selectedUser}
          onClose={closeModal}
          onRoleUpdate={handleRoleUpdate}
        />
      )}
    </div>
  );
};

export default ManageUsers;
