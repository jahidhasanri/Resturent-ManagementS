import React from 'react';
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
    return (
      <div className='relative pt-8 pb-8'>
          <div className="flex items-center justify-between">
            <div className=''>
            <img 
                className=" left-0" 
                src="/images/aboutShape1_1.png" 
                alt="Left Shape" 
            />
            </div>
               <div className='text-center w-[600px] mx-auto'>
                <h5 className='text-[#fc7819] text-[14px] font-bold'>ABOUT US</h5>
                <h2 className='font-bold text-[40px]'>Variety of flavours from american cuisine</h2>
                <h4 className='text-[18px] mt-2 font-normal mb-10'>It is a long established fact that a reader will be distracted the readable content of a page when looking at layout the point established fact that</h4>
                <NavLink to={'/aboutus'} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 mt-4 uppercase rounded shadow">Read More</NavLink>
            </div>

            <div>
            <img 
                className=" right-0" 
                src="/images/aboutShape1_4.png" 
                alt="Right Shape" 
            />

            </div>
         
      
         <img className='absolute mb-[250px] ml-[380px]' src="/public/images/aboutShape1_2.png" alt="" />
         <img className='absolute  left-52 animate-Aspin-slow' src="/public/images/aboutShape1_3.png" alt="" />
         <img className='absolute mb-[0px] right-52 animate-Aspin-slow' src="/public/images/aboutShape1_6.png" alt="" />
        </div>



      </div>
    );
};

export default AboutUs;
