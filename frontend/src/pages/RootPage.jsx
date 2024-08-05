import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShoppingCart from '../components/ShoppingCart';

const RootPage = () => {
    const [cartModelOpen, setcartModelOpen] = useState(false);
    return (
        <div className={`relative ${cartModelOpen ? 'opacity-100' : ''}`}>
            <Navbar setcartModelOpen={setcartModelOpen} />
            {cartModelOpen && <ShoppingCart setcartModelOpen={setcartModelOpen} />}
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootPage;
