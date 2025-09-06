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
    if (tranId) {
      fetchData();
    }
  }, [tranId]);

  const subTotal = items?.reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0
  );

  // More robust function to patch oklch colors
  const patchOklchColors = (element) => {
    // Create a clone of the element to avoid modifying the original DOM
    const clone = element.cloneNode(true);
    
    // Function to replace oklch colors with fallbacks
    const replaceOklch = (styleProperty, fallback) => {
      if (styleProperty.includes('oklch')) {
        return fallback;
      }
      return styleProperty;
    };

    // Process all elements in the clone
    clone.querySelectorAll('*').forEach(el => {
      const styles = window.getComputedStyle(el);
      
      // Replace color
      if (styles.color.includes('oklch')) {
        el.style.color = replaceOklch(styles.color, '#000000');
      }
      
      // Replace background color
      if (styles.backgroundColor.includes('oklch')) {
        el.style.backgroundColor = replaceOklch(styles.backgroundColor, '#ffffff');
      }
      
      // Replace border colors
      if (styles.borderColor.includes('oklch')) {
        el.style.borderColor = replaceOklch(styles.borderColor, '#cccccc');
      }
    });
    
    return clone;
  };

const handleDownload = () => {
  const element = invoiceRef.current;
  
  // Create a clone to avoid modifying the original DOM
  const clonedElement = element.cloneNode(true);
  
  // Apply color fixes to the clone
  clonedElement.querySelectorAll('*').forEach(el => {
    const styles = window.getComputedStyle(el);
    
    // Replace oklch colors with hex equivalents
    if (styles.color.includes('oklch')) {
      el.style.color = '#000000';
    }
    
    if (styles.backgroundColor.includes('oklch')) {
      // Preserve transparency for bg-opacity classes
      if (el.classList.contains('bg-opacity-80')) {
        el.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      } else if (el.classList.contains('bg-opacity-40')) {
        el.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
      } else {
        el.style.backgroundColor = '#ffffff';
      }
    }
    
    if (styles.borderColor.includes('oklch')) {
      el.style.borderColor = '#cccccc';
    }
  });
  
  const opt = {
    margin: 0.5,
    filename: `invoice_${tranId}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true, // Allow cross-origin images
      backgroundColor: '#ffffff' // Set white background
    },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };
  
  // Generate PDF from the modified clone
  html2pdf().set(opt).from(clonedElement).save();
};

  return (
    <div className="mt-20 mb-10">
      <h1 className="text-2xl text-center font-bold text-green-600">
        Payment Successful ✅
      </h1>
      <h2 className="text-[24px] font-bold text-center mb-6">Invoice</h2>

      <div
        ref={invoiceRef}
        className="w-6/12 h-full mx-auto rounded-2xl overflow-hidden shadow-xl relative"
        style={{
          backgroundImage: `url('/images/freepik_assistant_1757150547738.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="mx-[100px] my-[50px] border-[7px] border-[#925a13] relative z-10">
          <div
            className="relative h-1/3 flex items-center justify-center p-4"
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
                className="h-14"
              />
              <h2 className="text-[24px] font-bold text-center text-white mt-2">
                CALL US - +01731847198
              </h2>

              <div className="flex w-full items-end gap-[200px] justify-between mt-4 px-8">
                <div className="text-[#ffffffdc] text-start flex-1">
                  <h3 className="text-[20px] font-bold mb-2 text-white">
                    Customer Details
                  </h3>
                  <h5 className="text-[15px] font-semibold mb-1">
                    <span className="text-[16px] font-bold">Name: </span>
                    {shipping?.fullName}
                  </h5>
                  <h5 className="text-[15px] font-semibold mb-1">
                    <span className="text-[16px] font-bold">Area: </span>
                    {shipping?.area}
                  </h5>
                  <h5 className="text-[15px] font-semibold">
                    <span className="text-[16px] font-bold">Building: </span>
                    {shipping?.building}
                  </h5>
                </div>
                <div className="text-[#ffffffdc] flex-1 text-start">
                  <h5 className="text-[15px] font-semibold mb-1">
                    <span className="text-[16px] font-bold">Phone:</span>{" "}
                    {shipping?.phoneNumber}
                  </h5>
                  <h5 className="text-[15px] font-semibold mb-1">
                    <span className="text-[16px] font-bold">Address:</span>{" "}
                    {shipping?.address}
                  </h5>
                  <h5 className="text-[15px] font-semibold mb-1">
                    <span className="text-[16px] font-bold">City:</span>{" "}
                    {shipping?.city}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {/* table */}
          <div className="p-6 bg-black bg-opacity-80 text-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f7931e] text-black">
                  <th className="px-4 py-2 text-left">Item Description</th>
                  <th className="px-4 py-2 text-left">Item Image</th>
                  <th className="px-4 py-2 text-center">Price</th>
                  <th className="px-4 py-2 text-center">Qty</th>
                  <th className="px-4 py-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="px-4 py-2">{item?.itemName}</td>
                    <td className="px-4 py-2">
                      <img
                        className="w-[80px] h-[80px]"
                        src={item?.itemImg}
                        alt=""
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      {item.itemPrice} ৳
                    </td>
                    <td className="px-4 py-2 text-center">{item?.quantity}</td>
                    <td className="px-4 py-2 text-center">
                      {item.itemPrice * item?.quantity} ৳
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* totals */}
            <div className="flex gap-2 mt-5 items-center">
              <h3 className="text-[20px] font-bold">Payment Status:</h3>
              <span className="text-green-700 text-[20px] font-semibold">
                {data?.paidstatus}
              </span>
            </div>

            <div className="w-full flex justify-end mt-4">
              <div className="w-1/3">
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

      <div className="mt-8 flex justify-center gap-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Back To Home
        </button>
        <button
          onClick={handleDownload}
          className="px-6 py-3 rounded bg-green-500 text-white hover:bg-green-600"
        >
          Download the Invoice
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;