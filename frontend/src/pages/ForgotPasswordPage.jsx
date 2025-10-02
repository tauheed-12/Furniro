import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/auth/forgot-password`, { email });
            setSuccessMsg(response.data.message);
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Something went wrong. Try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Forgot Password</h2>
                <p className="text-center text-gray-600 mb-6">
                    Enter your registered email address. We'll send you a link to reset your password.
                </p>

                {successMsg && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{successMsg}</div>
                )}

                {errorMsg && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{errorMsg}</div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-500 text-sm">
                    Remembered your password?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
