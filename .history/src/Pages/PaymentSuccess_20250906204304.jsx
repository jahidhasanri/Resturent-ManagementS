// 2️⃣ React component (PaymentSuccess.jsx)
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  const [data, setData] = useState(null);
  const order = data?.orders?.[0];
  const shipping = order?.shipping;
  const items = order?.items;
  const navigate = useNavigate();
  const invoiceRef = useRef(null);

  useEffect(() => {
    if (!tranId) return;
    axios
      .get(`http://localhost:5000/order/${tranId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [tranId]);

  const subTotal = items?.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);

  const handleDownload = () => {
    const element = invoiceRef.current;

    // ✅ Prevent oklch error: inline style override
    element.querySelectorAll("*").forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.color.includes("oklch")) el.style.color = "#000000";
      if (styles.backgroundColor.includes("oklch")) {
        el.style.backgroundColor = "#ffffff";
      }
      if (styles.borderColor.includes("oklch")) el.style.borderColor = "#cccccc";
    });

    html2pdf().set({
      margin: 0.5,
      filename: `invoice_${tranId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    }).from(element).save();
  };

  return (
    <div className="mt-20 mb-10">
      <h1 className="text-2xl text-center font-bold text-green-600">
        Payment Successful ✅
      </h1>

      <div
        ref={invoiceRef}
        className="w-6/12 h-full mx-auto rounded-2xl overflow-hidden shadow-xl relative"
        style={{
          backgroundColor: "#ffffff", // Safe background
        }}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Customer: {shipping?.fullName}</h2>
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-2 py-1">Item</th>
                <th className="border px-2 py-1">Qty</th>
                <th className="border px-2 py-1">Price</th>
                <th className="border px-2 py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{item.itemName}</td>
                  <td className="border px-2 py-1">{item.quantity}</td>
                  <td className="border px-2 py-1">{item.itemPrice} ৳</td>
                  <td className="border px-2 py-1">{item.itemPrice * item.quantity} ৳</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <p>SubTotal: {subTotal} ৳</p>
            <p>Delivery: 70 ৳</p>
            <p>Total: {data?.total} ৳</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-blue-500 text-white rounded">Back Home</button>
        <button onClick={handleDownload} className="px-4 py-2 bg-green-500 text-white rounded">Download PDF</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
