import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, clearVerifyState } from '../slices/registerSlice';
import { showNotification } from '../slices/notificationSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const VerifyMail = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { verifyStatus, verifySuccess, verifyError } = useSelector((state) => state.register);

    useEffect(() => {
        if (token) {
            dispatch(verifyEmail(token));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (verifyStatus === 'succeeded') {
            dispatch(showNotification({ type: 'success', message: verifySuccess }));
            setTimeout(() => {
                dispatch(clearVerifyState());
                navigate('/signIn');
            }, 2000);
        }

        if (verifyStatus === 'failed') {
            dispatch(showNotification({ type: 'error', message: verifyError }));
        }
    }, [verifyStatus, dispatch, verifySuccess, verifyError, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Email Verification</h2>

                {verifyStatus === 'loading' && (
                    <p className="text-indigo-600 font-medium animate-pulse">Verifying your email...</p>
                )}

                {verifyStatus === 'succeeded' && (
                    <div className="flex flex-col items-center gap-3 text-green-600">
                        <FaCheckCircle className="text-4xl" />
                        <p className="text-lg font-medium">{verifySuccess}</p>
                        <p className="text-sm text-gray-500">Redirecting to Sign In...</p>
                    </div>
                )}

                {verifyStatus === 'failed' && (
                    <div className="flex flex-col items-center gap-3 text-red-600">
                        <FaExclamationCircle className="text-4xl" />
                        <p className="text-lg font-medium">{verifyError}</p>
                        <button
                            onClick={() => dispatch(verifyEmail(token))}
                            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-xl transition-all"
                        >
                            Retry Verification
                        </button>
                    </div>
                )}

                {verifyStatus === 'idle' && (
                    <p className="text-gray-600">Preparing to verify your email...</p>
                )}
            </div>
        </div>
    );
};

export default VerifyMail;
