import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const Review = () => {
    const {user}=useContext(AuthContext)
 const [orders, setOrders] = useState([]);
     useEffect(() => {
        if (user?.email) {
          fetchOrders();
        }
      }, [user?.email]);
    
      const fetchOrders = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/finalOrders?email=${user?.email}`
          );
          setOrders(res.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
      console.log(orders.orders);
    
    return (
        <div>
            this is review page
        </div>
    );
};

export default Review;