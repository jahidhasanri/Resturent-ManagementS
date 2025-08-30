import React from "react";
import '../MenuMarquee.css'

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
  return (
    <div className="marquee-container bg-[#181818] py-10">
      <div className="marquee-content">
        {menuItems.concat(menuItems).map((item, idx) => (
          <span
            key={idx}
            className="marquee-item"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MenuSlider;
