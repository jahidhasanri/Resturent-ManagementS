import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const UserOrder = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user?.email]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/finalOrders?email=${user.email}`
      );
      console.log("Fetched Orders:", res.data);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="p-6 mt-24">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length > 0 ? (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li
              key={order._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <p><strong>Total:</strong> {order.total}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Payment:</strong> {order.paidstatus}</p>
              <p><strong>Transaction ID:</strong> {order.tran_id}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default UserOrder;
