import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    subtitle: 'WELCOME FRESHEAT',
    title: 'CHICAGO DEEP BURGER KING',
    buttonText: 'ORDER NOW',
    image: 'https://i.ibb.co/bMcjJRKF/burger-img.png',
    tag: '50% OFF',
  },
  {
    id: 2,
    subtitle: 'HOT DEAL',
    title: 'CHICAGO DEEP CHEESY PIZZA',
    buttonText: 'GRAB DEAL',
    image: 'https://i.ibb.co/4RHJCWrK/pizza.png',
    tag: 'BUY 1 GET 1',
  },
  {
    id: 3,
    subtitle: 'SPICY COMBO MEAL',
    title: 'CHICAGO DEEP CHICKEN & FRIES',
    buttonText: 'ORDER NOW',
    image: 'https://i.ibb.co/WW37Wyzv/chicken.png',
    tag: '30% OFF',
  },
];

const Slider = () => {
  return (
    <Swiper
      className="w-full h-[600px]"
      slidesPerView={1}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      speed={1000}
      effect="fade"
      modules={[Autoplay, EffectFade]}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="relative w-full h-full bg-cover bg-center flex items-center justify-center text-white overflow-hidden"
            style={{
              backgroundImage: `url('https://i.ibb.co/zH0qXsJ9/2515bc-da2fb336df7247eb92c72bed5a08a004-mv2.jpg')`,
            }}
          >
            {/* ✅ 4 Corner Images */}
            <img
              src="/images/corner-1.png"
              alt="corner-1"
              className="absolute top-4 left-1 w-16 md:w-20 z-10"
            />
            <img
              src="/images/corner-2.png"
              alt="corner-2"
              className="absolute top-4 right-1 w-16 md:w-20 z-10"
            />
            <img
              src="/images/corner-3.png"
              alt="corner-3"
              className="absolute bottom-4 left-1 w-16 md:w-20 z-10"
            />
            <img
              src="/images/corner-4.png"
              alt="corner-4"
              className="absolute bottom-4 right-1 w-16 md:w-20 z-10"
            />

            {/* ✅ Main Content */}
            <div className="container mx-auto mt-[80px] relative z-20">
              {/* lg+ এ flex row, sm/md এ column */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Text Section */}
                <div className="text-center lg:text-left lg:w-1/2 space-y-4 order-1">
                  <p className="text-yellow-400 text-xl md:text-2xl lg:text-[30px]">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
                    {slide.title}
                  </h1>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 mt-4 uppercase rounded shadow text-sm md:text-base">
                    {slide.buttonText}
                  </button>
                </div>

                {/* Image Section */}
                <div className="flex justify-center order-2 mt-6 lg:mt-0 lg:w-1/2">
                  <img
                    src={slide.image}
                    alt="food"
                    className="w-[250px] md:w-[400px] lg:w-[700px] h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
