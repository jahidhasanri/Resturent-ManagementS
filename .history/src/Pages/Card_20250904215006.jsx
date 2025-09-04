import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Card = () => {
  const [cardItem, setCardItem] = useState([]);
  const { user } = useContext(AuthContext); // get logged-in user

  useEffect(() => {
    if (!user?._id) return; // check if user exists

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cardItems`, {
          params: { userId: user._id } // pass userId
        });
        if (response.data.success) {
          setCardItem(response.data.data); 
        } else {
          setCardItem([]);
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [user]);

  console.log(cardItem);

  return (
    <div>
      {cardItem?.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        cardItem.map(item => (
          <div key={item?.itemId}>
            <p>{item?.itemName}</p>
            <p>${item?.itemPrice}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Card;
