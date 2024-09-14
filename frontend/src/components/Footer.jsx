import React from 'react';
import FooterLinkSection from './FooterLinkSection';


const Footer = () => {
    const linkSections = [
        {
            title: 'Links',
            links: ['Home', 'Shop', 'Blog', 'Contact'],
        },
        {
            title: 'Help',
            links: ['Payment Options', 'Return', 'Privacy Policy', 'Contact'],
        },
    ];

    return (
        <footer className='pt-16 pb-6 px-16 w-full flex flex-col gap-8'>
            <div className='flex flex-wrap justify-between items-start'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-xl font-semibold'>Funiro</h1>
                    <p className='text-gray-600'>400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
                </div>
                {linkSections.map((section, index) => (
                    <FooterLinkSection key={index} title={section.title} links={section.links} />
                ))}
                <div className='flex flex-col gap-4'>
                    <span className='text-gray-600'>Newsletter</span>
                    <div className='flex flex-col lg:flex-row justify-start items-start lg:items-center gap-4'>
                        <input 
                            type='email' 
                            placeholder='Enter your email id' 
                            className='border-b-2 border-black px-4 py-2' 
                            aria-label='Enter your email address'
                        />
                        <button 
                            className='text-black font-bold border-b-2 border-black hover:bg-black hover:text-white transition-colors'
                            aria-label='Subscribe to newsletter'
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <div className='flex justify-center items-center'>
                <p className='text-gray-600'>2023 Funiro. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
