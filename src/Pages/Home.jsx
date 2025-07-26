import React from 'react';
import Slider from '../Components/Slider';
import Display from '../Components/Display';
import { div } from 'framer-motion/client';
import BestFood from '../Components/BestFood';



const Home = () => {
    return (
     <div>
        <Slider></Slider>
    <BestFood></BestFood>
    <Display></Display>
     </div>
     
    );
};

export default Home;