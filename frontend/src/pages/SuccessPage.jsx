import React, { useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";

const SuccessPage = () => {
    const [showModal, setShowModal] = useState(true);

    return (
        <div>
            <Hero />
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] md:w-[500px] text-center">
                        <h1 className="text-xl font-semibold mb-4">
                            🎉 Congratulations!
                        </h1>
                        <p className="text-gray-700 mb-6">
                            Your order has been placed successfully.
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <Features />
        </div>
    );
};

export default SuccessPage;
