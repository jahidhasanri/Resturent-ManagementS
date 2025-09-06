import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { tranId } = useParams();
  const [data, setData] = useState(null);
  const order = data?.orders?.[0];
  const shipping = order?.shipping;
  const items = order?.items;


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
    <div className=" mt-20">
      <h1 className="text-2xl text-center font-bold text-green-600">
        Payment Successful ✅
      </h1>
      <h2 className="text-[24px] font-bold text-center mb-6">Invoice</h2>

      <div
        className="w-6/12 h-[800px] mx-auto  rounded-2xl overflow-hidden shadow-xl relative"
        style={{
          backgroundImage: `url('/images/freepik_assistant_1757150547738.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="m-[100px]  border-[7px] border-[#925a13]">
          <div
            className="relative h-1/3 flex items-center justify-center p-4"
            style={{
              backgroundImage: `url('/images/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>

            {/* Logo */}
            <div className="relative w-[100%] z-10 flex flex-col items-center justify-center">
              <img
                src="/public/images/ChatGPT_Image_Aug_28__2025__12_17_00_PM-removebg-preview.png"
                alt="Logo"
                className="h-14"
              />
              <h2 className="text-[24px] font-bold text-center text-white mt-2">
                CALLL US - +01731847198
              </h2>



              <div className="flex w-[100%] items-end gap-[200px] justify-between mt-4 px-8">
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
        </div>
{/* table */}
       <div className="p-6">
            <h3 className="text-xl font-bold mb-4">Ordered Items</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Item Name</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Quantity</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>



    </div>
  );
};

export default PaymentSuccess;
