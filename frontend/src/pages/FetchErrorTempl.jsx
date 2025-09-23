import React from 'react';
import errorImg from '../assets/dogesh.jpeg'; // optional placeholder image

const FetchError = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col justify-center items-center text-center p-6">
            {errorImg && (
                <img
                    src={errorImg}
                    alt="Error"
                    className="w-40 h-40 mb-4 object-contain bg-white"
                />
            )}
            <h2 className="text-xl font-semibold text-red-700 mb-2">Oops!</h2>
            <p className="text-red-600 mb-4">{message || "Something went wrong while fetching the data."}</p>
        </div>
    );
};

export default FetchError;
