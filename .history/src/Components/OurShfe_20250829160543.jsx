import React from "react";
import { FaShareAlt } from "react-icons/fa";

const chefs = [
  {
    id: 1,
    name: "Ralph Edwards",
    role: "Chef Lead",
    img: "https://i.ibb.co/6NSgK5f/chef1.jpg", // এখানে তোমার ইমেজ ইউআরএল বসাও
    borderColor: "border-red-500",
    buttonColor: "bg-orange-500",
  },
  {
    id: 2,
    name: "Leslie Alexander",
    role: "Chef Assistant",
    img: "https://i.ibb.co/zP2vMxG/chef2.jpg",
    borderColor: "border-orange-500",
    buttonColor: "bg-orange-500",
  },
  {
    id: 3,
    name: "Ronald Richards",
    role: "Chef Assistant",
    img: "https://i.ibb.co/FKCNhJt/chef3.jpg",
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
        <h2 className="text-4xl font-bold mt-2">Meet Our Expert Chefe</h2>
      </div>

      {/* Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">
        {chefs.map((chef) => (
          <div
            key={chef.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden text-center relative"
          >
            {/* Image Wrapper */}
            <div className="relative">
              <img
                src={chef.img}
                alt={chef.name}
                className={`w-full h-[350px] object-cover rounded-b-[100px] border-b-4 ${chef.borderColor}`}
              />
              {/* Share Button */}
              <button
                className={`absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 ${chef.buttonColor} text-white p-3 rounded-full shadow-md hover:scale-110 transition`}
              >
                <FaShareAlt />
              </button>
            </div>

            {/* Info */}
            <div className="mt-10 mb-8">
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
