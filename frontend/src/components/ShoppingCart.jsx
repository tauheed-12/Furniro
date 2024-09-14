import React from 'react'
import { CiLock } from "react-icons/ci";
import img6 from '../assets/image 6.png';
import { Link } from 'react-router-dom';
import ShoppingCartCard from './ShoppingCartCard';

const ShoppingCart = ({ setCartModelOpen }) => {
    return (
        <div className='flex flex-col justify-between absolute top-0 right-0 px-5 py-8 bg-white h-[80vh]'>
            <div className=''>
                <div className='flex justify-between items-center px-6 mb-5'>
                    <h1 className='text-2xl font-bold'>Shopping Cart</h1>
                    <button onClick={() => setCartModelOpen(false)}>
                        <CiLock />
                    </button>
                </div>
                <hr />
                <div className='flex flex-col justify-start items-start gap-3 mt-8'>
                    <ShoppingCartCard name={'Asguard Sofa'} price={50000} quantity={1} img={img6} />
                    <ShoppingCartCard name={'Asguard Sofa'} price={50000} quantity={1} img={img6} />
                </div>
            </div>
            <div>
                <div className='flex flex-row justify-between items-center mb-6 text-xl'>
                    <span className='font-semibold'>Subtotal</span>
                    <span className='text-text-secondary'>$ 4,0000</span>
                </div>
                <hr />
                <div className='flex flex-row justify-between items-center gap-3 mt-6'>
                    <Link to='/cart'>
                        <button className='px-4 py-2 border-2 border-black rounded-2xl'>Cart</button>
                    </Link>
                    <Link to='/checkout'>
                        <button className='px-4 py-2 border-2 border-black rounded-2xl'>Checkout</button>
                    </Link>
                    <button className='px-4 py-2 border-2 border-black rounded-2xl'>Comparison</button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
