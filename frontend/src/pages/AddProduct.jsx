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
        image: null
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductDetails({
            ...productDetails,
            image: file
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();


            formData.append("productName", productDetails.productName);
            formData.append("description", productDetails.description);
            formData.append("price", productDetails.price);
            formData.append("discount", productDetails.discount);


            productDetails.color.forEach((color, index) => {
                formData.append(`color[${index}][colorName]`, color.colorName);
                formData.append(`color[${index}][quantity]`, color.quantity);
            });


            productDetails.sizes.forEach((size, index) => {
                formData.append(`sizes[${index}][sizeName]`, size.sizeName);
                formData.append(`sizes[${index}][quantity]`, size.quantity);
            });

            productDetails.features.forEach((feature, index) => {
                formData.append(`features[${index}]`, feature);
            });

            if (productDetails.image) {
                formData.append('image', productDetails.image);
            }

            const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
            if (!tokenCookie) {
                return;
            }

            const token = tokenCookie.split('=')[1];

            const response = await axios.post(`${process.env.BACKEND_URI}/product/add`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(response.data.message);
        } catch (error) {
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
