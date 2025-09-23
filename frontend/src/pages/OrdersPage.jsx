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
          `http://localhost:8080/user/findOrders`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setOrdersData(response.data.orders);
      } catch (error) {
        setLoading(false);
        setError("Unable to fetch data. Please try again later!");
      }
    };

    if (userId) {
      fetchUsersOrder();
    }
  }, [userId, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Your Orders</h1>
      {error ? (
        <FetchError message={"Unable to fetch orders data!!, Please try after sometime"} />
      ) : (
        <div className="flex flex-col gap-6">
          {ordersData.map((order) =>
            order.orderItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-14 px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 border-b"
              >
                {/* Table layout for larger screens */}
                <table className="hidden md:table flex-[2] w-full text-sm md:text-base">
                  <thead className="bg-main text-black">
                    <tr>
                      <th className="px-4 md:px-6 py-2">Product</th>
                      <th className="px-4 md:px-6 py-2">Size</th>
                      <th className="px-4 md:px-6 py-2">Color</th>
                      <th className="px-4 md:px-6 py-2">Quantity</th>
                      <th className="px-4 md:px-6 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="flex flex-row gap-2 justify-center items-center py-2">
                        <img
                          src={item.productImgUrl}
                          alt={item.productName}
                          className="w-12 h-12 md:w-16 md:h-16 object-cover"
                        />
                        <span className="text-xs sm:text-sm md:text-base">
                          {item.productName}
                        </span>
                      </td>
                      <td>{item.size}</td>
                      <td>{item.color}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${item.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Card layout for mobile */}
                <div className="md:hidden w-full flex flex-col gap-3 border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.productImgUrl}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.productName}</span>
                      <span className="text-gray-600 text-sm">
                        Size: {item.size}, Color: {item.color}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Qty: {item.quantity}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Cancel Button */}
                {/* <button className="px-3 sm:px-4 py-1 sm:py-2 border-2 border-red-700 text-red-700 rounded-xl hover:bg-red-700 hover:text-white transition">
                  Cancel
                </button> */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
