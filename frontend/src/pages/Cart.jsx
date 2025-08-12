import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Hero from '../components/Hero';
import Features from '../components/Features';
import CartCard from '../components/CartCard';
import CartTotal from '../components/CartTotal';
import Spinner from '../components/Spinner';
import { FaExclamationTriangle } from 'react-icons/fa';

import sofa from '../assets/Group 107.png';

import {
    addToCart,
    deleteFromCart,
    clearCart,
    fetchCart,
} from '../slices/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const removeProduct = (productId) => {
        dispatch(deleteFromCart(productId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const totalAmount = items.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <Hero title="Cart" />

            {/* Loading and Error States */}
            {status === 'loading' && (
                <Spinner />
            )}
            {status === 'failed' && (
                <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                    <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops! Something went wrong.</h2>
                    <p className="text-gray-600 mb-6">{error || "Failed to load your cart. Please try again."}</p>
                    <button
                        onClick={() => dispatch(fetchCart())}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Cart Content */}
            {status === 'succeeded' && (
                <>
                    {items.length === 0 ? (
                        <h1 className="w-full text-center my-10">No product in cart</h1>
                    ) : (
                        <div className="px-4 md:px-10">
                            {items.map((item) => (
                                <CartCard
                                    key={item.productId}
                                    productId={item.productId}
                                    imgName={item.productImgUrl || sofa}
                                    price={item.price}
                                    productName={item.productName}
                                    removeProduct={removeProduct}
                                />
                            ))}

                            {/* Cart Total */}
                            <CartTotal totalAmount={totalAmount} />

                            {/* Clear Cart Button */}
                            <div className="flex justify-center mt-6">
                                <button
                                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                                    onClick={handleClearCart}
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Features Section */}
            <Features />
        </div>
    );
};

export default Cart;
