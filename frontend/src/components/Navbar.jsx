import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart, CiHeart, CiSearch } from "react-icons/ci";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { showNotification } from '../slices/notificationSlice';

const Navbar = () => {
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => {
        return state.auth
    });

    const HandleLogout = () => {
        dispatch(logout());
        dispatch(showNotification({ type: 'success', message: 'Logged out successfully!' }));
        navigate('/signIn');
    }

    return (
        <nav className='px-8 py-4 flex justify-between items-center text-xl w-full relative'>
            <div className='flex-1 flex justify-start items-center gap-2'>
                <img src={logo} alt='logo' className='h-10' />
                <span className='font-bold text-2xl'>Furniro</span>
            </div>
            <FiAlignJustify className='lg:hidden cursor-pointer text-2xl' onClick={() => setNavbarOpen(true)} />
            <div className='flex-1 hidden lg:flex justify-between items-center'>
                {['Home', 'Shop', 'Contact'].map((link, index) => (
                    <NavLink
                        key={index}
                        to={`${link === 'Home' ? '/' : '/' + link.toLowerCase()}`}
                        className={({ isActive }) => isActive ? 'text-text-secondary' : 'text-black'}
                    >
                        {link}
                    </NavLink>
                ))}
            </div>
            <div className='flex-1 hidden lg:flex justify-center items-center gap-6'>
                {user.token && <CgProfile className='cursor-pointer' />}
                {user.token && <CiHeart className='cursor-pointer' />}
                <CiSearch className='cursor-pointer' />
                {user.token &&
                    <NavLink to='/cart'>
                        <CiShoppingCart className='text-xl' />
                    </NavLink>}

                {user.token &&
                    <NavLink
                        to={`/${user.userId}/orders`}
                        className={({ isActive }) => isActive ? 'text-text-secondary' : 'text-black'}>
                        Your Orders
                    </NavLink>}

                {!user.token ? (
                    <>
                        <NavLink
                            to="/signIn"
                            className={({ isActive }) => isActive ? 'text-text-secondary' : 'text-black'}
                        >
                            <button className='px-6 py-2 rounded-xl border-2 border-solid'>SignIn</button>
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className={({ isActive }) => isActive ? 'text-text-secondary' : 'text-black'}
                        >
                            Signup
                        </NavLink>
                    </>
                ) : (
                    <button onClick={HandleLogout}>
                        Logout
                    </button>
                )}
            </div>
            {isNavbarOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setNavbarOpen(false)}
                    ></div>

                    {/* Sidebar */}
                    <div className="fixed top-0 right-0 h-full w-2/3 max-w-xs bg-primary text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
                        {/* Close Button */}
                        <FiX
                            className="absolute top-4 right-4 text-3xl font-bold cursor-pointer hover:text-text-secondary transition"
                            onClick={() => setNavbarOpen(false)}
                        />

                        {/* Logo */}
                        <div className="flex items-center gap-2 px-6 mt-6">
                            <img src={logo} alt="logo" className="h-8" />
                            <span className="font-bold text-xl">Furniro</span>
                        </div>

                        {/* Links */}
                        <nav className="flex flex-col justify-start items-start w-full gap-6 mt-10 px-6">
                            {['Home', 'Shop', 'Contact'].map((link, index) => (
                                <NavLink
                                    key={index}
                                    to={`${link === 'Home' ? '/' : '/' + link.toLowerCase()}`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 text-lg transition hover:text-text-secondary ${isActive ? 'text-yellow-100 font-semibold' : 'text-white'
                                        }`
                                    }
                                    onClick={() => setNavbarOpen(false)}
                                >
                                    {link}
                                </NavLink>
                            ))}
                            {user.token &&
                                <NavLink
                                    to={`/${user.userId}/orders`}
                                    className={({ isActive }) => isActive ? 'text-yellow-100 font-semibold' : 'text-white'}>
                                    Your Orders
                                </NavLink>
                            }
                            {/* Divider */}
                            <hr className="w-full border-white/20 my-4" />

                            {/* Icons Section */}
                            <div className="flex gap-5 text-2xl">
                                {user.token && <CgProfile className="cursor-pointer hover:text-text-secondary" />}
                                {user.token && <CiHeart className="cursor-pointer hover:text-text-secondary" />}
                                <CiSearch className="cursor-pointer hover:text-text-secondary" />
                                {user.token && (
                                    <NavLink to="/cart" onClick={() => setNavbarOpen(false)}>
                                        <CiShoppingCart className="cursor-pointer hover:text-text-secondary" />
                                    </NavLink>
                                )}
                            </div>

                            {/* Auth Buttons */}
                            <div className="mt-6 flex flex-col gap-4 w-full">
                                {!user.token ? (
                                    <>
                                        <NavLink
                                            to="/signIn"
                                            onClick={() => setNavbarOpen(false)}
                                        >
                                            <button className="w-full px-6 py-2 rounded-xl border-2 border-white hover:bg-white hover:text-primary transition">
                                                Sign In
                                            </button>
                                        </NavLink>
                                        <NavLink
                                            to="/signup"
                                            onClick={() => setNavbarOpen(false)}
                                            className="text-lg text-white hover:text-text-secondary transition"
                                        >
                                            Signup
                                        </NavLink>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            HandleLogout();
                                            setNavbarOpen(false);
                                        }}
                                        className="w-full px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>
                        </nav>
                    </div>
                </>
            )}
        </nav>
    );
}

export default Navbar;
