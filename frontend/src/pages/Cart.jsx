import React, { useEffect, useState, useCallback } from 'react';
import Hero from '../components/Hero';
import sofa from '../assets/Group 107.png';
import Features from '../components/Features';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { useCheckout } from '../Context/CheckoutContext';

const CartCard = ({ productId, imgName, price, productName, removeProduct }) => {
    return (
        <div className='flex flex-row justify-center items-center gap-14 px-16 py-8'>
            <table className='flex-[2]'>
                <thead className='bg-main'>
                    <tr>
                        <th className='px-10 py-1'>Product</th>
                        <th className='px-10 py-1'>Price</th>
                        <th className='px-10 py-1'>Quantity</th>
                        <th className='px-10 py-1'>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='items-center'>
                        <td className='flex flex-row gap-2 justify-center items-center'>
                            <img src={imgName} className='w-16 h-16 mt-2' alt='sofa' />
                            <span>{productName}</span>
                        </td>
                        <td className='text-center'>${price}</td>
                        <td className='text-center'>1</td>
                        <td className='text-center'>${price}</td>
                    </tr>
                </tbody>
            </table>
            <button className='px-4 py-2 border-2 border-black rounded-2xl' onClick={() => removeProduct(productId)}>
                Remove
            </button>
        </div>
    );
};

const Cart = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const { userData, setCheckOutAmount, setUserData } = useAuth();
    const { setTotalCheckoutValue, setProductIds } = useCheckout();

    useEffect(() => {
        let amount = 0;
        userData.cart?.forEach(cartData => {
            amount += cartData.price;
        });
        console.log(userData);
        console.log(amount);
        setTotalAmount(amount);
        // setTotalAmount(prev => prev - response.data.price);
        setTotalCheckoutValue(totalAmount);
        setLoading(false);
    }, [userData.cart]);

    const removeProduct = useCallback(async (productId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8080/product/removeCart', { userId: userData._id, productId });
            setTotalAmount(prev => prev - response.data.price);
            setUserData(response.data.userData)
            setCheckOutAmount(totalAmount);
            setTotalCheckoutValue(totalAmount);
            setProductIds(response.data.map(product => product._id));
        } catch (error) {
            setError("Error in removing product");
            console.error("Error in removing product", error);
        } finally {
            setLoading(false);
        }
    }, [userData._id, setCheckOutAmount, setTotalCheckoutValue, setProductIds]);

    return (
        <div>
            <Hero title={"Cart"} />
            {loading ? (
                <h1 className='w-full text-center my-10'>Loading...</h1>
            ) : error ? (
                <h1 className='w-full text-center my-10 text-red-500'>{error}</h1>
            ) : userData.cart.length === 0 ? (
                <h1 className='w-full text-center my-10'>No product in cart</h1>
            ) : (
                userData.cart.map((cartData, index) => (
                    <CartCard
                        key={index}
                        productId={cartData.productId}
                        imgName={cartData.productImgUrl || sofa}
                        price={cartData.price}
                        productName={cartData.productName}
                        removeProduct={removeProduct}
                    />
                ))
            )}
            <div className='flex-1 p-8 m-4 bg-main flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-semibold'>Cart Total</h1>
                <div className='mt-8 w-full'>
                    <div className='flex flex-row justify-between items-center w-full'>
                        <span className='text-lg font-semibold'>Subtotal</span>
                        <span className='text-text-primary'>${totalAmount}</span>
                    </div>
                    <div className='flex flex-row justify-between items-center w-full'>
                        <span className='text-lg font-semibold'>Total</span>
                        <span className='text-text-secondary'>${totalAmount}</span>
                    </div>
                </div>
                {totalAmount > 0 &&
                    <Link to='/checkout'>
                        <button className='px-4 py-2 border-2 border-black rounded-2xl mt-8'>
                            Checkout
                        </button>
                    </Link>
                }
            </div>
            <Features />
        </div>
    );
};

export default Cart;
