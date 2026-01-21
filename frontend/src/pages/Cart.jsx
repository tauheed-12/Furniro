import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Hero from '../components/Hero';
import Features from '../components/Features';
import CartCard from '../components/CartCard';
import CartTotal from '../components/CartTotal';
import Spinner from '../components/Spinner';
import { FaExclamationTriangle } from 'react-icons/fa';
import { showNotification } from '../slices/notificationSlice';
import { setTotalCheckoutValue, setProductIds } from '../slices/checkoutSlice';
import { useNavigate } from 'react-router-dom';
import sofa from '../assets/Group 107.png';

import { deleteFromCart, fetchCart } from '../slices/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, fetchStatus, error } = useSelector((state) => state.cart);

    useEffect(() => {
        const fetchUserCart = async () => {
            dispatch(fetchCart());
        }
        fetchUserCart();
    }, [dispatch]);

    const handleCheckout = () => {
        if (items.length === 0) {
            dispatch(showNotification({ type: 'error', message: 'Your cart is empty. Please add items to proceed to checkout.' }));
            return;
        }

        const totalValue = items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
        dispatch(setTotalCheckoutValue(totalValue));

        const productIds = items.map(item => item.productId);
        dispatch(setProductIds(productIds));

        navigate('/checkout');
    };

    const removeProduct = async (productId) => {
        dispatch(deleteFromCart(productId));
        // Fetch cart again after deletion
        dispatch(fetchCart());
    };

    // Total amount considering quantity
    const totalAmount = items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

    return (
        <div>
            <Hero title="Cart" />

            {/* Loading and Error States */}
            {fetchStatus === 'loading' && (
                <div className="flex justify-center items-center h-[70vh]">
                    <Spinner />
                </div>
            )}

            {fetchStatus === 'failed' && (
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
            {fetchStatus === 'succeeded' && (
                <>
                    {items.length === 0 ? (
                        <h1 className="w-full text-center my-10">No products in cart</h1>
                    ) : (
                        <div className="px-4 md:px-10">
                            {items.map((item) => (
                                <CartCard
                                    key={item?.cart_id}
                                    cartId={item?.cart_id}
                                    productId={item?.product_id}
                                    imgName={item?.image_url || sofa}
                                    price={item?.price}
                                    quantity={item?.quantity || 1}
                                    productName={item?.product_name}
                                    removeProduct={removeProduct}
                                    color={item?.color}
                                    size={item?.size}
                                />
                            ))}

                            {/* Cart Total */}
                            <CartTotal totalAmount={totalAmount} handleCheckout={handleCheckout} />
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
