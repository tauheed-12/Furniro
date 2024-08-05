import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [registerInfo, setRegisterInfo] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterInfo({
            ...registerInfo,
            [name]: value
        });
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    // const handleOtpSend = async () => {
    //     try {
    //         await axios.post('http://localhost:8080/user/send-otp', { email: registerInfo.email });
    //         setOtpSent(true);
    //         setError("");
    //     } catch (error) {
    //         setError("Failed to send OTP. Please try again.");
    //     }
    // };

    const handleOtpVerify = async () => {
        try {
            await axios.post('http://localhost:8080/user/verifyOtp', { email: registerInfo.email, otp });
            setIsVerified(true);
            setError("");
            setSuccess("Email verified successfully!");
            navigate('/signin');
        } catch (error) {
            setError("Invalid OTP. Please try again.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (registerInfo.password !== registerInfo.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!passwordRegex.test(registerInfo.password)) {
            setError("Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/user/register', registerInfo);
            console.log(response);
            setSuccess("Please verify yourself.");
            setOtpSent(true);
        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    };


    return (
        <div>
            <Hero title={'SignUp'} />
            <div className='flex justify-center items-center py-16 px-4'>
                <div className='flex flex-col py-10 w-full max-w-md'>
                    <div className='flex flex-row justify-between items-center mb-4'>
                        <span className='text-xl font-semibold'>Sign Up</span>
                        <Link to='/signin' className='text-blue-500 hover:underline'>Login if already a user</Link>
                    </div>
                    <form className='flex flex-col w-full my-5 text-lg' onSubmit={handleSubmit}>
                        <div>
                            <div className='flex flex-row rounded-lg border-[1px] border-solid border-gray-300 justify-start items-center px-5 py-2 gap-2 mt-4'>
                                <FaRegUser className='text-gray-500' />
                                <input
                                    type='email'
                                    name='email'
                                    value={registerInfo.email}
                                    placeholder='Email Address'
                                    onChange={handleChange}
                                    className='focus:outline-none w-full p-2'
                                    required
                                />
                            </div>
                            {otpSent && (
                                <div className='flex flex-row rounded-lg border-[1px] border-solid border-gray-300 justify-start items-center px-5 py-2 gap-2 mt-4'>
                                    <input
                                        type='text'
                                        value={otp}
                                        placeholder='Enter the OTP sent to your email'
                                        onChange={handleOtpChange}
                                        className='focus:outline-none w-full p-2'
                                    />
                                    <button type='button' onClick={handleOtpVerify} className='bg-blue-500 text-white px-4 py-2 rounded'>
                                        Verify OTP
                                    </button>
                                </div>
                            )}
                            {/* {!otpSent && (
                                <button type='button' onClick={handleOtpSend} className='bg-blue-500 text-white px-4 py-2 rounded mt-4'>
                                    Send OTP
                                </button>
                            )} */}
                        </div>
                        <div className='flex flex-row rounded-lg border-[1px] border-solid border-gray-300 justify-start items-center px-5 py-2 gap-2 mt-4'>
                            <RiLockPasswordFill className='text-gray-500' />
                            <input
                                type='password'
                                name='password'
                                value={registerInfo.password}
                                placeholder='Password'
                                onChange={handleChange}
                                className='focus:outline-none w-full p-2'
                                required
                            />
                        </div>
                        <div className='flex flex-row rounded-lg border-[1px] border-solid border-gray-300 justify-start items-center px-5 py-2 gap-2 mt-4'>
                            <RiLockPasswordFill className='text-gray-500' />
                            <input
                                type='password'
                                name='confirmPassword'
                                value={registerInfo.confirmPassword}
                                onChange={handleChange}
                                placeholder='Confirm Password'
                                className='focus:outline-none w-full p-2'
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
                        <button type='submit' className='self-center px-6 py-2 text-lg mt-5 bg-black text-white rounded-2xl hover:bg-gray-800 transition duration-300'>
                            Sign Up
                        </button>
                    </form>
                    <div className='text-center'>
                        <Link to='/signin' className='text-blue-500 hover:underline'>Existing User?</Link>
                    </div>
                </div>
            </div>
            <Features />
        </div>
    );
};

export default Register;
