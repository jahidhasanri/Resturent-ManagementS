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
    name: "Md. Limon Ahmed",
    role: "Chef Assistant",
    img: "https://i.ibb.co.com/N2znHcbr/IMG-2256.jpg",
    borderColor: "border-red-500",
    buttonColor: "bg-orange-500",
  },
];

const OurShfe = () => {
  return (
    <div className="bg-[#f7f4ed] py-20">
      {/* Title */}
      <div className="text-center mb-16">
        <h4 className="text-orange-500 font-semibold flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span> OUR CHEFE
        </h4>
        <h2 className="text-4xl font-bold pb-20">Meet Our Expert Chefe</h2>
      </div>

      {/* Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
        {chefs.map((chef) => (
          <div
            key={chef.id}
            className="bg-white rounded-t-[200px] shadow-lg text-center relative pt-28"
          >
            {/* Image Wrapper */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
              <img
                src={chef.img}
                alt={chef.name}
                className={`w-[250px] h-[250px] object-cover rounded-b-[100px] border-b-4 ${chef.borderColor}`}
              />
              {/* Share Button */}
              <button
                className={`absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 ${chef.buttonColor} text-white p-3 rounded-full shadow-md hover:scale-110 transition`}
              >
                <FaShareAlt />
              </button>
            </div>

            {/* Info */}
            <div className="mt-28 mb-8">
              <h3 className="text-xl font-bold">{chef.name}</h3>
              <p className="text-gray-500">{chef.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurShfe;
