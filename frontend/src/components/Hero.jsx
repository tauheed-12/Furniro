import React from 'react';
import { Link } from 'react-router-dom';
import { GoChevronRight } from "react-icons/go";


const Hero = ({ title }) => {
    return (
        <div className='bg-hero bg-cover bg-no-repeat bg-center h-[400px] flex flex-col justify-center items-center gap-6'>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <div className='flex justify-center items-center gap-2'>
                <Link to='/'>Home</Link><GoChevronRight /><span className='text-text-primary'>{title}</span>
            </div>
        </div>
    )
}

export default Hero
