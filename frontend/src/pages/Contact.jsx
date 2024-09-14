import React from 'react';
import { IoMdCall } from "react-icons/io";
import { TfiTimer } from "react-icons/tfi";
import { IoLocation } from "react-icons/io5";
import Features from '../components/Features';
import ContactDetails from '../components/ContactDetails';
import ContactForm from '../components/ContactForm';

const Contact = () => {

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
                    <ContactDetails font={IoLocation} title={"Address"} description={"236 5th SE Avenue, New York NY10000, United States"}/>
                    <ContactDetails font={IoMdCall} title={"Phone"} description={"Mobile: +(84) 546-6789"}/>
                    <ContactDetails font={TfiTimer} title={"Working Time"} description={"Monday-Friday: 9:00 - 22:00"}/>
                </div>
                <ContactForm/>
            </div>
            <Features />
        </div>
    );
};

export default Contact;
