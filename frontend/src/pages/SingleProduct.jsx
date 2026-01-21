import React, { useEffect, useState } from 'react';
import { GoChevronRight } from "react-icons/go";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { showNotification } from '../slices/notificationSlice';
import { resetAddStatus } from '../slices/cartSlice';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/SingleProductPage/ProductImage';
import ProductDetails from '../components/SingleProductPage/ProductDetails';
import ProductTabs from '../components/SingleProductPage/ProductTabs';
import Loader from '../components/Loader';

const SingleProduct = () => {
    const dispatch = useDispatch();
    const { addStatus } = useSelector((state) => state.cart);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URI}/product/singleproduct`,
                    { productId }
                );
                setSelectedProduct(response.data);

                const firstColor = response.data.colors[0]?.colorName;
                const firstSize = response.data.colors[0]?.sizes[0]?.size;

                setSelectedColor(firstColor || null);
                setSelectedSize(firstSize || null);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (addStatus === 'succeeded') {
            dispatch(showNotification({
                type: 'success',
                message: 'Success, Product added to cart!'
            }));
            dispatch(resetAddStatus());
        }

        if (addStatus === 'failed') {
            dispatch(showNotification({
                type: 'error',
                message: 'Sorry, something went wrong!'
            }));
            dispatch(resetAddStatus());
        }
    }, [addStatus, dispatch]);

    const handleAddCart = () => {
        if (!selectedProduct) return;
        dispatch(addToCart({
            productName: selectedProduct.name,
            productId: selectedProduct.id,
            color: selectedColor,
            quantity,
            size: selectedSize,
            price: selectedProduct.price,
            productImgUrl: selectedProduct.imageUrl
        }));
    };

    if (addStatus === 'loading' || !selectedProduct) {
        return <Loader />;
    }

    return (
        <div>
            {/* Breadcrumb */}
            <div className='flex flex-wrap justify-start items-center py-2 px-4 md:px-6 bg-quaternary gap-3'>
                <span className='flex items-center text-text-primary text-lg gap-2'>
                    Home <GoChevronRight className='text-black' />
                </span>
                <span className='flex items-center text-text-primary text-lg gap-2'>
                    Shop <GoChevronRight className='text-black' />
                </span>
                <span className='text-lg font-medium'>{selectedProduct.name}</span>
            </div>

            {/* Main Content */}
            <div className='flex flex-wrap justify-center items-start px-6 md:px-12 lg:px-24 py-8 gap-12'>
                <ProductImage imageUrl={selectedProduct.imageUrl} />

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

            <ProductTabs product={selectedProduct} />

            {/* Related Products */}
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
