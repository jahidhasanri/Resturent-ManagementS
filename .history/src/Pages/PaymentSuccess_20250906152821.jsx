import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  const [data, setData] = useState(null);   // fixed useState
  console.log(data);
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
      <h2>Invoice</h2>
      <div
  className="w-6/12 h-[800px] mx-auto"
  style={{ backgroundImage: `url('/public/images/freepik_assistant_1757150547738.png')` }}
>
         <div className="  flex items-center justify-center h-full py-6 ml-[150px]">
          <img
            src="https://i.ibb.co/BVdGNHP4/logo.png"
            alt="Logo"
            className="h-14"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
