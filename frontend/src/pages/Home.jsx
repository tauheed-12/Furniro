import React, { useState, useEffect } from 'react';
import range1 from '../assets/range1.png';
import range2 from '../assets/rang2.png';
import range3 from '../assets/range3.png';
import productData from '../data/products';
import { VscCircle, VscArrowCircleRight } from "react-icons/vsc";
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BrowseCard = ({ imgName, alt, title }) => (
    <div className='flex flex-col justify-center items-center gap-5'>
        <img src={imgName} alt={alt} className='rounded-lg' />
        <span className='text-xl font-semibold'>{title}</span>
    </div>
);

const Home = () => {
    const [numbOfDisplayedProduct, setNumberOfDisplayedProduct] = useState(8);
    const [isHideButton, setHideButton] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [products, setProducts] = useState([])
    const imgs = [range1, range2, range3];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post('http://localhost:8080/product/getproduct', 16);
                console.log(response);
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    const setNumberOfProduct = () => {
        if (numbOfDisplayedProduct > productData.length) {
            setHideButton(true);
            return;
        }
        setNumberOfDisplayedProduct(numbOfDisplayedProduct + 4);
    };

    return (
        <div className='flex justify-center items-center flex-col'>
            <div className='w-full flex justify-center md:justify-end items-center bg-banner bg-cover bg-center h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px]'>
                <div className='flex flex-col justify-center md:justify-start items-start p-4 sm:p-8 md:p-12 lg:p-16 bg-tertiary w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] md:mr-16 gap-2'>
                    <p className='font-semibold'>New Arrival</p>
                    <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-text-secondary font-bold w-[60%]'>Discover Our New Collection</h1>
                    <p className='font-semibold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
                        luctus nec ullamcorper mattis.</p>
                    <button className='text-lg bg-primary text-white px-4 py-2 mt-8'>Buy Now</button>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center my-6 py-4 gap-8 px-4'>
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-black text-3xl font-bold'>Browse The Range</h2>
                    <p className='text-text-primary text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className='flex flex-row justify-around gap-6 items-center flex-wrap'>
                    <BrowseCard imgName={range1} title={"Dining"} alt={"dining"} />
                    <BrowseCard imgName={range2} title={"Living"} alt={"living"} />
                    <BrowseCard imgName={range3} title={"Bedroom"} alt={"bedroom"} />
                </div>
            </div>
            <div className='py-8'>
                <div className='flex flex-col justify-center items-center py-4'>
                    <h2 className='text-black text-3xl font-bold'>Our Products</h2>
                </div>
                <div className='flex flex-col justify-center gap-6 items-center flex-wrap px-4 md:px-8'>
                    <div className='flex flex-row justify-center gap-3 items-center flex-wrap'>
                        {products.slice(0, numbOfDisplayedProduct).map((product, id) => (
                            <ProductCard
                                productId={product._id}
                                imgName={product.imagesUrl[0]}
                                productName={product.productName}
                                description={product.description}
                                price={product.price}
                                percentageOff={product.discount}
                                key={id}
                            />
                        ))}
                    </div>
                    {!isHideButton && (
                        <button
                            className='bg-white text-text-secondary px-5 py-2 opacity-100 border-2 border-yellow-500 hover:bg-text-secondary transition-all duration-500 ease-in-out hover:text-white'
                            onClick={setNumberOfProduct}
                        >
                            Load More
                        </button>
                    )}
                </div>
            </div>
            <div className='flex flex-col lg:flex-row justify-between items-center w-full bg-tertiary py-8 overflow-x-hidden'>
                <div className='flex flex-col justify-start items-start gap-4 px-8'>
                    <h2 className='text-4xl font-bold'>50+ Beautiful rooms inspiration</h2>
                    <p className='text-sm text-text-primary w-[60%]'>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
                    <button className='text-lg bg-primary text-white py-1 px-6 mt-4'>Explore More</button>
                </div>
                <div className='flex flex-row justify-center items-start gap-8 relative px-6'>
                    <img src={imgs[imgIndex % imgs.length]} alt='slide1' className='mt-5 lg:mt-0' />
                    <div className='hidden md:flex flex-col gap-8 '>
                        <div className='flex-[2] flex flex-row items-start justify-start gap-6'>
                            <img src={imgs[(imgIndex + 1) % imgs.length]} alt='slide3' className='' />
                            <img src={imgs[(imgIndex + 2) % imgs.length]} alt='slide2' className='' />
                        </div>
                        <div className='flex-1 flex flex-row justify-start items-center gap-6'>
                            <VscCircle />
                            <VscCircle />
                            <VscCircle />
                        </div>
                    </div>
                    <VscArrowCircleRight className='absolute hidden md:flex top-1/4 right-16 text-4xl text-text-secondary rounded-full bg-tertiary' onClick={() => setImgIndex(imgIndex + 1)} />
                </div>
            </div>
            <div className='flex flex-col justify-center items-center my-6 py-4 gap-8'>
                <div className='flex flex-col-reverse justify-center items-center'>
                    <h2 className='text-black text-3xl font-bold'>#FuniroFurniture</h2>
                    <p className='text-text-primary'>Share your setup with</p>
                </div>
                <div className='flex flex-row gap-6 flex-wrap'>

                </div>
            </div>
        </div>
    );
};

export default Home;
