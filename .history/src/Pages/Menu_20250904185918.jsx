import React from "react";

const Menu = () => {
  return (
    <div className="bg-[#f4f1ea]">
      <div className="container mx-auto">
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
      </div>
    </div>
  );
};

export default Menu;
