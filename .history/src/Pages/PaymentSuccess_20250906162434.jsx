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
            className="relative h-1/3 flex items-center justify-center"
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



              <div className="flex w-[100%] items-center gap-[170px] justify-between mt-4 px-8">
                <div className="text-white text-start flex-1">
                  <h3 className="text-[20px] font-bold mb-2">
                    Customer Details
                  </h3>
                  <h5 className="text-[16px] font-semibold">
                    {shipping?.fullName}
                  </h5>
                  <h5 className="text-[16px] font-semibold">
                    {shipping?.area}
                  </h5>
                  <h5 className="text-[16px] font-semibold">
                    {shipping?.building}
                  </h5>
                </div>
                <div className="text-white flex-1 text-start">
                  <h5 className="text-[16px] font-semibold">
                    <span className="text-[16px] font-bold">Phone:</span>{" "}
                    {shipping?.phoneNumber}
                  </h5>
                  <h5 className="text-[16px] font-semibold">
                    <span className="text-[16px] font-bold">Address:</span>{" "}
                    {shipping?.address}
                  </h5>
                  <h5 className="text-[16px] font-semibold">
                    <span className="text-[16px] font-bold">City:</span>{" "}
                    {shipping?.city}
                  </h5>
                </div>
              </div>



            </div>
          </div>
        </div>
        {/* Child div with overlay */}
      </div>
    </div>
  );
};

export default PaymentSuccess;
