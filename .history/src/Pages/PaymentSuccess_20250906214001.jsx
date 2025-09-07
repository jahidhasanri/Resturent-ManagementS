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
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/order/${tranId}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    if (tranId) fetchData();
  }, [tranId]);

  const subTotal = items?.reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0
  );

  const handleDownload = () => {
    const element = invoiceRef.current;

    // Force fixed width for PDF
    const originalWidth = element.style.width;
    const originalMaxWidth = element.style.maxWidth;

    element.style.width = "800px"; // fixed A4 width
    element.style.maxWidth = "800px";

    html2pdf()
      .set({
        margin: 0.5,
        filename: `invoice_${tranId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save()
      .then(() => {
        // Reset to original after save
        element.style.width = originalWidth;
        element.style.maxWidth = originalMaxWidth;
      });
  };

  if (!data) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="mt-20 mb-10 px-4">
      <h1 className="text-2xl sm:text-3xl text-center font-bold text-green-600">
        Payment Successful ✅
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
        Invoice
      </h2>

      <div
        ref={invoiceRef}
        className="invoice-container w-full sm:w-11/12 md:w-6/12 lg:w-[800px]  h-full mx-auto rounded-2xl overflow-hidden shadow-xl relative bg-white"
        style={{
          backgroundImage: `url('/images/freepik_assistant_1757150547738.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Invoice Box */}
        <div className="mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 my-6 sm:my-10 border-[5px] sm:border-[7px] border-[#925a13] relative z-10">
          {/* Header */}
          <div
            className="relative flex flex-col items-center justify-center p-4 sm:p-6"
            style={{
              backgroundImage: `url('/images/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>

            <div className="relative w-full z-10 flex flex-col items-center justify-center">
              <img
                src="/public/images/ChatGPT_Image_Aug_28__2025__12_17_00_PM-removebg-preview.png"
                alt="Logo"
                className="h-12 sm:h-14"
              />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white mt-2">
                CALL US - +01731847198
              </h2>

              <div className="flex flex-col md:flex-row w-full items-start md:items-end justify-between mt-4 px-4 sm:px-6 md:px-8 gap-4 md:gap-[100px] lg:gap-[150px] xl:gap-[200px]">
                <div className="text-white text-start flex-1">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    Customer Details
                  </h3>
                  <h5 className="text-sm sm:text-base font-semibold mb-1">
                    <span className="font-bold">Name: </span> {shipping?.fullName}
                  </h5>
                  <h5 className="text-sm sm:text-base font-semibold mb-1">
                    <span className="font-bold">Area: </span> {shipping?.area}
                  </h5>
                  <h5 className="text-sm sm:text-base font-semibold">
                    <span className="font-bold">Building: </span>{" "}
                    {shipping?.building}
                  </h5>
                </div>
                <div className="text-white flex-1 text-start">
                  <h5 className="text-sm sm:text-base font-semibold mb-1">
                    <span className="font-bold">Phone:</span>{" "}
                    {shipping?.phoneNumber}
                  </h5>
                  <h5 className="text-sm sm:text-base font-semibold mb-1">
                    <span className="font-bold">Address:</span>{" "}
                    {shipping?.address}
                  </h5>
                  <h5 className="text-sm sm:text-base font-semibold mb-1">
                    <span className="font-bold">City:</span> {shipping?.city}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="p-3 sm:p-4 md:p-6 bg-black bg-opacity-80 text-white text-sm sm:text-base overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#f7931e] text-black">
                  <th className="px-2 sm:px-4 py-2 text-left">Item Description</th>
                  <th className="px-2 sm:px-4 py-2 text-left">Item Image</th>
                  <th className="px-2 sm:px-4 py-2 text-center">Price</th>
                  <th className="px-2 sm:px-4 py-2 text-center">Qty</th>
                  <th className="px-2 sm:px-4 py-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="px-2 sm:px-4 py-2">{item?.itemName}</td>
                    <td className="px-2 sm:px-4 py-2">
                      <img
                        className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-cover"
                        src={item?.itemImg}
                        alt=""
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center">
                      {item.itemPrice} ৳
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center">
                      {item?.quantity}
                    </td>
                    <td className="px-2 sm:px-4 py-2 text-center">
                      {item.itemPrice * item?.quantity} ৳
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Payment status */}
            <div className="flex flex-col sm:flex-row gap-2 mt-5 items-start sm:items-center">
              <h3 className="text-lg sm:text-xl font-bold">Payment Status:</h3>
              <span className="text-green-500 text-lg sm:text-xl font-semibold">
                {data?.paidstatus}
              </span>
            </div>

            {/* Totals */}
            <div className="w-full flex justify-end mt-4">
              <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
                <div className="flex justify-between border-b border-gray-700 py-1">
                  <span>Sub Total</span>
                  <span>{subTotal} ৳</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 py-1">
                  <span>Delivery Charge: </span>
                  <span>70 ৳</span>
                </div>
                <div className="flex justify-between font-bold text-white py-2">
                  <span>Total Price</span>
                  <span>{data?.total} ৳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        <button
          onClick={() => navigate("/")}
          className="px-5 py-3 rounded bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
        >
          Back To Home
        </button>
        <button
          onClick={handleDownload}
          className="px-5 py-3 rounded bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto"
        >
          Download the Invoice
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;






// import React, { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

// const PaymentSuccess = () => {
//   const { tranId } = useParams();
//   const [data, setData] = useState(null);
//   const order = data?.orders?.[0];
//   const shipping = order?.shipping;
//   const items = order?.items;
//   const navigate = useNavigate();
//   const invoiceRef = useRef(null);

//   useEffect(() => {
//     if (!tranId) return;
//     axios
//       .get(`http://localhost:5000/order/${tranId}`)
//       .then((res) => setData(res.data))
//       .catch((err) => console.error(err));
//   }, [tranId]);

//   const subTotal = items?.reduce(
//     (acc, item) => acc + item.itemPrice * item.quantity,
//     0
//   );

//   const handleDownloadPDF = () => {
//   const doc = new jsPDF();

//   // Invoice title
//   doc.setFontSize(18);
//   doc.text("Invoice", 14, 20);

//   // Date
//   doc.setFontSize(12);
//   doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

//   // Customer info
//   doc.text(`Name: ${shipping?.fullName || "N/A"}`, 14, 40);
//   doc.text(`Phone: ${shipping?.phoneNumber || "N/A"}`, 14, 50);

//   // Table data
//   const tableColumn = ["Item Name", "Price", "Qty", "Total"];
//   const tableRows = items?.map(item => [
//     item.itemName,
//     item.itemPrice + " ৳",
//     item.quantity,
//     item.itemPrice * item.quantity + " ৳"
//   ]) || [];

//   // Use imported autoTable function
//   autoTable(doc, {
//     head: [tableColumn],
//     body: tableRows,
//     startY: 60,
//     theme: "grid",
//   });

//   // Total
//   const subTotal = items?.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0) || 0;
//   doc.text(`Total: ${subTotal + 70} ৳`, 14, doc.lastAutoTable.finalY + 10);

//   doc.save(`Invoice_${tranId}.pdf`);
// };


//   if (!data) return <p className="text-center mt-20">Loading...</p>;

//   return (
//     <div className="mt-20 mb-10">
//       <h1 className="text-2xl text-center font-bold text-green-600">
//         Payment Successful ✅
//       </h1>
//       <h2 className="text-[24px] font-bold text-center mb-6">Invoice</h2>

//       <div
//         ref={invoiceRef}
//         className="w-6/12 h-full mx-auto rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-300 relative"
//       >
//         <div className="mx-[50px] my-[30px]">
//           {/* Customer Details */}
//           <div className="flex justify-between mb-6">
//             <div>
//               <h3 className="text-lg font-bold">Customer Details</h3>
//               <p>Name: {shipping?.fullName}</p>
//               <p>Phone: {shipping?.phoneNumber}</p>
//               <p>Address: {shipping?.address}</p>
//             </div>
//             <div>
//               <h3 className="text-lg font-bold">Shipping Info</h3>
//               <p>Area: {shipping?.area}</p>
//               <p>Building: {shipping?.building}</p>
//               <p>City: {shipping?.city}</p>
//             </div>
//           </div>

//           {/* Items Table */}
//           <table className="w-full border-collapse border border-gray-300 text-left">
//             <thead>
//               <tr className="bg-orange-400 text-black">
//                 <th className="px-2 py-1 border">Item</th>
//                 <th className="px-2 py-1 border">Price</th>
//                 <th className="px-2 py-1 border">Qty</th>
//                 <th className="px-2 py-1 border">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items?.map((item, idx) => (
//                 <tr key={idx} className="border-b border-gray-300">
//                   <td className="px-2 py-1">{item.itemName}</td>
//                   <td className="px-2 py-1">{item.itemPrice} ৳</td>
//                   <td className="px-2 py-1">{item.quantity}</td>
//                   <td className="px-2 py-1">{item.itemPrice * item.quantity} ৳</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Totals */}
//           <div className="flex justify-end mt-4">
//             <div className="w-1/3 text-right">
//               <p>SubTotal: {subTotal} ৳</p>
//               <p>Delivery: 70 ৳</p>
//               <p className="font-bold">Total: {data?.total} ৳</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="mt-8 flex justify-center gap-6">
//         <button
//           onClick={() => navigate("/")}
//           className="px-6 py-3 rounded bg-blue-500 text-white hover:bg-blue-600"
//         >
//           Back To Home
//         </button>
//         <button
//           onClick={handleDownloadPDF}
//           className="px-6 py-3 rounded bg-green-500 text-white hover:bg-green-600"
//         >
//           Download the Invoice
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;
