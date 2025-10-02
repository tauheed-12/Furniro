import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductsHome from '../components/ProductsHome';
import FetchError from './FetchErrorTempl';

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/product/getproduct`, 16);
                setProducts(response.data);
            } catch (error) {
            }
        };
        fetchProducts();
    }, []);

    // const end = start + numberOfProducts;
    return (
        <div>
            <Hero title="Shop" />
            {/* <ShopFilter setNumberOfProducts={setNumberOfProducts} setSortOrder={setSortOrder}
                start={start} end={end} productData={productData} sortOrder={sortOrder} /> */}
            <div className='flex flex-col justify-center gap-6 items-center px-8 py-12'>
                {!products ? <FetchError /> :
                    <div className='flex gap-2 justify-center items-center'>
                        <ProductsHome products={products} />
                    </div>
                }
            </div>
            <Features />
        </div>
    );
};

export default Shop;
