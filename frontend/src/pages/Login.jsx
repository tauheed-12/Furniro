import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post('http://localhost:8080/user/login', loginInfo);
            login(response.data.existingUser);
            localStorage.setItem('token', JSON.stringify(response.data.token));
            setSuccess("Login successful!");
            navigate('/')
        } catch (error) {
            setError("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div>
            <Hero title={'SignIn'} />
            <div className='flex justify-center items-center py-16 px-4'>
                <div className='flex flex-col py-10 w-full max-w-md'>
                    <div className='flex flex-row justify-between items-center mb-4'>
                        <span className='text-xl font-semibold'>Sign In</span>
                        <Link to='/signup' className='text-blue-500 hover:underline'>Create a new account</Link>
                    </div>
                    <form className='flex flex-col w-full my-5 text-lg' onSubmit={handleSubmit}>
                        <div className='flex flex-row rounded-lg border-[1px] border-solid border-gray-300 justify-start items-center px-5 py-2 gap-2 mt-4'>
                            <FaRegUser className='text-gray-500' />
                            <input
                                type='email'
                                name='email'
                                value={loginInfo.email}
                                placeholder='Email Address'
                                className='focus:outline-none w-full p-2'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex flex-row rounded-lg border-[1px] border-solid border-gray-300 justify-start items-center px-5 py-2 gap-2 mt-4'>
                            <RiLockPasswordFill className='text-gray-500' />
                            <input
                                type='password'
                                name='password'
                                value={loginInfo.password}
                                placeholder='Password'
                                className='focus:outline-none w-full p-2'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
                        <button
                            type='submit'
                            className='self-center px-6 py-2 text-lg mt-5 bg-black text-white rounded-2xl hover:bg-gray-800 transition duration-300'>
                            Sign In
                        </button>
                    </form>
                    <div className='text-center'>
                        <Link to='/forgotpassword' className='text-blue-500 hover:underline'>Forgot Password?</Link>
                    </div>
                </div>
            </div>
            <Features />
        </div>
    );
}

export default Login;
