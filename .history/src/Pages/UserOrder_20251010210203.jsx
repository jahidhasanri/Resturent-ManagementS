import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const UserOrder = () => {
      const { user } = useContext(AuthContext);
      console.log(user?.email);
    const fetchOrders = async () => {
  try {
    const res = await axios.get(`https://resturent-management-server-three.vercel.app/finalOrders?email=${user?.email}`);
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
  
};
    return (
        <div>
            hkj
        </div>
    );
};

export default UserOrder;