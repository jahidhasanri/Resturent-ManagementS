import React from "react";

const Menu = () => {
  return (
    <div className="bg-[#f4f1ea]">
        <div
          style={{
            backgroundImage: "url('/public/images/breadcumb.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "50vh",
            width: "100%",
          }}
        >
          <h1 className="font-bold text-center pt-[150px] text-[60px] text-white">
            Shop
          </h1>
        </div>
      <div className="container mx-auto grid grid-cols-12 gap-4">
        <div className="col-span-3 bg-gray-200">
          {/* Sidebar / 3 columns */}
          Sidebar Content
        </div>
        <div className="col-span-9 bg-gray-100">
          {/* Main Content / 9 columns */}
          Main Content
        </div>
      </div>
    </div>
  );
};

export default Menu;
