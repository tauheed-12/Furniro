// Loader.jsx
import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
