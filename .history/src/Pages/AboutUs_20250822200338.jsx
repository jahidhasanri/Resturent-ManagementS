import React from 'react';
import Display from '../Components/Display';
import TodaySepcialFood from '../Components/TodaySepcialFood';

const AboutUs = () => {
    return (
        <div className='bg-[#f4f1ea]'>
            <div  style={{
                backgroundImage: "url('/public/images/breadcumb.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "50vh",
                width: "100%"
            }}>
                 <h1 className='font-bold text-center pt-[150px] text-[60px] text-white'>
            ABOUT US
            </h1>
            </div>
            <Display></Display>
            <TodaySepcialFood></TodaySepcialFood>
        </div>
    );
};

export default AboutUs;