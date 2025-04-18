import React, { useEffect, useState } from 'react';
import { GoChevronRight } from "react-icons/go";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

import ProductCard from '../components/ProductCard';
import ProductImage from '../components/SingleProductPage/ProductImage';
import ProductDetails from '../components/SingleProductPage/ProductDetails';
import ProductTabs from '../components/SingleProductPage/ProductTabs';


const SingleProduct = () => {
    const [selectedButton, setSelectedButton] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post('http://www.localhost:8080/product/singleproduct', { productId });
                setSelectedProduct(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, [productId]);
    const { userId } = useAuth();
    const handleAddCart = async () => {

        const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        if (!tokenCookie) {
            return;
        }

        const token = tokenCookie.split('=')[1];
        console.log(token)
        if (!selectedProduct) return;

        try {
            const response = await axios.post(`${process.env.BACKEND_URI}/product/addCart`,
                {
                    productId,
                    productName: selectedProduct.productName,
                    userId: userId,
                    quantity,
                    color: selectedColor,
                    size: selectedSize,
                    price: selectedProduct.price,
                    productImgUrl: selectedProduct.imagesUrl[0]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    if (!selectedProduct) {
        return <h1>Loading.....</h1>;
    }

    return (
        <div>
            <div className='flex flex-wrap justify-start items-center py-2 px-4 md:px-6 bg-quaternary gap-8'>
                <span className='flex flex-row justify-center items-center text-text-primary text-lg gap-3'>Home <GoChevronRight className='text-black' /></span>
                <span className='flex flex-row justify-center items-center text-text-primary text-lg gap-3'>Shop <GoChevronRight className='text-black' /></span>
                <span>{selectedProduct.productName}</span>
            </div>
            <div className='flex flex-wrap justify-center items-start px-6 md:px-12 lg:px-24 py-8 gap-12'>
                <ProductImage imageUrl={selectedProduct.imagesUrl[0]} />
                <ProductDetails
                    product={selectedProduct}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleAddCart={handleAddCart}
                />
            </div>
            <ProductTabs selectedButton={selectedButton} setSelectedButton={setSelectedButton} product={selectedProduct} />
            <div className='flex flex-col gap-8 justify-start items-center py-10 px-4 md:px-8 lg:px-12 bg-quaternary'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <h1 className='text-3xl font-semibold'>Related Products</h1>
                    <button className='flex flex-row justify-center items-center gap-2'>
                        <span className='text-lg font-semibold text-text-primary'>View All</span>
                        <GoChevronRight />
                    </button>
                </div>
                <div className='flex flex-wrap justify-center items-center gap-8'>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
