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
        image: null,
    };

    const [productDetails, setProductDetails] = useState(demoProduct);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
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
        newColors[index] = { ...newColors[index], [name]: value };
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
        newSizes[index] = { ...newSizes[index], [name]: value };
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
        setProductDetails({ ...productDetails, image: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();

            const { productName, description, price, discount, color, sizes, features, image } = productDetails;

            formData.append("productName", productName);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("discount", discount);

            formData.append("colors", JSON.stringify(color));
            formData.append("sizes", JSON.stringify(sizes));
            formData.append("features", JSON.stringify(features));

            if (image instanceof File) {
                formData.append("image", image);
            }

            const tokenCookie = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));
            if (!tokenCookie) return;
            const token = tokenCookie.split("=")[1];

            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URI}/user/add`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert(response.data.message);
            setProductDetails(demoProduct);
        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Hero title={"Add Product"} />

            <div className="flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 py-10 md:py-16 gap-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
                    Add New Product
                </h1>
                <p className="text-gray-500 text-center max-w-2xl">
                    Fill in the details below to add a new product to your store.
                </p>

                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
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
                        loading={loading}
                    />
                </div>
            </div>

            <Features />
        </div>
    );
};

export default AddProduct;
