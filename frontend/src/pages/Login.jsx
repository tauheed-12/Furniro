import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { showNotification } from '../slices/notificationSlice';
import { useNavigate, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status } = useSelector(state => state.auth);

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(loginInfo)).unwrap();
            dispatch(showNotification({ type: 'success', message: 'Login successful!' }));
            navigate('/');
        } catch (err) {
            dispatch(showNotification({ type: 'error', message: `Login failed: ${err}` }));
        }
    };

    return (
        <div>
            <Hero title="SignIn" />
            <div className='flex justify-center items-center py-16 px-4'>
                <div className='flex flex-col py-10 w-full max-w-md'>
                    <div className='flex justify-between items-center mb-4'>
                        <span className='text-xl font-semibold'>Sign In</span>
                        <Link to='/signup' className='text-blue-500 hover:underline'>Create a new account</Link>
                    </div>
                    <form className='flex flex-col w-full my-5 text-lg' onSubmit={handleSubmit}>
                        <div className='flex rounded-lg border border-gray-300 items-center px-5 py-2 gap-2 mt-4'>
                            <FaRegUser className='text-gray-500' />
                            <input
                                type='email'
                                name='email'
                                value={loginInfo.email}
                                onChange={handleChange}
                                placeholder='Email Address'
                                className='w-full p-2 focus:outline-none'
                                required
                            />
                        </div>
                        <div className='flex rounded-lg border border-gray-300 items-center px-5 py-2 gap-2 mt-4'>
                            <RiLockPasswordFill className='text-gray-500' />
                            <input
                                type='password'
                                name='password'
                                value={loginInfo.password}
                                onChange={handleChange}
                                placeholder='Password'
                                className='w-full p-2 focus:outline-none'
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            disabled={status === 'loading'}
                            className='self-center px-6 py-2 mt-5 bg-black text-white rounded-2xl hover:bg-gray-800 transition duration-300'>
                            {status === 'loading' ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <div className='text-center'>
                        <Link to='/forget-password' className='text-blue-500 hover:underline'>Forgot Password?</Link>
                    </div>
                </div>
            </div>
            <Features />
        </div>
    );
};

export default Login;
