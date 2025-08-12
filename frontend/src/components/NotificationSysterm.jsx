import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../slices/notificationSlice';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const typeStyles = {
    success: {
        icon: <FaCheckCircle className="text-green-600" />,
        bg: "bg-green-100",
        border: "border-green-500",
    },
    error: {
        icon: <FaTimesCircle className="text-red-600" />,
        bg: "bg-red-100",
        border: "border-red-500",
    },
    info: {
        icon: <FaInfoCircle className="text-blue-600" />,
        bg: "bg-blue-100",
        border: "border-blue-500",
    },
};

const Notification = () => {
    const dispatch = useDispatch();
    const { isVisible, message, type } = useSelector(state => state.notification);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                dispatch(hideNotification());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, dispatch]);

    if (!isVisible) return null;

    const style = typeStyles[type] || typeStyles.info;

    return (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 shadow-lg rounded-lg px-5 py-3 border-l-4 ${style.bg} ${style.border}`}>
            {style.icon}
            <span className="text-sm font-medium">{message}</span>
            <button onClick={() => dispatch(hideNotification())} className="ml-4 text-gray-700 hover:text-black">
                <FaTimes />
            </button>
        </div>
    );
};

export default Notification;
