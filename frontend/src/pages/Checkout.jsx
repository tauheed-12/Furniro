import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckoutTotal from '../components/CheckoutTotal';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../helper/helper';
import Loader from '../components/Loader';
import { showNotification } from '../slices/notificationSlice';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.cart);

    const productIds = [];
    const prices = [];
    const quantities = [];

    items.forEach(item => {
        productIds.push(item.product_id);
        prices.push(item.price);
        quantities.push(item.quantity);
    });

    const userId = getCookie('userId');
    const token = getCookie('token');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [payMethod, setPayMethod] = useState(null);
    const [newAddress, setNewAddress] = useState({
        address_type: 'billing',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        phone_number: '',
        is_primary: false
    });

    const { totalCheckoutValue } = useSelector(state => state.checkout);

    // Fetch user saved addresses
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/user/address/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAddresses(data);
            } catch (err) {
                console.error(err);
                dispatch(showNotification({ type: 'error', message: 'Unable to load addresses!' }));
            }
        };
        fetchAddresses();
    }, [userId, token, dispatch]);

    const handleAddressChange = (e) => {
        setSelectedAddressId(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setPayMethod(e.target.value);
    };

    const handleNewAddressChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAddress(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const saveNewAddress = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/user/address/${userId}`, newAddress, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAddresses([...addresses, data]);
            setShowModal(false);
            dispatch(showNotification({ type: 'success', message: 'Address added successfully!' }));
        } catch (err) {
            console.error(err);
            dispatch(showNotification({ type: 'error', message: 'Failed to save address!' }));
        }
    };

    const handleCheckout = async () => {
        if (!selectedAddressId) {
            setError('Please select or add an address.');
            return;
        }
        if (!payMethod) {
            setError('Please select a payment method.');
            return;
        }
        setLoading(true);
        try {
            if (totalCheckoutValue === 0) {
                dispatch(showNotification({ type: 'error', message: 'Nothing to checkout!!' }));
                setLoading(false);
                return;
            }
            if (payMethod === 'bankTransfer') {
                navigate('/stripe/checkout');
            } else {
                await axios.post(`${process.env.REACT_APP_BACKEND_URI}/product/checkout`, {
                    userId,
                    productIds,
                    addressId: selectedAddressId,
                    prices,
                    modOfPayment: payMethod,
                    quantities
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(showNotification({ type: 'success', message: 'Order placed successfully!' }));
                navigate('/success');
            }
        } catch (err) {
            console.error(err);
            dispatch(showNotification({ type: 'error', message: 'Checkout failed!' }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Hero title="Checkout" />
            {loading ? <Loader /> : (
                <>
                    <h2 className="text-3xl font-bold text-center mt-12">Select Address</h2>

                    <div className="flex flex-col md:flex-row justify-between px-10 py-10 gap-10">
                        <div className="w-full md:w-2/3">
                            {error && <p className="text-red-500 mb-4">{error}</p>}

                            {/* Saved addresses */}
                            <div className="mb-6">
                                {addresses.map(addr => (
                                    <label key={addr.id} className="block border p-4 rounded-lg mb-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="address"
                                            value={addr.id}
                                            checked={selectedAddressId === addr.id}
                                            onChange={handleAddressChange}
                                            className="mr-3"
                                        />
                                        <span>{addr.address_line1}, {addr.city}, {addr.country} ({addr.postal_code})</span>
                                    </label>
                                ))}
                            </div>

                            {/* Add new address button */}
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                onClick={() => setShowModal(true)}
                            >
                                + Add New Address
                            </button>

                            {/* Payment method */}
                            <div className="mt-6">
                                <h3 className="font-semibold mb-2">Payment Method</h3>
                                <label className="block mb-2">
                                    <input type="radio" name="payment" value="cod" onChange={handlePaymentMethodChange} /> Cash on Delivery
                                </label>
                                {/* <label>
                                    <input type="radio" name="payment" value="bankTransfer" onChange={handlePaymentMethodChange} /> Bank Transfer
                                </label> */}
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg mt-6"
                            >
                                Place Order
                            </button>
                        </div>

                        <CheckoutTotal totalCheckoutValue={totalCheckoutValue} />
                    </div>

                    <Features />

                    {/* Modal for new address */}
                    {showModal && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg w-1/2">
                                <h3 className="text-xl font-bold mb-4">Add New Address</h3>
                                <form onSubmit={saveNewAddress}>
                                    <input type="text" name="address_line1" placeholder="Street Address" onChange={handleNewAddressChange} className="border p-2 w-full mb-2" required />
                                    <input type="text" name="address_line2" placeholder="Address Line 2" onChange={handleNewAddressChange} className="border p-2 w-full mb-2" />
                                    <input type="text" name="city" placeholder="City" onChange={handleNewAddressChange} className="border p-2 w-full mb-2" required />
                                    <input type="text" name="state" placeholder="State" onChange={handleNewAddressChange} className="border p-2 w-full mb-2" />
                                    <input type="text" name="postal_code" placeholder="Postal Code" onChange={handleNewAddressChange} className="border p-2 w-full mb-2" required />
                                    <input type="text" name="country" placeholder="Country" onChange={handleNewAddressChange} className="border p-2 w-full mb-2" required />
                                    <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleNewAddressChange} className="border p-2 w-full mb-2" />

                                    <label className="block mb-2">
                                        <input type="checkbox" name="is_primary" onChange={handleNewAddressChange} /> Set as Primary
                                    </label>

                                    <div className="flex justify-end gap-3 mt-4">
                                        <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Checkout;
