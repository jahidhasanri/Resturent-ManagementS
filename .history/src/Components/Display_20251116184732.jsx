import React from 'react';
import { useNavigate } from 'react-router-dom';

const Display = () => {
  const navigate = useNavigate();
  
    return (
        <div className='bg-[#f5f2eb] pb-10 pt-10'>
         
          <div className='w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6'>
            <div className='sm:w-[310px] md:w-[570px] lg:w-[450px] xl:w-[570px] md:mx-auto flex items-center  p-4 rounded-sm opacity-95'
            style={{
              backgroundImage: `url('/images/crop-plate-with-salad.jpg')`
              
            }}>
                <img src="/images/offerShape1_4.png" className='absolute ml-[120px] mb-[200px] lg:ml-[270px] lg:mb-[170px] animate-left-right' alt="" />
                <div>
                    <h4 className='text-red-600 text-base font-bold'>ON THIS WEEK</h4>
                    <h5 className='text-white font-bold text-[30px] mt-2 mb-2'>SPICY FRIED CHICKEN</h5>
                    <h2 className='text-[#fc7819] text-base font-semibold'>limits Time Offer</h2>
                    <button onClick={()=>{navigate('/menu')}} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 mt-4 uppercase rounded shadow">
                    Order Now 
                  </button>
                </div>
                <div>
                    <img src="/images/offerThumb1_1.png" alt="" className='w-[210px] h-[250px]'/>
                </div>

            </div>
            <div className='sm:w-[310px] md:w-[570px] md:mx-auto lg:w-[450px] xl:w-[570px] flex items-center  p-4 rounded-sm opacity-95'
            style={{
              backgroundImage: `url('/images/crop-plate-with-salad.jpg')`
              
            }}>
                <img src="/images/offerShape1_4.png" className='absolute ml-[120px] mb-[200px] lg:ml-[270px] lg:mb-[170px] animate-left-right' alt="" />
                <div>
                    <h4 className='text-red-600 text-base font-bold'>WELCOME FRESHEAT</h4>
                    <h5 className='text-white font-bold text-[30px] mt-2 mb-2'>TODAY SPACIAL FOOD</h5>
                    <h2 className='text-[#fc7819] text-base font-semibold'>limits Time Offer</h2>
                    <button onClick={()=>{navigate('/menu')}} className="bg-[#fc7819] hover:bg-[#fc781989] text-white px-6 py-3 mt-4 uppercase rounded shadow">
                    Order Now 
                  </button>
                </div>
                <div>
                    <img src="/images/offerThumb1_2.png" alt="" className='w-[210px] h-[250px]'/>
                </div>

            </div>
            <div className='sm:w-[310px] md:w-[570px] md:mx-auto lg:w-[450px] xl:w-[570px] flex items-center  p-4 rounded-sm opacity-95'
            style={{
              backgroundImage: `url('/images/crop-plate-with-salad.jpg')`
              
            }}>
                <img src="/images/offerShape1_4.png" className='absolute ml-[120px] mb-[200px] lg:ml-[270px] lg:mb-[170px] animate-left-right' alt="" />
                <div>
                    <h4 className='text-red-600 text-base font-bold'>ON THIS WEEK</h4>
                    <h5 className='text-white font-bold text-[30px] mt-2 mb-2'>SPICY CHICKEN ROLL</h5>
                    <h2 className='text-[#fc7819] text-base font-semibold'>limits Time Offer</h2>
                    <button onClick={()=>{navigate('/menu')}} className="bg-[#fc7819] hover:bg-[#fc781989] text-white px-6 py-3 mt-4 uppercase rounded shadow">
                    Order Now 
                  </button>
                </div>
                <div>
                    <img src="/images/offerThumb1_3.png" alt="" className='w-[210px] h-[250px]'/>
                </div>

            </div>
           
            
          </div>
        </div>
    );
};

export default Display;