import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { useCheckout } from '../Context/CheckoutContext';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const inputCss = 'border-solid border-[1px] border-black text-lg px-5 py-2 rounded-lg w-full';
    const labelCss = 'text-lg font-semibold mb-2';
    const inputDivCss = 'flex flex-col justify-start items-start mb-4';
    const { userData } = useAuth();
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
    const { totalCheckoutValue, productIds } = useCheckout();
    const [paymentMethod, setPaymentMethod] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBillingDetails({
            ...billingDetails,
            [name]: value
        });
    };

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
        const productsDetails = userData.cart;
        console.log(productsDetails);
        const userId = userData._id;
        const token = localStorage.getItem('token');
        console.log(billingDetails, productsDetails, userId, paymentMethod);
        try {
            if (totalCheckoutValue == 0) {
                const response = await axios.post('http://localhost:8080/product/checkout', {
                    billingDetails,
                    productsDetails,
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
                <form className='flex-1 flex flex-col gap-5' onSubmit={handleFormSubmit}>
                    <div className='flex flex-row justify-between items-center gap-5'>
                        <div className={inputDivCss}>
                            <label className={labelCss}>First Name</label>
                            <input
                                type='text'
                                value={billingDetails.firstName}
                                onChange={handleChange}
                                name='firstName'
                                className={inputCss}
                                required
                            />
                        </div>
                        <div className={inputDivCss}>
                            <label className={labelCss}>Last Name</label>
                            <input
                                name='lastName'
                                value={billingDetails.lastName}
                                type='text'
                                onChange={handleChange}
                                className={inputCss}
                                required
                            />
                        </div>
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Company Name</label>
                        <input
                            type='text'
                            value={billingDetails.companyName}
                            name='companyName'
                            onChange={handleChange}
                            className={inputCss}
                        />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Country</label>
                        <input
                            type='text'
                            value={billingDetails.country}
                            name='country'
                            onChange={handleChange}
                            className={inputCss}
                            required
                        />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Street Address</label>
                        <input
                            type='text'
                            value={billingDetails.streetAddress}
                            name='streetAddress'
                            onChange={handleChange}
                            className={inputCss}
                            required
                        />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>City</label>
                        <input
                            type='text'
                            value={billingDetails.city}
                            name='city'
                            onChange={handleChange}
                            className={inputCss}
                            required
                        />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Province</label>
                        <input
                            type='text'
                            name='province'
                            onChange={handleChange}
                            value={billingDetails.province}
                            className={inputCss}
                            required
                        />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>ZIP code</label>
                        <input
                            type='text'
                            value={billingDetails.zipCode}
                            name='zipCode'
                            onChange={handleChange}
                            className={inputCss}
                            required
                        />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Email Address</label>
                        <input
                            type='email'
                            value={billingDetails.emailAddress}
                            name='emailAddress'
                            onChange={handleChange}
                            className={inputCss}
                            required
                        />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Additional Information</label>
                        <input
                            type='text'
                            value={billingDetails.additionalInfo}
                            name='additionalInfo'
                            onChange={handleChange}
                            className={inputCss}
                        />
                    </div>
                    <div className='mt-4'>
                        <div className='flex items-center'>
                            <input
                                type='radio'
                                name='paymentMethod'
                                value='bankTransfer'
                                onChange={handlePaymentMethodChange}
                                required
                            />
                            <p className='ml-2 text-lg font-semibold'>Direct Bank Transfer</p>
                        </div>
                        <div className='flex items-center mt-4'>
                            <input
                                type='radio'
                                name='paymentMethod'
                                value='cashOnDelivery'
                                onChange={handlePaymentMethodChange}
                                required
                            />
                            <p className='ml-2 text-lg font-semibold'>Cash On Delivery</p>
                        </div>
                    </div>
                    {error && <div className='text-red-500'>{error}</div>}
                    <button
                        type='submit'
                        disabled={loading}
                        className='self-center px-7 text-lg py-2 border-2 border-black rounded-2xl mt-8 hover:bg-primary hover:text-white'
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </form>
                <div className='flex-1 ml-10'>
                    <div className='flex flex-col gap-4 mt-4'>
                        <div className='flex justify-between'>
                            <span className='font-semibold'>Subtotal</span>
                            <span className='text-text-primary font-semibold'>{totalCheckoutValue}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className='font-semibold'>Total</span>
                            <span className='text-text-secondary'>{totalCheckoutValue}</span>
                        </div>
                    </div>
                    <div className='mt-4 text-text-primary text-lg'>
                        Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
                    </div>
                </div>
            </div>
            <Features />
        </div>
    );
};

export default Checkout;
