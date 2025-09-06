import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/order/${tranId}`);
        setData(res.data); // data is an array
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    if (tranId) fetchData();
  }, [tranId]);

  // First order from the array
  const order = data?.[0];
  const shipping = order?.shipping;
  const items = order?.items;

  // Calculate total amount
  const totalAmount = items?.reduce(
    (sum, item) => sum + Number(item.itemPrice) * item.quantity,
    0
  );

  return (
    <div className="mt-20">
      <h1 className="text-2xl text-center font-bold text-green-600">
        Payment Successful ✅
      </h1>
      <h2 className="text-[24px] font-bold text-center mb-6">Invoice</h2>

      <div
        className="w-6/12 mx-auto rounded-2xl overflow-hidden shadow-xl relative"
        style={{
          backgroundImage: `url('/images/freepik_assistant_1757150547738.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="m-[50px] border-[7px] border-[#925a13] relative z-10 bg-white rounded-xl">
          {/* Header */}
          <div
            className="relative h-48 flex items-center justify-center p-4 rounded-t-xl"
            style={{
              backgroundImage: `url('/images/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-t-xl"></div>
            <div className="relative z-10 flex flex-col items-center justify-center">
              <img
                src="/public/images/ChatGPT_Image_Aug_28__2025__12_17_00_PM-removebg-preview.png"
                alt="Logo"
                className="h-14"
              />
              <h2 className="text-[24px] font-bold text-center text-white mt-2">
                CALL US - +01731847198
              </h2>
            </div>
          </div>

          {/* Customer Details */}
          <div className="flex flex-col md:flex-row justify-between gap-8 p-6 bg-gray-100 rounded-b-xl">
            <div className="flex-1 text-start">
              <h3 className="text-[20px] font-bold mb-2">Customer Details</h3>
              <h5 className="text-[15px] font-semibold mb-1">
                <span className="font-bold">Name: </span>
                {shipping?.fullName}
              </h5>
              <h5 className="text-[15px] font-semibold mb-1">
                <span className="font-bold">Area: </span>
                {shipping?.area}
              </h5>
              <h5 className="text-[15px] font-semibold mb-1">
                <span className="font-bold">Building: </span>
                {shipping?.building}
              </h5>
            </div>
            <div className="flex-1 text-start">
              <h5 className="text-[15px] font-semibold mb-1">
                <span className="font-bold">Phone: </span>
                {shipping?.phoneNumber}
              </h5>
              <h5 className="text-[15px] font-semibold mb-1">
                <span className="font-bold">Address: </span>
                {shipping?.address}
              </h5>
              <h5 className="text-[15px] font-semibold mb-1">
                <span className="font-bold">City: </span>
                {shipping?.city}
              </h5>
            </div>
          </div>

          {/* Table Section */}
          <div className="p-6 text-left">
            <h3 className="text-xl font-bold mb-4">Ordered Items</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Item</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((item, idx) => (
                  <tr key={idx} className="odd:bg-gray-50 even:bg-white">
                    <td className="border px-4 py-2">{item.itemName}</td>
                    <td className="border px-4 py-2">
                      <img
                        src={item.itemImg}
                        alt={item.itemName}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="border px-4 py-2">{item.itemPrice} ৳</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">
                      {item.itemPrice * item.quantity} ৳
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="text-right mt-4 text-lg font-bold">
              Total: {totalAmount} ৳
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
