import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const TodaySepcialFood = () => {
    return (
        <div className='w-full bg-cover bg-center'  style={{ backgroundImage: "url('/images/ctaBG1_1.jpg')" }}>
           <div className='w-8/12 mx-auto pt-[100px] pb-[100px] flex items-center justify-between'>
                <div>
                    <h3 className='text-[#eb0027] text-[28px] font-bold mb-3'>WELCOME FRESHEAT</h3>
                    <h1 className='font-bold text-[50px] text-white mb-3'>TODAY SPACIAL FOOD</h1>
                    <h5 className='text-[28px] text-[#fc7819] font-semibold mb-10'>limits Time Offer</h5>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 uppercase rounded shadow flex items-center gap-2 text-center transition duration-300 ease-in-out">
                        VIEW ALL ITEM <FaArrowRight className="text-white" />
                      </button>
                </div>
                <div>
                    <img className='w-[600px] h-[400px] animate-left-right' src="/images/pizza.png" alt="" />
                </div>
           <img className='absolute right-2 lg:mb-[-430px] animate-float' src="/images/ctaShape1_3.png" alt="" />
           <img className='absolute left-0 lg:mb-[-450px] animate-float' src="/images/ctaShape1_2.png" alt="" />
           <img className='absolute left-2 lg:mb-[430px] animate-left-right' src="/images/corner-2.png" alt="" />
           </div>

        </div>
    );
};

export default TodaySepcialFood;