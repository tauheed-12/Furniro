import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
    const { token } = useParams(); // token from URL
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (newPassword !== confirmPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/auth/reset-password`, {
                token,
                newPassword,
            });
            setSuccessMsg(response.data.message);
            setTimeout(() => {
                navigate("/signIn");
            }, 2000); // redirect after 2 seconds
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Reset Password</h2>
                <p className="text-center text-gray-600 mb-6">
                    Enter your new password below to reset your account password.
                </p>

                {successMsg && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">{successMsg}</div>
                )}

                {errorMsg && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{errorMsg}</div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordPage;
