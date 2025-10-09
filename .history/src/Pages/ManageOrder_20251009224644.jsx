import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/finalorder");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <div>
      <h2>This is manage order page</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>{order}</li>
          ))}
        </ul>
      ) : (
        <p>Loading orders...</p>
      )}
    </div>
  );
};

export default ManageOrder;
