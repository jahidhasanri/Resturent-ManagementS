import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Card = () => {
    const [cardItem,SetCardItem]=useState('');
    useEffect(()=>{
       const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cardItems");
        SetCardItem(response.data); 
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
    },[])
    console.log(cardItem);
    return (
        <div>
            
        </div>
    );
};

export default Card;