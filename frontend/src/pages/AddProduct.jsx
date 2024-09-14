import { useState } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import Hero from "../components/Hero";
import Features from "../components/Features";

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

    return (
        <div>
            <Hero title={"Add Product"} />
            <div className='flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 py-10 md:py-20 gap-4'>
                <h1 className='text-3xl font-semibold'>Product Details</h1>
                <ProductForm
                    productDetails={productDetails}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    handleAddImage={handleAddImage}
                    handleAddColor={handleAddColor}
                    handleColorChange={handleColorChange}
                    handleAddFeature={handleAddFeature}
                    handleSizeChange={handleSizeChange}
                    handleFeatureChange={handleFeatureChange}
                    handleAddSize={handleAddSize}
                    handleImageChange={handleImageChange}
                />
            </div>
            <Features />
        </div>
    );
};

export default AddProduct;
