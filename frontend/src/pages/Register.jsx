import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { registerUser } from '../slices/registerSlice';
import { useDispatch } from 'react-redux';
import { showNotification } from '../slices/notificationSlice';
import { useSelector } from 'react-redux';

const Register = () => {
    const [registerInfo, setRegisterInfo] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { status } = useSelector(state => state.register);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterInfo({
            ...registerInfo,
            [name]: value
        });
    };

    function verifyInputs() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (registerInfo.password !== registerInfo.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        if (!passwordRegex.test(registerInfo.password)) {
            setError("Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.");
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        if (verifyInputs()) {
            try {
                await dispatch(registerUser(registerInfo)).unwrap();
                dispatch(showNotification({
                    type: 'success',
                    message: 'registration successful please verify email!'
                }));
            } catch (err) {
                dispatch(showNotification({ type: 'error', message: `Registration failed: ${err}` }));
            }
        }
    };


    return (
        <div>
            <Hero title={'SignUp'} />
            <div className='flex justify-center items-center py-16 px-4'>
                <div className='flex flex-col py-10 w-full max-w-md'>
                    <div className='flex flex-row justify-between items-center mb-4'>
                        <span className='text-xl font-semibold'>Sign Up</span>
                        <Link to='/signIn' className='text-blue-500 hover:underline'>Login if already a user</Link>
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
                        <button
                            type='submit'
                            disabled={status === 'loading'}
                            className='self-center px-6 py-2 mt-5 bg-black text-white rounded-2xl hover:bg-gray-800 transition duration-300'>
                            {status === 'loading' ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                    <div className='text-center'>
                        <Link to='/signIn' className='text-blue-500 hover:underline'>Existing User?</Link>
                    </div>
                </div>
            </div>
            <Features />
        </div>
    );
};

export default Register;
