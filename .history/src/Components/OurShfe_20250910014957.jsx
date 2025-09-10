import React from "react";
import { FaShareAlt } from "react-icons/fa";

const chefs = [
  {
    id: 1,
    name: "Abu Nayeem Riyad",
    role: "Chef Lead",
    img: "https://i.ibb.co.com/27Jcb9ZD/IMG-20240309-180017-2.jpg",
    borderColor: "border-red-500",
    buttonColor: "bg-orange-500",
  },
  {
    id: 2,
    name: "Jahid Hasan Rifat",
    role: "Chef Assistant",
    img: "https://i.ibb.co.com/1Y4SRhMm/Whats-App-Image-2025-08-29-at-4-14-45-PM.jpg",
    borderColor: "border-orange-500",
    buttonColor: "bg-orange-500",
  },
  {
    id: 3,
    name: "Md. Saymun Ahmmed Limon",
    role: "Chef Assistant",
    img: "https://i.ibb.co.com/N2znHcbr/IMG-2256.jpg",
    borderColor: "border-red-500",
    buttonColor: "bg-orange-500",
  },
];

const OurShfe = () => {
  return (
    <div className="bg-[#f7f4ed] py-16 md:py-20">
      {/* Title */}
      <div className="text-center mb-12 md:mb-16">
        <h4 className="text-orange-500 font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
          OUR CHEFE
        </h4>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold pt-2 mb-4 md:pt-4 lg:pb-20">
          Meet Our Expert Chefs
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 ">
        {chefs.map((chef) => (
          <div
            key={chef.id}
            className="bg-white rounded-t-[150px] mb-10 mt-10  md:rounded-t-[200px] shadow-lg text-center relative pt-24 sm:pt-28"
          >
            {/* Image Wrapper */}
            <div className="absolute w-[220px] sm:w-[260px] md:w-[310px] -top-16 sm:-top-20 left-1/2 transform -translate-x-1/2">
              <img
                src={chef.img}
                alt={chef.name}
                className={`w-full h-[220px] sm:h-[250px] md:h-[290px] object-cover rounded-r-[70px] md:rounded-r-[100px] rounded-t-[70px] md:rounded-t-[100px] border-b-4 sm:border-b-6 md:border-b-8 ${chef.borderColor}`}
              />
              {/* Share Button */}
              <button  onClick={() => window.open('https://youtu.be/U5k3yzGaVME?si=2fcNnKy0kagsL2nD', '_blank')}
                className={`absolute bottom-[-18px] sm:bottom-[-20px] left-1/2 transform -translate-x-1/2 ${chef.buttonColor} text-white p-2 sm:p-3 rounded-full shadow-md hover:scale-110 transition`}
              >
                <FaShareAlt size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Info */}
            <div className="mt-28 sm:mt-32 mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                {chef.name}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">{chef.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurShfe;
