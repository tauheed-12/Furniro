import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';

const OrdersPage = () => {
  const { userData } = useAuth();
  const [ordersData, setOrdersData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersOrder = async () => {
      try {
        const response = await axios.post('http://localhost:8080/user/findOrders', { userId: userData._id });
        // setOrdersData(response.data);
        setOrdersData(response.data.orders);
      } catch (error) {
        console.log("Error in getting orders data", error);
        setError("Unable to fetch data. Please try again later!");
      }
    };

    if (userData._id) {
      fetchUsersOrder();
    }
  }, [userData._id]);

  return (
    <div className='flex flex-col w-full px-16 py-10'>
      {error ? (
        <h1>{error}</h1>
      ) : (
        ordersData?.map((order, id) => (
          <div key={id} className="order-item w-full px-10 bg-slate-200 rounded-2xl flex flex-row justify-center items-center flex-wrap">
            <div className="order-item__image">
              <img src={order.orderItems[0]?.productImgUrl} alt={order.orderItems[0]?.productName} />
            </div>
            <div className="order-item__details">
              <p>{order.orderItems[0]?.productName}</p>
              <div className="order-item__attributes">
                <span>Size: {order.orderItems[0]?.size}</span>
                <span>Color: {order.orderItems[0]?.color}</span>
                <span>Quantity: {order.orderItems[0]?.quantity}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
