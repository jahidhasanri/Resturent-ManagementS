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
            className="relative w-full h-full bg-contain  bg-center flex items-center justify-center text-white overflow-hidden"
            style={{
              backgroundImage: `url('https://i.ibb.co/zH0qXsJ9/2515bc-da2fb336df7247eb92c72bed5a08a004-mv2.jpg')`
              
            }}
          >
            
            {/* ✅ Static 4 Corner Images */}
            <img src="/images/corner-1.png" alt="corner-1" className="absolute top-4 left-[0.5px] w-20 z-10" />
            <img src="/images/corner-2.png" alt="corner-2" className="absolute top-4 right-[0.5px] w-20 z-10" />
            <img src="/images/corner-3.png" alt="corner-3" className="absolute bottom-4 left-[0.5px] w-20 z-10" />
            <img src="/images/corner-4.png" alt="corner-4" className="absolute bottom-4 right-[0.5px] w-20 z-10" />

            {/* ✅ Main Content */}
            <div className="container mx-auto mt-[100px]  relative z-20">
              <div className="flex  items-center justify-between">
                {/* Text Section */}
                <div className="text-center md:text-left md:w-1/2 space-y-4">
                  <p className="text-yellow-400 text-[30px]">{slide.subtitle}</p>
                  <h1 className="text-4xl md:text-7xl font-bold">{slide.title}</h1>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 mt-4 uppercase rounded shadow">
                    {slide.buttonText}
                  </button>
                </div>

                {/* Image Section */}
                <div className=" flex justify-center mt-6 md:mt-0">
                  <img
                    src={slide.image}
                    alt="food"
                    className="w-[700px] h-[400px]  "
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
