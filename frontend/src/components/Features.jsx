import React from 'react';
import FeaturesCard from './FeaturesCard';
import customer from '../assets/customer-support.png';
import shipping from '../assets/shipping.png';
import guarantee from '../assets/guarantee.png';
import trophy from '../assets/trophy 1.png';

const Features = () => {
    return (
        <div className='bg-quaternary px-10 lg:px-16 py-16 lg:py-24 flex flex-row flex-wrap justify-start gap-4 lg:gap-0 lg:justify-between items-start lg:items-center'>
            <FeaturesCard imgName={trophy} title="High Quality" description="Crafted from top materials" />
            <FeaturesCard imgName={guarantee} title="Warranty Protection" description="Over 2 years" />
            <FeaturesCard imgName={shipping} title="Free Shipping" description="Order over 150$" />
            <FeaturesCard imgName={customer} title="24 / 7  Support" description="Dedicated Support" />
        </div>
    )
}

export default Features
