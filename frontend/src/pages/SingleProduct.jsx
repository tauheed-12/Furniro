import React, { useEffect, useState } from 'react';
import { GoChevronRight } from "react-icons/go";
import asguardImg from '../assets/Asgaard sofa 3.png';
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import sofa from '../assets/Group 107.png';
import sofas from '../data/sofa';
import ProductCard from '../components/ProductCard';
import productData from '../data/products';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const SingleProduct = () => {
    const [selectedButton, setSelectedButton] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const { productId } = useParams();
    const { userData } = useAuth();
    const userId = userData?._id;

    const handleAddCart = async () => {
        try {
            const response = await axios.post('http://localhost:8080/product/addCart', { productId, productName: selectedProduct.productName, userId, quantity, color: selectedColor, size: selectedSize, price: selectedProduct.price, productImgUrl: selectedProduct.imagesUrl[0] });
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchProdct = async () => {
            try {
                const response = await axios.post('http://www.localhost:8080/product/singleproduct', { productId });
                setSelectedProduct(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProdct();
    }, [productId]);

    if (selectedProduct === null) {
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
                <div className='w-full md:w-1/2 flex justify-center md:justify-end bg-quaternary'>
                    <img src={selectedProduct.imagesUrl[0]} alt='asguard sofa' />
                </div>
                <div className='w-full md:w-1/2 flex flex-col gap-4'>
                    <h1 className='text-3xl font-bold'>{selectedProduct.productName}</h1>
                    <p className='text-xl text-text-primary'>{selectedProduct.price}</p>
                    <div className='flex flex-row gap-3'>
                        <span>stars</span>
                        <span>5 customer reviews</span>
                    </div>
                    <p className='font-semibold'>{selectedProduct.description}</p>
                    <div className='flex flex-col gap-2'>
                        <span className='font-semibold text-xl'>Size</span>
                        <div className='flex flex-row justify-start items-center gap-4'>
                            {selectedProduct.sizes.map((size, id) => (
                                <button
                                    className={`w-10 h-10 rounded-md ${selectedSize === size.sizeName ? 'bg-text-secondary text-white' : 'bg-quaternary'}`}
                                    key={id}
                                    onClick={() => setSelectedSize(size.sizeName)}
                                >
                                    {size.sizeName}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='font-semibold text-xl'>Color</span>
                        <div className='flex flex-row justify-start items-center gap-4'>
                            {selectedProduct.color.map((c, id) => (
                                <button
                                    className={`w-10 h-10 rounded-full ${selectedColor === c.colorName ? 'bg-selected-color' : 'bg-quaternary'}`}
                                    key={id}
                                    onClick={() => setSelectedColor(c.colorName)}
                                >
                                    {c.colorName}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-row flex-wrap justify-center items-center gap-4'>
                        <input
                            type='number'
                            placeholder='1'
                            className='flex-1 text-xl px-6 py-3 border-2 border-slate-200 rounded-lg'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <button
                            className='flex-1 px-6 py-3 border-2 border-black rounded-lg'
                            onClick={handleAddCart}
                        >
                            Add to Cart
                        </button>
                        <button className='flex-1 px-6 py-3 border-2 border-black rounded-lg'>+ Compare</button>
                    </div>
                    <hr />
                    <div className='flex flex-col text-text-primary gap-4'>
                        <div className='flex flex-row'>
                            <span className='mr-4'>SKU</span>
                            <span className='mr-2'>:</span>
                            <span>SS001</span>
                        </div>
                        <div className='flex flex-row'>
                            <span className='mr-4'>Category</span>
                            <span className='mr-2'>:</span>
                            <span>Sofa</span>
                        </div>
                        <div className='flex flex-row'>
                            <span className='mr-4'>Tags</span>
                            <span className='mr-2'>:</span>
                            <span>Sofa, Chair, Home, Shop</span>
                        </div>
                        <div className='flex flex-row'>
                            <span className='mr-4'>Share</span>
                            <span className='mr-2'>:</span>
                            <span className='flex flex-row gap-2 text-black justify-center items-center'>
                                <FaFacebook />
                                <FaLinkedinIn />
                                <FaTwitter />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-start items-center py-10 px-6'>
                <div className='flex flex-row flex-wrap justify-center items-center gap-6 mb-4'>
                    <button onClick={() => setSelectedButton(1)} className={`text-xl ${selectedButton === 1 ? 'text-black' : 'text-text-primary'}`}>
                        Descriptions
                    </button>
                    <button onClick={() => setSelectedButton(2)} className={`text-xl ${selectedButton === 2 ? 'text-black' : 'text-text-primary'}`}>
                        Additional Information
                    </button>
                    <button onClick={() => setSelectedButton(3)} className={`text-xl ${selectedButton === 3 ? 'text-black' : 'text-text-primary'}`}>
                        Reviews(5)
                    </button>
                </div>
                <div className='px-6 md:px-12 lg:px-28'>
                    {selectedButton === 1 ?
                        <div className='text-text-primary flex flex-col gap-4'>
                            <p className='px-4 md:px-10'>{selectedProduct.description}</p>
                            <div className='flex flex-row flex-wrap justify-center items-center gap-6'>
                                {selectedProduct.imagesUrl.map((img, id) => (
                                    <img src={img} alt='sofa' className='h-48 w-48' key={id} />
                                ))}
                            </div>
                        </div> : selectedButton === 2 ?
                            <div className='flex flex-col justify-start items-start gap-3'>
                                <div className='flex flex-row gap-4'>
                                    <p>Dimensions:</p>
                                    <p className='flex flex-row justify-center items-center gap-2' >
                                        <span>Length</span>
                                        <span>{sofas.dimensions.length}</span>
                                    </p>
                                    <p className='flex flex-row justify-center items-center gap-2'>
                                        <span>Width</span>
                                        <span>{sofas.dimensions.width}</span>
                                    </p>
                                    <p className='flex flex-row justify-center items-center gap-2'>
                                        <span>Height</span>
                                        <span>{sofas.dimensions.height}</span>
                                    </p>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <p>Colors</p>
                                    <p className='flex flex-row justify-center items-center gap-2'>
                                        {selectedProduct.color.join(', ')}
                                    </p>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <p>Materials</p>
                                    <p className='flex flex-row justify-center items-center gap-2'>{sofas.material}</p>
                                </div>
                                <div className='flex flex-row gap-4'>
                                    <p>Features</p>
                                    <p className='flex flex-row justify-center items-center gap-2'>
                                        {selectedProduct.features.join(', ')}
                                    </p>
                                </div>
                            </div> : selectedButton === 3 ?
                                <div className='flex flex-col justify-start items-start gap-4'>
                                    {sofas.reviews.map((review, id) => (
                                        <div key={id} className='flex flex-col gap-2 bg-slate-100 p-4 w-full'>
                                            <p>{review.comment}</p>
                                            <p className='flex flex-row gap-2 text-text-primary justify-end'>
                                                <span>{review.rating}</span>
                                                <span>{review.reviewerName}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div> : undefined}
                </div>
            </div>
            <div className='flex flex-col justify-center items-center gap-4 px-4'>
                <h1 className='text-3xl font-semibold'>Similar Products</h1>
                <div className='flex flex-row justify-center gap-3 items-center flex-wrap'>
                    {productData.slice(0, 4).map((product, id) => (
                        <ProductCard
                            key={id}
                            imgName={product.img}
                            description={product.description}
                            productName={product.title}
                            percentageOff={product.percentageOff}
                            price={product.price}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
