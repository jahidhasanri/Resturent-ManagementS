import React, { useContext } from 'react';
import Slider from '../Components/Slider';
import Display from '../Components/Display';
import { div } from 'framer-motion/client';
import BestFood from '../Components/BestFood';
import { AuthContext } from '../Provider/AuthProvider';
import AboutUs from '../Components/AboutUs';
import BestSellingDesh from '../Components/BestSellingDesh';
import TodaySepcialFood from '../Components/TodaySepcialFood';
import OurShfe from '../Components/OurShfe';
import Testimonial from '../Components/Testimonial';



const Home = () => {
    const {loader}=useContext(AuthContext)
    // if(loader){
    //    return <span className="loading loading-spinner text-error"></span>
    // }
    return (
     <div>
        <Slider></Slider>
    <BestFood></BestFood>
    <Display></Display>
    <AboutUs></AboutUs>
    <BestSellingDesh></BestSellingDesh>
    <TodaySepcialFood></TodaySepcialFood>
    <OurShfe></OurShfe>
    <Testimonial></Testimonial> 
     </div>
     
    );
};

export default Home;