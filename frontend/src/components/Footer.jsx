import React from 'react'

const Footer = () => {
    return (
        <div className='pt-16 pb-6 px-16 w-full  flex flex-col gap-8'>
            <div className='flex flex-row flex-wrap justify-between items-start'>
                <div className='flex flex-col gap-12'>
                    <h1 className='text-xl font-semibold'>Funiro</h1>
                    <p className='text-text-primary'>400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
                </div>
                <div className='flex flex-col gap-12'>
                    <span className='text-text-primary'>Links</span>
                    <ul className='flex flex-col gap-6'>
                        <li className='font-semibold'>Home</li>
                        <li className='font-semibold'>Shop</li>
                        <li className='font-semibold'>Blog</li>
                        <li className='font-semibold'>Contact</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-12'>
                    <span className='text-text-primary'>Help</span>
                    <ul className='flex flex-col gap-6'>
                        <li className='font-semibold'>Payment Options</li>
                        <li className='font-semibold'>Return</li>
                        <li className='font-semibold'>Privacy Policy</li>
                        <li className='font-semibold'>Contact</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-12'>
                    <span className='text-text-primary'>
                        Newsletter
                    </span>
                    <div className='flex flex-col lg:flex-row justify-center items-end gap-8'>
                        <input type='text' placeholder='Enter you email id' className='border-b-2 border-b-black px-4 py-2' />
                        <button className='text-black font-bold border-b-2 border-black'>Subscribe</button>
                    </div>
                </div>
            </div>
            <hr />
            <div className='flex justify-center items-end'>
                <p>2023 furino. All rights reverved</p>
            </div>
        </div>
    )
}

export default Footer
