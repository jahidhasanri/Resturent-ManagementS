import React from "react";
import Slider from "react-slick";
import { FaStar, FaQuoteRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuSlider from "./MenuSlider";

const testimonials = [
  {
    id: 1,
    name: "Albert Flores",
    role: "Web Designer",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    review:
      "Penatibus magnis dis point parturient montes nascetur ridiculus mus Ut id lorem ac enim the vestibulum blandit nec sit amet felis.",
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

// Custom arrows
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-[calc(50%-366px)] z-10 bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-200 transition"
    style={{ marginLeft: "-2px" }}
  >
    <FaChevronLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-[calc(50%-356px)] z-10 bg-white text-gray-800 rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-200 transition"
    style={{ marginRight: "-2px" }}
  >
    <FaChevronRight />
  </button>
);

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
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="bg-[#181818] text-white relative">
      <div className="absolute right-0 lg:mt-[260px]">
        <img src="/public/images/testimonialShape1_1.png" alt="" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left side - Image with play button */}
        <div className="relative">
          <img
            src="/public/images/testimonialThumb1_1.png"
            alt="Chef cooking"
            className="rounded-lg w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() =>
                window.open("https://youtu.be/U5k3yzGaVME?si=2fcNnKy0kagsL2nD", "_blank")
              }
              className="w-[200px] h-[200px] animate-spin-slow flex items-center justify-center text-white text-2xl relative group"
            >
              <img src="/public/images/player.png" alt="" />
            </button>
          </div>
        </div>

        {/* Right side - Slider */}
        <div className="relative">
          <h4 className="text-orange-500 font-semibold mb-4 text-center lg:mr-[200px]">
            TESTIMONIALS
          </h4>
          <h2 className="text-4xl font-bold mb-16 lg:mr-[190px] text-center">
            What Our Clients Say
          </h2>

          <Slider {...settings}>
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white w-full max-w-[730px] h-[350px] text-gray-800 rounded-lg shadow-lg p-8 relative mx-auto"
              >
                <FaQuoteRight className="text-orange-500 text-4xl absolute top-6 right-6" />

                <div className="flex items-center gap-4 mb-10">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{t.name}</h3>
                    <p className="text-gray-500">{t.role}</p>
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

      <div className="mt-[60px]">
        <MenuSlider />
      </div>
    </div>
  );
};

export default Testimonial;
