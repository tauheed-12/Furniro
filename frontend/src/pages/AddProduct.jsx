import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import axios from 'axios';

//https://drive.google.com/file/d/1KoJ2qOOE3Slyj0TasXMjsKR17K8-HLCm/view?usp=drive_link
//https://drive.google.com/file/d/1Gx7JOaIBnKA1iSiIb-tv1gk9SHV5tanC/view?usp=drive_link

const AddProduct = () => {
    const demoProduct = {
        productName: "",
        description: "",
        price: 0,
        discount: 0,
        color: [{ colorName: "", quantity: 9 }],
        sizes: [{ sizeName: "", quantity: 8 }],
        features: [""],
        imagesUrl: [""],
    };
    const [productDetails, setProductDetails] = useState(demoProduct);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({
            ...productDetails,
            [name]: value,
        });
    };

    const handleAddColor = () => {
        setProductDetails({
            ...productDetails,
            color: [...productDetails.color, { colorName: "", quantity: 0 }],
        });
    };

    const handleColorChange = (index, e) => {
        const { name, value } = e.target;
        const newColors = [...productDetails.color];
        newColors[index] = {
            ...newColors[index],
            [name]: value,
        };
        setProductDetails({ ...productDetails, color: newColors });
    };

    const handleAddSize = () => {
        setProductDetails({
            ...productDetails,
            sizes: [...productDetails.sizes, { sizeName: "", quantity: 0 }],
        });
    };

    const handleSizeChange = (index, e) => {
        const { name, value } = e.target;
        const newSizes = [...productDetails.sizes];
        newSizes[index] = {
            ...newSizes[index],
            [name]: value,
        };
        setProductDetails({ ...productDetails, sizes: newSizes });
    };

    const handleAddFeature = () => {
        setProductDetails({
            ...productDetails,
            features: [...productDetails.features, ""],
        });
    };

    const handleFeatureChange = (index, e) => {
        const { value } = e.target;
        const newFeatures = [...productDetails.features];
        newFeatures[index] = value;
        setProductDetails({ ...productDetails, features: newFeatures });
    };

    const handleAddImage = () => {
        setProductDetails({
            ...productDetails,
            imagesUrl: [...productDetails.imagesUrl, ""],
        });
    };

    const handleImageChange = (index, e) => {
        const { value } = e.target;
        const newImages = [...productDetails.imagesUrl];
        newImages[index] = value;
        setProductDetails({ ...productDetails, imagesUrl: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(productDetails);
        try {
            const response = await axios.post('http://localhost:8080/product/add', productDetails);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const inputCss = 'border-solid border-[1px] border-black text-lg px-5 py-2 rounded-xl w-full';
    const labelCss = 'text-lg font-semibold mb-1';
    const inputDivCss = 'flex flex-col justify-start items-start w-full';

    return (
        <div>
            <Hero title={"Add Product"} />
            <div className='flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 py-10 md:py-20 gap-4'>
                <h1 className='text-3xl font-semibold'>Product Details</h1>
                <form className='flex flex-col gap-4 w-2/3' onSubmit={handleSubmit}>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Product Name</label>
                        <input
                            className={inputCss}
                            name="productName"
                            value={productDetails.productName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Description</label>
                        <textarea
                            className={inputCss}
                            name="description"
                            value={productDetails.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Price</label>
                        <input
                            type="number"
                            className={inputCss}
                            name="price"
                            value={productDetails.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Discount</label>
                        <input
                            type="number"
                            className={inputCss}
                            name="discount"
                            value={productDetails.discount}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-row justify-between items-start gap-3'>
                        <div className={inputDivCss}>
                            <label className={labelCss}>Colors</label>
                            <div>
                                {productDetails.color.map((color, index) => (
                                    <div key={index} className='flex flex-row justify-between items-center gap-4 mb-2'>
                                        <select
                                            className={inputCss}
                                            name="colorName"
                                            value={color.colorName}
                                            onChange={(e) => handleColorChange(index, e)}
                                        >
                                            <option value="">Select Color</option>
                                            <option value="Red">Red</option>
                                            <option value="Green">Green</option>
                                            <option value="Blue">Blue</option>
                                        </select>
                                        <input
                                            type="number"
                                            className={inputCss}
                                            name="quantity"
                                            value={color.quantity}
                                            placeholder='quantity'
                                            onChange={(e) => handleColorChange(index, e)}
                                        />
                                    </div>
                                ))}
                                <button type="button" className='px-4 py-2 bg-main rounded-2xl mt-4' onClick={handleAddColor}>Add+</button>
                            </div>
                        </div>
                        <div className={inputDivCss}>
                            <label className={labelCss}>Sizes</label>
                            <div>
                                {productDetails.sizes.map((size, index) => (
                                    <div key={index} className='flex flex-row justify-between items-center gap-4 mb-2'>
                                        <select
                                            className={inputCss}
                                            name="sizeName"
                                            value={size.sizeName}
                                            onChange={(e) => handleSizeChange(index, e)}
                                        >
                                            <option value="">Select Size</option>
                                            <option value="XL">XL</option>
                                            <option value="L">L</option>
                                            <option value="XXL">XXL</option>
                                        </select>
                                        <input
                                            type="number"
                                            className={inputCss}
                                            name="quantity"
                                            value={size.quantity}
                                            placeholder='quantity'
                                            onChange={(e) => handleSizeChange(index, e)}
                                        />
                                    </div>
                                ))}
                                <button type="button" className='px-4 py-2 bg-main rounded-2xl mt-4' onClick={handleAddSize}>Add+</button>
                            </div>
                        </div>
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Features</label>
                        <div>
                            {productDetails.features.map((feature, index) => (
                                <div key={index} className='flex flex-row justify-between items-center gap-4 mb-2'>
                                    <input
                                        className={inputCss}
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e)}
                                    />
                                </div>
                            ))}
                            <button type="button" className='px-4 py-2 bg-main rounded-2xl mt-4' onClick={handleAddFeature}>Add+</button>
                        </div>
                    </div>
                    <div className={inputDivCss}>
                        <label className={labelCss}>Images</label>
                        <div>
                            {productDetails.imagesUrl.map((image, index) => (
                                <div key={index} className='flex flex-row justify-between items-center gap-4 mb-2'>
                                    <input
                                        className={inputCss}
                                        value={image}
                                        onChange={(e) => handleImageChange(index, e)}
                                    />
                                </div>
                            ))}
                            <button type="button" className='px-4 py-2 bg-main rounded-2xl mt-4' onClick={handleAddImage}>Add+</button>
                        </div>
                    </div>
                    <button type="submit" className='text-lg bg-primary text-white px-4 py-2 mt-8 self-center hover:bg-yellow-700 rounded-2xl'>Submit</button>
                </form>
            </div>
            <Features />
        </div>
    )
}

export default AddProduct;
