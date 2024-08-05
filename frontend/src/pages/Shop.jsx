import React, { useState } from 'react';
import Hero from '../components/Hero';
import { MdFilterList } from "react-icons/md";
import productData from '../data/products';
import ProductCard from '../components/ProductCard';
import Features from '../components/Features';


const Shop = () => {
    const [numberOfProducts, setNumberOfProducts] = useState(16);
    const [start, setStart] = useState(0);
    const [buttonNumber, setButtonNumber] = useState(0);
    const [sortOrder, setSortOrder] = useState('default');

    const handleClick = (id) => {
        setButtonNumber(id);
        const newStart = id * numberOfProducts;
        setStart(newStart);
    };

    const sortedProducts = [...productData].sort((a, b) => {
        if (sortOrder === 'price-high-to-low') {
            return b.price - a.price;
        } else if (sortOrder === 'price-low-to-high') {
            return a.price - b.price;
        } else {
            return 0;
        }
    });

    const end = start + numberOfProducts;
    const productToShow = sortedProducts.slice(start, end);

    const totalPages = Math.ceil(productData.length / numberOfProducts);

    return (
        <div>
            <Hero title="Shop" />
            <div className='flex flex-col gap-8 md:flex-row justify-between items-center py-2 px-6 bg-quaternary -mt-5'>
                <div className='flex justify-center items-center gap-5'>
                    <div className='flex justify-center items-center gap-3'>
                        <MdFilterList />
                        <span className='text-lg'>Filter</span>
                    </div>

                    <div className='text-lg'>
                        Showing {start + 1}-{end > productData.length ? productData.length : end} results of {productData.length}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row justify-center items-center gap-5'>
                    <div className='flex justify-center items-center gap-3'>
                        <label className='text-xl font-semibold'>Show</label>
                        <input
                            type='number'
                            className='w-10 h-10 bg-white border-none'
                            placeholder='16'
                            value={numberOfProducts}
                            onChange={(e) => setNumberOfProducts(parseInt(e.target.value) || 16)}
                        />
                    </div>
                    <div className='flex justify-center items-center gap-3'>
                        <label className='text-xl font-semibold'>Sort By</label>
                        <select
                            className='h-10 bg-white border-none'
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="price-high-to-low">Price high to low</option>
                            <option value="price-low-to-high">Price low to high</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center gap-6 items-center px-8 py-12'>
                <div className='flex flex-row justify-center gap-3 items-center flex-wrap'>
                    {productToShow.map((product, id) => (
                        <ProductCard
                            imgName={product.img}
                            productName={product.title}
                            description={product.description}
                            price={product.price}
                            percentageOff={product.percentageOff}
                            key={id}
                        />
                    ))}
                </div>
                <div className='flex gap-2 justify-center items-center'>
                    {[...Array(totalPages)].map((_, id) => (
                        <button
                            className={`w-10 h-10 ${buttonNumber === id ? 'bg-primary text-white' : 'bg-tertiary'}`}
                            key={id}
                            onClick={() => handleClick(id)}
                        >
                            {id + 1}
                        </button>
                    ))}
                </div>
            </div>
            <Features />
        </div>
    );
};

export default Shop;
