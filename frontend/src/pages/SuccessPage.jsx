import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'

const SuccessPage = () => {
    return (
        <div>
            <Hero />
            <div className='my-18 flex justify-center items-center py-6'>
                <h1>Congratulations Your Order is placed successfully</h1>
            </div>
            <Features />
        </div>
    )
}

export default SuccessPage
