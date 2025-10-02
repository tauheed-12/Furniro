import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../helper/helper";
import Spinner from "../components/Spinner";
import FetchError from "./FetchErrorTempl";

const OrdersPage = () => {
  const userId = getCookie("userId");
  const token = getCookie("token");
  const [ordersData, setOrdersData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsersOrder = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URI}/user/findOrders`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrdersData(response.data.orders);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Unable to fetch data. Please try again later!");
      }
    };

    if (userId) fetchUsersOrder();
  }, [userId, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Your Orders
      </h1>

      {error ? (
        <FetchError message={"Unable to fetch orders data!! Please try again"} />
      ) : (
        <div className="flex flex-col gap-8">
          {ordersData.length === 0 ? (
            <p className="text-center text-gray-600">
              You don’t have any orders yet.
            </p>
          ) : (
            ordersData.map((order) => (
              <div
                key={order.id}
                className="border rounded-xl shadow-md bg-white overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b bg-gray-50">
                  <div>
                    <h2 className="font-semibold text-lg">
                      Order #{order.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`mt-2 md:mt-0 px-3 py-1 text-sm rounded-full font-medium ${order.order_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.order_status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.order_status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="divide-y">
                  {order.orderItems.length === 0 ? (
                    <p className="p-4 text-gray-500">No items in this order.</p>
                  ) : (
                    order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col md:flex-row items-center gap-4 p-4"
                      >
                        <img
                          src={item.productImgUrl}
                          alt={item.productName}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="font-medium">{item.productName}</h3>
                          <p className="text-sm text-gray-600">
                            Price: ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-800">
                          ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Order Footer */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50">
                  <p className="font-semibold text-lg">
                    Total: ₹{order.total_price}
                  </p>
                  {order.transaction && (
                    <div className="text-sm text-gray-600 mt-2 md:mt-0">
                      <p>
                        Payment:{" "}
                        <span className="font-medium capitalize">
                          {order.transaction.transaction_type}
                        </span>
                      </p>
                      <p>
                        Status:{" "}
                        <span
                          className={`font-medium ${order.transaction.transaction_status === "completed"
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        >
                          {order.transaction.transaction_status}
                        </span>
                      </p>
                    </div>
                  )}
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
