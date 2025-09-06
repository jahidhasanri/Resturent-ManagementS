import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  const [data, setData] = useState(null);   // fixed useState

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
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful ✅
      </h1>
      <p>Your Transaction ID: {tranId}</p>
      {data && (
        <div className="mt-4">
          <p><strong>Order ID:</strong> {data._id}</p>
          <p><strong>Amount:</strong> {data.amount}</p>
          <p><strong>Status:</strong> {data.status}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
