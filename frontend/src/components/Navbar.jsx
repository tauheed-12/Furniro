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
        console.log(state.auth, "navbar error sala")
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
                {['Home', 'Shop', 'Blog', 'Contact'].map((link, index) => (
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
                <div className='bg-primary text-white absolute top-0 right-0 h-[100vh] w-2/3 px-6 py-8'>
                    <FiX className='absolute top-4 right-4 text-2xl font-bold cursor-pointer' onClick={() => setNavbarOpen(false)} />
                    <nav className='flex flex-col justify-start items-start w-full gap-4 mt-10'>
                        {['Home', 'Shop', 'Blog', 'Contact'].map((link, index) => (
                            <NavLink
                                key={index}
                                to={`${link === 'Home' ? '/' : '/' + link.toLowerCase()}`}
                                className={({ isActive }) => isActive ? 'text-text-secondary' : 'text-white'}
                                onClick={() => setNavbarOpen(false)}
                            >
                                {link}
                            </NavLink>
                        ))}
                        {user.token && <CgProfile className='cursor-pointer' />}
                        {user.token && <CiHeart className='cursor-pointer' />}
                        <CiSearch className='cursor-pointer' />
                        {user.token &&
                            <NavLink to='/cart'>
                                <CiShoppingCart className='text-xl' />
                            </NavLink>}
                        {!user.token ? (
                            <>
                                <NavLink
                                    to="/signIn"
                                    className={({ isActive }) => isActive ? 'text-text-secondary' : 'text-white'}
                                    onClick={() => setNavbarOpen(false)}
                                >
                                    <button className='px-6 py-2 rounded-xl border-2 border-solid'>SignIn</button>
                                </NavLink>
                                <NavLink
                                    to="/signup"
                                    className={({ isActive }) => isActive ? 'text-text-secondary' : 'text-white'}
                                    onClick={() => setNavbarOpen(false)}
                                >
                                    Signup
                                </NavLink>
                            </>
                        ) : (
                            <NavLink
                                to="/logout"
                                className={({ isActive }) => isActive ? 'text-text-secondary' : 'text-white'}
                                onClick={() => setNavbarOpen(false)}
                            >
                                Logout
                            </NavLink>
                        )}
                    </nav>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
