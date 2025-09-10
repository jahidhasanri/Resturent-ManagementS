import React from 'react';
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className='relative pt-8 pb-8'>
      <div
        className="
          flex items-center justify-between
          flex-col md:flex-col lg:flex-row
          text-center lg:text-left
          relative
        "
      >
        {/* Left Shape */}
        <div className='mb-4 lg:mb-0'>
          <img
            className="
              left-0
              mx-auto
              md:mr-[338px]
              lg:mr-0
            "
            src="/images/aboutShape1_1.png"
            alt="Left Shape"
          />
        </div>

        {/* Text Content */}
        <div className='w-full md:w-[600px] lg:w-[600px] mx-auto px-4'>
          <h5 className='text-[#fc7819] text-[14px] font-bold'>ABOUT US</h5>
          <h2 className='font-bold text-[28px] md:text-[32px] lg:text-[40px]'>
            Variety of flavours from american cuisine
          </h2>
          <h4 className='text-[16px] md:text-[18px] mt-2 font-normal mb-10'>
            It is a long established fact that a reader will be distracted the readable content of a page when looking at layout the point established fact that
          </h4>
          <NavLink
            to={'/aboutus'}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 mt-4 uppercase rounded shadow"
          >
            Read More
          </NavLink>
        </div>

        {/* Right Shape */}
        <div className='mt-4 lg:mt-0'>
          <img
            className="
              right-0
              md:ml-[335px]
              lg:ml-0
            "
            src="/images/aboutShape1_4.png"
            alt="Right Shape"
          />
        </div>

        {/* Floating / Absolute Shapes */}
        <img
          className='absolute mb-[250px] ml-[380px] hidden md:block lg:hidden 2xl:block'
          src="/images/aboutShape1_2.png"
          alt=""
        />
        <img
          className='absolute left-10 md:left-52 md:mt-[950px] lg:hidden 2xl:block lg:mt-0 animate-Aspin-slow hidden md:block'
          src="/images/aboutShape1_3.png"
          alt=""
        />
        <img
          className='absolute right-10 md:right-52 md:mt-[100px] lg:hidden 2xl:block lg:mt-0 animate-Aspin-slow hidden md:block'
          src="/images/aboutShape1_6.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default AboutUs;
