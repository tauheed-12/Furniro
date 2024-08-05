import React from 'react';
import { IoMdCall } from "react-icons/io";
import { TfiTimer } from "react-icons/tfi";
import { IoLocation } from "react-icons/io5";
import Features from '../components/Features';

const Contact = () => {
    const inputCss = 'border-solid border-[1px] border-black text-lg px-5 py-2 rounded-xl w-full';
    const labelCss = 'text-lg font-semibold mb-2';
    const inputDivCss = 'flex flex-col justify-start items-start w-full';

    return (
        <div className='py-16 flex flex-col'>
            <div className='w-full flex flex-col justify-center items-center py-10 gap-3'>
                <h2 className='text-2xl font-semibold'>Get In Touch With Us</h2>
                <p className='text-text-primary w-10/12 md:w-2/4 text-center'>
                    For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                </p>
            </div>
            <div className='flex flex-col-reverse md:flex-row items-start justify-between gap-10 py-10 md:px-10 lg:px-20'>
                <div className='flex-1 flex flex-col justify-start items-center gap-6 px-6 md:pl-10 w-full'>
                    <div className='flex flex-row gap-3 items-start w-full'>
                        <span className='font-bold text-xl'><IoLocation /></span>
                        <div>
                            <span className='font-semibold text-lg'>Address</span>
                            <p>236 5th SE Avenue, New York NY10000, United States</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-3 items-start w-full'>
                        <span className='font-bold text-xl'><IoMdCall /></span>
                        <div>
                            <span className='font-semibold text-lg'>Phone</span>
                            <p>Mobile: +(84) 546-6789</p>
                            <p>Hotline: +(84) 456-6789</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-3 items-start w-full'>
                        <span className='font-bold text-xl'><TfiTimer /></span>
                        <div>
                            <span className='font-semibold text-lg'>Working Time</span>
                            <p>Monday-Friday: 9:00 - 22:00</p>
                            <p>Saturday-Sunday: 9:00 - 21:00</p>
                        </div>
                    </div>
                </div>
                <form className='flex-1 flex flex-col w-full px-6 md:pr-10 gap-6'>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Your name</label>
                        <input type='text' placeholder='abc' className={inputCss} />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Email address</label>
                        <input type='email' placeholder='abc@gmail.com' className={inputCss} />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Subject</label>
                        <input type='text' placeholder='This is optional' className={inputCss} />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Message</label>
                        <textarea placeholder="Hi, I'd like to ask about" className={inputCss} />
                    </div>
                    <button className='self-center px-7 text-lg py-2 border-2 border-black rounded-2xl mt-8 hover:bg-primary hover:text-white'>
                        Submit
                    </button>
                </form>
            </div>
            <Features />
        </div>
    );
};

export default Contact;
