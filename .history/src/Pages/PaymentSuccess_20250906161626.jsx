import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  const [data, setData] = useState(null);
  const shipping = data?.orders[0]?.shipping;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/order/${tranId}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    if (tranId) {
      fetchData();
    }
  }, [tranId]);

  return (
    <div
      className="w-8/12 mx-auto mt-10 border-[7px] border-gray-300 rounded-xl shadow-lg bg-cover bg-center"
      style={{
        backgroundImage: "url('/path-to-your-bg-image.jpg')",
      }}
    >
      {/* Header */}
      <div className="bg-black bg-opacity-50 text-white py-4 text-center rounded-t-lg">
        <h2 className="text-2xl font-bold">Invoice</h2>
      </div>

      {/* Customer Details */}
      <div className="flex flex-col md:flex-row w-full items-start justify-between gap-8 p-8 bg-black bg-opacity-60">
        {/* Left Side */}
        <div className="text-white text-start flex-1">
          <h3 className="text-[20px] font-bold mb-2">Customer Details</h3>
          <h5 className="text-[16px] font-semibold">{shipping?.fullName}</h5>
          <h5 className="text-[16px] font-semibold">{shipping?.area}</h5>
          <h5 className="text-[16px] font-semibold">{shipping?.building}</h5>
        </div>

        {/* Right Side */}
        <div className="text-white flex-1 text-start">
          <h5 className="text-[16px] font-semibold mb-2">
            <span className="font-bold">Phone:</span> {shipping?.phoneNumber}
          </h5>
          <h5 className="text-[16px] font-semibold mb-2">
            <span className="font-bold">Address:</span> {shipping?.address}
          </h5>
          <h5 className="text-[16px] font-semibold mb-2">
            <span className="font-bold">City:</span> {shipping?.city}
          </h5>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black bg-opacity-50 text-white text-center py-4 rounded-b-lg">
        <p className="text-sm">Thank you for your purchase!</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
