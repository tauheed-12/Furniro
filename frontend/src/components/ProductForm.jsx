import ImageInput from "./ImageInput";
import InputField from "./InputField";
import ColorInput from "./ColorInput";
import SizeInput from "./SizeInput";
import FeatureInput from "./FeaturesInput";

const ProductForm = ({
    productDetails,
    handleInputChange,
    handleSubmit,
    handleAddColor,
    handleColorChange,
    handleAddSize,
    handleSizeChange,
    handleAddFeature,
    handleFeatureChange,
    handleImageChange,
}) => {
    return (
        <form className='flex flex-col gap-4 w-2/3' onSubmit={handleSubmit}>
            <InputField
                label="Product Name"
                name="productName"
                value={productDetails.productName}
                onChange={handleInputChange}
            />
            <InputField
                label="Description"
                name="description"
                value={productDetails.description}
                onChange={handleInputChange}
                type="textarea"
            />
            <InputField
                label="Price"
                name="price"
                value={productDetails.price}
                onChange={handleInputChange}
                type="number"
            />
            <InputField
                label="Discount"
                name="discount"
                value={productDetails.discount}
                onChange={handleInputChange}
                type="number"
            />
            <ColorInput
                colors={productDetails.color}
                handleAddColor={handleAddColor}
                handleColorChange={handleColorChange}
            />
            <SizeInput
                sizes={productDetails.sizes}
                handleAddSize={handleAddSize}
                handleSizeChange={handleSizeChange}
            />
            <FeatureInput
                features={productDetails.features}
                handleAddFeature={handleAddFeature}
                handleFeatureChange={handleFeatureChange}
            />
            <ImageInput
                handleImageChange={handleImageChange}
            />
            <button type="submit" className='text-lg bg-primary text-white px-4 py-2 mt-8 self-center hover:bg-yellow-700 rounded-2xl'>
                Submit
            </button>
        </form>
    );
};

export default ProductForm;
