import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const foods = [
  {
    title: 'Egg And Cucumber',
    price: '$28.00',
    img: '/public/images/item1_1.png',
  },
  {
    title: 'Chicken Fried Rice',
    price: '$100.99',
    img: '/public/images/item1_2.png',
  },
  {
    title: 'Chicken Leg Piece',
    price: '$20.99',
    img: '/public/images/item1_3.png',
  },
  {
    title: 'Chicken Pizza',
    price: '$26.99',
    img: '/public/images/item1_4.png',
  },
  {
    title: 'Egg And Cucumber',
    price: '$28.00',
    img: '/public/images/item1_1.png',
  },
  {
    title: 'Chicken Fried Rice',
    price: '$100.99',
    img: '/public/images/item1_2.png',
  },
  {
    title: 'Chicken Leg Piece',
    price: '$20.99',
    img: '/public/images/item1_3.png',
  },
  {
    title: 'Chicken Pizza',
    price: '$26.99',
    img: '/public/images/item1_4.png',
  },
];

const Slider = () => {
  return (
   <div className='relative mt-24'>
     <h5 className='text-[#fa812a] text-lg text-center'>BEST FOOD</h5>
                <h1 className='text-[36px] font-bold text-center'>Popular Food Items</h1>
                <img src="/public/images/pizza slice.png" className='absolute top-20 right-0 animate-float' alt="" />
             <img src="/public/images/bestFoodItemsShape1_1.png" className='absolute left-0 bottom-0 animate-float' alt="" />
     <div className="max-w-6xl mx-auto my-10 ">
       
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        speed={1500} 
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {foods.map((food, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white shadow-xl rounded-lg text-center p-5 my-10">
                
              <div className="relative mx-auto w-32 h-32 mb-4">
                <div className="absolute inset-0 border-4 border-dotted border-red-500  rounded-full animate-spin-slow"></div>
                <img
                  src={food.img}
                  alt={food.title}
                  className="w-full h-full object-cover rounded-full z-10 relative p-2"
                />
              </div>
              <h2 className="text-lg font-bold">{food.title}</h2>
              <p className="text-gray-500">The Registration Fee</p>
              <p className="text-red-600 text-lg font-semibold">{food.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
   </div>
  );
};

export default Slider;
