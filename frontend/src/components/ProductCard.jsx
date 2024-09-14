import React from 'react';
import { Link } from 'react-router-dom';

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
            </div>
        </Link>
    )
}

export default ProductCard
