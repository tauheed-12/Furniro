import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { useCheckout } from '../Context/CheckoutContext';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckoutTotal from '../components/CheckoutTotal';
import CheckoutForm from '../components/CheckoutForm';

const Checkout = () => {
    const navigate = useNavigate();
    const inputCss = 'border-solid border-[1px] border-black text-lg px-5 py-2 rounded-lg w-full';
    const labelCss = 'text-lg font-semibold mb-2';
    const inputDivCss = 'flex flex-col justify-start items-start mb-4';
    const { userId } = useAuth();
    const [billingDetails, setBillingDetails] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        country: "",
        streetAddress: "",
        city: "",
        province: "",
        zipCode: "",
        emailAddress: "",
        additionalInfo: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { totalCheckoutValue } = useCheckout();
    const [paymentMethod, setPaymentMethod] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBillingDetails({
            ...billingDetails,
            [name]: value
        });
    };
    const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    if (!tokenCookie) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
    }

    const token = tokenCookie.split('=')[1];

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const validateForm = () => {
        const requiredFields = ['firstName', 'lastName', 'country', 'streetAddress', 'city', 'province', 'zipCode', 'emailAddress'];
        for (const field of requiredFields) {
            if (!billingDetails[field]) {
                return false;
            }
        }
        if (!paymentMethod) {
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
        console.log(billingDetails, userId, paymentMethod);
        try {
            if (totalCheckoutValue !== 0) {
                const response = await axios.post('http://localhost:8080/product/checkout', {
                    billingDetails,
                    userId,
                    paymentMethod
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                navigate('/success');
            } else {
                setError("Nothing to checkout!!");
            }
        } catch (error) {
            console.log('Error in checkout', error);
            setError('An error occurred during checkout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Hero title={'Checkout'} />
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
        </div>
    );
};

export default Checkout;
