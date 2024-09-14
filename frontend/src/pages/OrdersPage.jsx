import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';

const OrdersPage = () => {
  const { userId } = useAuth();
  const [ordersData, setOrdersData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
            if (!tokenCookie) {
                return;
            }

    const token = tokenCookie.split('=')[1];
    const fetchUsersOrder = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/user/findOrders',
          { userId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrdersData(response.data.orders);
      } catch (error) {
        console.error('Error in getting orders data', error);
        setError('Unable to fetch data. Please try again later!');
      }
    };

    if (userId) {
      fetchUsersOrder();
    }
  }, [userId]);

  return (
    <div className="px-16 py-10">
      {error ? (
        <h1 className="text-red-500">{error}</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ordersData.map((order) =>
            order.orderItems.map((item) => (
              <div key={item._id} className="order-item bg-white rounded-lg shadow-md p-3 flex flex-col items-center">
                <div className="order-item__image w-full h-48 flex justify-center items-center overflow-hidden rounded-md mb-4">
                  <img src={item.productImgUrl} alt={item.productName} className="max-h-full max-w-full object-cover" />
                </div>
                <div className="order-item__details text-center">
                  <h2 className="text-lg font-semibold mb-2">{item.productName}</h2>
                  <div className="order-item__attributes text-sm text-gray-600">
                    <p>Size: {item.size}</p>
                    <p>Color: {item.color}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Status: {item.status}</p>
                  </div>
                  <button className='text-lg bg-red-700 hover:bg-red-400 text-white px-4 py-1 rounded-xl mt-4'>Cancel</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
