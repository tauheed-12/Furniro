import React from 'react';
import { CiShare2 } from "react-icons/ci";
import { MdCompareArrows } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductCard = ({ productId, imgName, productName, description, price, percentageOff }) => {
    const netPrice = (price * (percentageOff / 100)).toPrecision(5);
    return (
        <Link to={`/product/${productId}`}>
            <div className='bg-gray-100 mt-4 w-[300px]'>
                <img src={imgName} alt='' className='w-full h-full' />
                <div className='p-4'>
                    <p className='text-xl font-w2'>{productName}</p>
                    <p className='text-text-primary'>{description}</p>
                    <div className='flex flex-row justify-between'>
                        <span className='text-xl'>$ {netPrice}</span>
                        <span className='text-text-primary line-through'>$ {price}</span>
                    </div>
                </div>
                {/* <div className='w-full h-full absolute top-0 bg-productHover flex flex-col gap-3 justify-center items-center opacity-0 transition-opacity duration-200 ease-in hover:opacity-80'>
                <button className='bg-white text-text-secondary px-5 py-2 opacity-100 hover:bg-text-secondary
                     transition-all duration-500 ease-in-out hover:text-white' onClick={handleAddCart}>Add to cart</button>
                <div className='text-white font-bold flex flex-row gap-3'>
                    <span className='flex flex-row justify-center items-center gap-1'><CiShare2 /> Share</span>
                    <span className='flex flex-row justify-center items-center gap-1'><MdCompareArrows />Compare</span>
                    <span className='flex flex-row justify-center items-center gap-1'><CiHeart />Like</span>
                </div>
            </div> */}
            </div>
        </Link>
    )
}

export default ProductCard
