import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart, CiHeart, CiSearch } from "react-icons/ci";
import { useAuth } from '../Context/AuthContext';
import { FiAlignJustify, FiX } from "react-icons/fi";

const Navbar = () => {
    const navigate = useNavigate();
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const {userId} = useAuth();

    const handleLogout = ()=>{
        function deleteCookie(name) {
            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    
        deleteCookie('token');
        deleteCookie('userId');
        deleteCookie('isAdmin');  
        navigate('/signIn')
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
                {userId && <CgProfile className='cursor-pointer' />}
                {userId && <CiHeart className='cursor-pointer' />}
                <CiSearch className='cursor-pointer' />
                {userId &&
                    <NavLink to='/cart'>
                        <CiShoppingCart className='text-xl' />
                    </NavLink>}

                {userId &&
                    <NavLink
                        to={`/${userId}/orders`}
                        className={({ isActive }) => isActive ? 'text-text-secondary' : 'text-black'}>
                        Your Orders
                    </NavLink>}

                {!userId ? (
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
                    <button onClick={handleLogout}>
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
                        {userId && <CgProfile className='cursor-pointer' />}
                        {userId && <CiHeart className='cursor-pointer' />}
                        <CiSearch className='cursor-pointer' />
                        {userId &&
                            <NavLink to='/cart'>
                                <CiShoppingCart className='text-xl' />
                            </NavLink>}
                        {!userId ? (
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
