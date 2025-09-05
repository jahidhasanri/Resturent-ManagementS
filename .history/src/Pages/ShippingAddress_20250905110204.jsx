import React, { useState } from "react";
import axios from "axios";

const ShippingAddress = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    building: "",
    colony: "",
    region: "",
    city: "",
    area: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // change URL to your backend API endpoint
      const res = await axios.post("http://localhost:5000/shipping-address", formData);
      if (res.data.success) {
        alert("Address saved successfully!");
        setFormData({
          fullName: "",
          phoneNumber: "",
          building: "",
          colony: "",
          region: "",
          city: "",
          area: "",
          address: ""
        });
      } else {
        alert("Failed to save address");
      }
    } catch (err) {
      console.error("Error saving address:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 shadow-lg border rounded-lg p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Add New Shipping Address</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your first and last name"
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded w-full p-2 bg-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Region</label>
          <input
            type="text"
            name="region"
            placeholder="Enter your region"
            value={formData.region}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Please enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">City</label>
          <input
            type="text"
            name="city"
            placeholder="Please enter your city"
            value={formData.city}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Building / House / Floor / Street</label>
          <input
            type="text"
            name="building"
            placeholder="Please enter"
            value={formData.building}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Area</label>
          <input
            type="text"
            name="area"
            placeholder="Please enter your area"
            value={formData.area}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Colony / Suburb / Locality / Landmark</label>
          <input
            type="text"
            name="colony"
            placeholder="Please enter"
            value={formData.colony}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Address</label>
          <input
            type="text"
            name="address"
            placeholder="For Example: House# 123, Street# 123, ABC Road"
            value={formData.address}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={() =>
              setFormData({
                fullName: "",
                phoneNumber: "",
                building: "",
                colony: "",
                region: "",
                city: "",
                area: "",
                address: ""
              })
            }
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingAddress;
