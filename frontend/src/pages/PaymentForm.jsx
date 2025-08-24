import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../helper/helper";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const userId = getCookie('userId');
    const token = getCookie('token');
    const navigate = useNavigate();
    const { billingDetails, payMethod } = useSelector(state => state.payment);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod;
            const response = await fetch(`{process.env.BACKEND_URI}/product/create-payment-intent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: 100,
                    payment_method: id,
                }),
            });
            const data = await response.json();
            if (data.error) {
                setMessage(`Payment failed: ${data.error.message}`);
            } else {
                const response = await axios.post('http://localhost:8080/product/checkout', {
                    billingDetails,
                    userId,
                    payMethod
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                navigate('/success');
                setMessage("Payment successful!");
            }
        } else {
            setMessage(`Payment error: ${error.message}`);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>Complete Your Payment</h2>
            <div style={styles.cardInput}>
                <CardElement options={{ style: cardStyle }} />
            </div>
            <button type="submit" disabled={!stripe || loading} style={styles.button}>
                {loading ? "Processing..." : "Pay Now"}
            </button>
            {message && <div style={styles.message}>{message}</div>}
        </form>
    );
};

const cardStyle = {
    base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
            color: "#aab7c4",
        },
    },
    invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
    },
};

const styles = {
    form: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
        fontSize: "24px",
    },
    cardInput: {
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
        marginBottom: "20px",
    },
    button: {
        width: "100%",
        padding: "12px",
        borderRadius: "4px",
        backgroundColor: "#28a745",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#218838",
    },
    message: {
        marginTop: "20px",
        textAlign: "center",
        color: "#ff0000",
    },
};

export default PaymentForm;
