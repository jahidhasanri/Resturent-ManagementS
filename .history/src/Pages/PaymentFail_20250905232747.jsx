import React from "react";
import { useParams } from "react-router-dom";

const PaymentFail = () => {
  const { tranId } = useParams();
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-red-600">
        Payment Failed ❌
      </h1>
      <p>Transaction ID: {tranId}</p>
    </div>
  );
};

export default PaymentFail;
