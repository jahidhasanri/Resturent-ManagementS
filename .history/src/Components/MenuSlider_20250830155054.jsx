import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const menuItems = ["FRIED CHICKEN", "BURGER", "CHICKEN PIZZA", "PASTA", "FRENCH FRIES"];

const MenuSlider = () => {
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
  };

  return (
    <div className="bg-[#181818] py-6">
      <Slider {...settings} className="overflow-hidden">
        {menuItems.map((item, idx) => (
          <div key={idx} className="text-center">
            <p
              className="
                text-4xl font-extrabold uppercase text-gray-700
                hover:text-red-600 hover:border-b-2 hover:border-red-600
                inline-block cursor-pointer transition duration-300
              "
            >
              {item}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MenuSlider;
