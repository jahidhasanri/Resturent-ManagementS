import React from "react";
import Slider from "react-slick";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Albert Flores",
    role: "Web Designer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    review:
      "Penatibus magnis dis point parturient montes nascetur ridiculus mus Ut id lorem ac enim the vestibulum blandit nec sit amet felis. Fusce quis diam odio Cras mattis mi quis tincidunt.",
  },
  {
    id: 2,
    name: "Jenny Wilson",
    role: "Marketing Manager",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    name: "Robert Fox",
    role: "UI/UX Designer",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: 4,
    review:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel.",
  },
];

const Testimonial = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <div className="bg-[#181818] text-white ">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
        {/* Left side - Image with play button */}
        <div className="relative">
          <img
            src="/public/images/testimonialThumb1_1.png"
            alt="Chef cooking"
            className="rounded-lg w-full object-cover"
          />
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() =>
                window.open("https://youtu.be/U5k3yzGaVME?si=2fcNnKy0kagsL2nD", "_blank")
              }
              className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center text-white text-2xl relative group hover:scale-110 transition"
            >
              ▶
              <span className="absolute -bottom-10 text-sm">PLAY VIDEO</span>
            </button>
          </div>
        </div>

        {/* Right side - Slider */}
        <div>
          <h4 className="text-orange-500 font-semibold mb-2">TESTIMONIALS</h4>
          <h2 className="text-4xl font-bold mb-10">What Our Clients Say</h2>

          <Slider {...settings}>
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white text-gray-800 rounded-lg shadow-lg p-8 relative">
                {/* Quote Icon */}
                <FaQuoteRight className="text-orange-500 text-4xl absolute top-6 right-6" />

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{t.name}</h3>
                    <p className="text-gray-500">{t.role}</p>
                    {/* Rating */}
                    <div className="flex text-orange-500">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600">{t.review}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
