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
    loading,
}) => {
    return (
        <form
            className="flex flex-col gap-6 w-full"
            onSubmit={handleSubmit}
        >
            {/* Basic Info */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        label="Product Name"
                        name="productName"
                        value={productDetails.productName}
                        onChange={handleInputChange}
                    />
                    <InputField
                        label="Price"
                        name="price"
                        value={productDetails.price}
                        onChange={handleInputChange}
                        type="number"
                    />
                    <InputField
                        label="Discount (%)"
                        name="discount"
                        value={productDetails.discount}
                        onChange={handleInputChange}
                        type="number"
                    />
                </div>
                <InputField
                    label="Description"
                    name="description"
                    value={productDetails.description}
                    onChange={handleInputChange}
                    type="textarea"
                />
            </div>

            {/* Colors */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Colors</h2>
                <ColorInput
                    colors={productDetails.color}
                    handleAddColor={handleAddColor}
                    handleColorChange={handleColorChange}
                />
            </div>

            {/* Sizes */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Sizes</h2>
                <SizeInput
                    sizes={productDetails.sizes}
                    handleAddSize={handleAddSize}
                    handleSizeChange={handleSizeChange}
                />
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Features</h2>
                <FeatureInput
                    features={productDetails.features}
                    handleAddFeature={handleAddFeature}
                    handleFeatureChange={handleFeatureChange}
                />
            </div>

            {/* Image */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Image</h2>
                <ImageInput handleImageChange={handleImageChange} />
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className={`text-lg font-semibold px-6 py-3 rounded-xl transition duration-200 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-700 text-white shadow-md"}`}
                >
                    {loading ? "Submitting..." : "Submit Product"}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
