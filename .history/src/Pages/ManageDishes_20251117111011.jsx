import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import Swal from 'sweetalert2';

const ManageDishes = () => {
  const [allDishes, setAllDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage =10;

  // Fetch dishes
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(
          "https://resturent-management-server-three.vercel.app/allsdishes"
        );
        setAllDishes(response.data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  // Delete dish
  const handleDelete = async (dish) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete "${dish.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://resturent-management-server-three.vercel.app/allsdishes/${dish._id}`
        );

        setAllDishes(allDishes.filter(d => d._id !== dish._id));

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: `"${dish.name}" has been deleted.`,
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Delete failed. Try again.',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  // Update modal open
  const handleUpdate = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDish(null);
    setIsModalOpen(false);
  };

  // Submit update
  const handleUpdateSubmit = async (updatedDish) => {
    try {
      await axios.put(
        `https://resturent-management-server-three.vercel.app/dishes/${updatedDish._id}`,
        updatedDish
      );

      setAllDishes(
        allDishes.map((d) => (d._id === updatedDish._id ? updatedDish : d))
      );

      closeModal();
      Swal.fire('Updated!', `${updatedDish.name} has been updated.`, 'success');
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire('Error!', 'Update failed. Try again.', 'error');
    }
  };

  // ⬇ Pagination Logic
  const totalPages = Math.ceil(allDishes.length / itemsPerPage);
  const indexOfLastDish = currentPage * itemsPerPage;
  const indexOfFirstDish = indexOfLastDish - itemsPerPage;
  const currentDishes = allDishes.slice(indexOfFirstDish, indexOfLastDish);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4">Manage Dishes</h1>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDishes.map((dish) => (
              <tr key={dish._id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-2 border">{dish.name}</td>
                <td className="p-2 border">${dish.price}</td>
                <td className="p-2 border">{dish.quantity}</td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 md:mr-4 rounded hover:bg-blue-600"
                    onClick={() => handleUpdate(dish)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(dish)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 space-x-2">

        {/* Prev Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

      {isModalOpen && selectedDish && (
        <Modal dish={selectedDish} onClose={closeModal} onSubmit={handleUpdateSubmit} />
      )}
    </div>
  );
};

export default ManageDishes;
