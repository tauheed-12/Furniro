import React from 'react';

const CartTotal = ({ totalAmount, handleCheckout }) => (
    <div className='flex-1 p-8 m-4 bg-main flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-semibold'>Cart Total</h1>
        <div className='mt-8 w-full'>
            <div className='flex flex-row justify-between items-center w-full'>
                <span className='text-lg font-semibold'>Total</span>
                <span className='text-text-secondary'>${totalAmount.toFixed(2)}</span>
            </div>
        </div>
        <button className='px-4 py-2 border-2 border-black rounded-2xl mt-8' onClick={handleCheckout}>
            Checkout
        </button>
    </div>
)

export default CartTotal;