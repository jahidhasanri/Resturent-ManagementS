import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [tranId]);

  const subTotal = items?.reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0
  );

  const handleDownloadPDF = () => {
  const doc = new jsPDF();

  // Invoice title
  doc.setFontSize(18);
  doc.text("Invoice", 14, 20);

  // Date
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

  // Customer info
  doc.text(`Name: ${shipping?.fullName || "N/A"}`, 14, 40);
  doc.text(`Phone: ${shipping?.phoneNumber || "N/A"}`, 14, 50);

  // Table data
  const tableColumn = ["Item Name", "Price", "Qty", "Total"];
  const tableRows = items?.map(item => [
    item.itemName,
    item.itemPrice + " ৳",
    item.quantity,
    item.itemPrice * item.quantity + " ৳"
  ]) || [];

  // Use imported autoTable function
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 60,
    theme: "grid",
  });

  // Total
  const subTotal = items?.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0) || 0;
  doc.text(`Total: ${subTotal + 70} ৳`, 14, doc.lastAutoTable.finalY + 10);

  doc.save(`Invoice_${tranId}.pdf`);
};


  if (!data) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="mt-20 mb-10">
      <h1 className="text-2xl text-center font-bold text-green-600">
        Payment Successful ✅
      </h1>
      <h2 className="text-[24px] font-bold text-center mb-6">Invoice</h2>

      <div
        ref={invoiceRef}
        className="w-6/12 h-full mx-auto rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-300 relative"
      >
        <div className="mx-[50px] my-[30px]">
          {/* Customer Details */}
          <div className="flex justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold">Customer Details</h3>
              <p>Name: {shipping?.fullName}</p>
              <p>Phone: {shipping?.phoneNumber}</p>
              <p>Address: {shipping?.address}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Shipping Info</h3>
              <p>Area: {shipping?.area}</p>
              <p>Building: {shipping?.building}</p>
              <p>City: {shipping?.city}</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-orange-400 text-black">
                <th className="px-2 py-1 border">Item</th>
                <th className="px-2 py-1 border">Price</th>
                <th className="px-2 py-1 border">Qty</th>
                <th className="px-2 py-1 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-300">
                  <td className="px-2 py-1">{item.itemName}</td>
                  <td className="px-2 py-1">{item.itemPrice} ৳</td>
                  <td className="px-2 py-1">{item.quantity}</td>
                  <td className="px-2 py-1">{item.itemPrice * item.quantity} ৳</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mt-4">
            <div className="w-1/3 text-right">
              <p>SubTotal: {subTotal} ৳</p>
              <p>Delivery: 70 ৳</p>
              <p className="font-bold">Total: {data?.total} ৳</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-center gap-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Back To Home
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-3 rounded bg-green-500 text-white hover:bg-green-600"
        >
          Download the Invoice
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;