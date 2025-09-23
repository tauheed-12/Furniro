import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckoutTotal from '../components/CheckoutTotal';
import CheckoutForm from '../components/CheckoutForm';
import { setBillingDetails, setPaymentMethod } from '../slices/paymentSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../helper/helper';
import Loader from '../components/Loader';
import { showNotification } from '../slices/notificationSlice';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputCss = 'border-solid border-[1px] border-black text-lg px-5 py-2 rounded-lg w-full';
    const labelCss = 'text-lg font-semibold mb-2';
    const inputDivCss = 'flex flex-col justify-start items-start mb-4';
    const userId = getCookie('userId');
    const token = getCookie('token');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { totalCheckoutValue } = useSelector(state => state.checkout);
    const { billingDetails, payMethod } = useSelector(state => state.payment);

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch(setBillingDetails({
            ...billingDetails,
            [name]: value
        }));
    };

    const handlePaymentMethodChange = (event) => {
        dispatch(setPaymentMethod(event.target.value));
    };

    const validateForm = () => {
        const requiredFields = ['firstName', 'lastName', 'country', 'streetAddress', 'city', 'province', 'zipCode', 'emailAddress'];
        for (const field of requiredFields) {
            if (!billingDetails[field]) {
                return false;
            }
        }
        if (!payMethod) {
            return false;
        }
        return true;
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            setError('Please fill in all required fields and select a payment method.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            if (totalCheckoutValue !== 0) {
                if (payMethod === "bankTransfer") {
                    navigate('/stripe/checkout');
                } else {
                    await axios.post(`http://localhost:8080/product/checkout`, {
                        billingDetails,
                        userId,
                        payMethod
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    dispatch(showNotification({ type: 'success', message: 'Order placed successfully!' }));
                    navigate('/success');
                }
            } else {
                dispatch(showNotification({ type: 'error', message: 'Nothing to checkout!!' }));
                setLoading(false);
            }
        } catch (error) {
            dispatch(showNotification({ type: 'error', message: 'An error occurred during checkout. Please try again.' }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Hero title={'Checkout'} />
            {loading ? <Loader /> :
                <>
                    <h2 className='text-3xl font-bold text-center mt-12'>Billing Details</h2>
                    <div className='flex flex-col md:flex-row justify-between px-10 py-10 gap-10'>
                        <CheckoutForm handleChange={handleChange} handleFormSubmit={handleFormSubmit}
                            error={error} inputCss={inputCss} inputDivCss={inputDivCss} labelCss={labelCss}
                            billingDetails={billingDetails} handlePaymentMethodChange={handlePaymentMethodChange}
                            loading={loading}
                        />
                        <CheckoutTotal totalCheckoutValue={totalCheckoutValue} />
                    </div>
                    <Features />
                </>
            }
        </div>
    );
};

export default Checkout;
