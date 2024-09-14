import React, { useEffect, useState, useCallback } from 'react';
import Hero from '../components/Hero';
import sofa from '../assets/Group 107.png';
import Features from '../components/Features';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useCheckout } from '../Context/CheckoutContext';
import CartCard from '../components/CartCard';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const { userId } = useAuth();
    const { setTotalCheckoutValue, setProductIds } = useCheckout();
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            setLoading(true);
            setError(null);

            const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
            if (!tokenCookie) {
                setError("Authentication token not found. Please log in.");
                setLoading(false);
                return;
            }

            const token = tokenCookie.split('=')[1];
            console.log(token)

            try {
                const response = await axios.post('http://localhost:8080/product/cartProduct',
                    { userId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                console.log(response.data);
                setCartData(response.data);

                const total = response.data.reduce((acc, item) => acc + item.price, 0);
                setTotalAmount(total);
                setTotalCheckoutValue(total);

            } catch (error) {
                setError("Error during fetching cart info");
                console.error("Error during fetching cart info", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchCartData();
        }
    }, [userId, setTotalCheckoutValue]);

    const removeProduct = useCallback(async (productId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8080/product/removeCart', { userId, productId });
            const updatedCartData = response.data.cartData;

            setCartData(updatedCartData);

            const total = updatedCartData.reduce((acc, item) => acc + item.price, 0);
            setTotalAmount(total);

            setProductIds(updatedCartData.map(product => product._id));
        } catch (error) {
            setError("Error in removing product");
            console.error("Error in removing product", error);
        } finally {
            setLoading(false);
        }
    }, [userId, setProductIds]);

    return (
        <div>
            <Hero title={"Cart"} />
            {loading ? (
                <h1 className='w-full text-center my-10'>Loading...</h1>
            ) : error ? (
                <h1 className='w-full text-center my-10 text-red-500'>{error}</h1>
            ) : cartData.length === 0 ? (
                <h1 className='w-full text-center my-10'>No product in cart</h1>
            ) : (
                cartData.map((item, id) => (
                    <CartCard
                        key={id}
                        productId={item.productId}
                        imgName={item.productImgUrl || sofa}
                        price={item.price}
                        productName={item.productName}
                        removeProduct={removeProduct}
                    />
                ))
            )}
            <CartTotal totalAmount={totalAmount} />
            <Features />
        </div>
    );
};

export default Cart;
