import React, { useState } from 'react';
import Hero from '../components/Hero';
import productData from '../data/products';
import ProductCard from '../components/ProductCard';
import Features from '../components/Features';
import ShopFilter from '../components/ShopFilter';


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
            <ShopFilter setNumberOfProducts={setNumberOfProducts} setSortOrder={setSortOrder}
                start={start} end={end} productData={productData} sortOrder={sortOrder} />
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
