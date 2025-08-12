import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShoppingCart from '../components/ShoppingCart';

const RootPage = () => {
    const [cartModelOpen, setCartModelOpen] = useState(false);

    return (
        <div className={`relative ${cartModelOpen ? 'overflow-hidden' : ''}`}>
            <Navbar setCartModelOpen={setCartModelOpen} />
            {cartModelOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-40" />
                    <ShoppingCart setCartModelOpen={setCartModelOpen} />
                </>
            )}
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootPage;
