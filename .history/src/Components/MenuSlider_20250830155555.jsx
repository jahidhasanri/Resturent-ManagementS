import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const menuItems = [
  "FRIED CHICKEN",
  "BURGER",
  "CHICKEN PIZZA",
  "PASTA",
  "FRENCH FRIES",
  "BEEF STEAK",
  "SANDWICH",
];

const MenuSlider = () => {
  const settings = {
    infinite: true,
    speed: 8000,         // slow & smooth
    slidesToShow: 4,     // একসাথে কতগুলো দেখাবে
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,    // necessary for continuous scroll
    cssEase: "linear",   // smooth linear scroll
    pauseOnHover: false, // hover করলে speed থামবে না
    rtl: true            // ডান থেকে বামে যাবে
  };

  return (
    <div className="bg-[#181818] py-10">
      <Slider {...settings} className="overflow-hidden">
        {menuItems.map((item, idx) => (
          <div key={idx} className="text-center">
            <p
              className="
                text-6xl font-extrabold uppercase text-gray-700
                hover:text-red-600 hover:border-b-4 hover:border-red-600
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
