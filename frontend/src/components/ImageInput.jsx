import InputField from "./InputField";
const ImageInput = ({ imagesUrl, handleAddImage, handleImageChange }) => {
    return (
        <div className='flex flex-col'>
            <label className='text-lg font-semibold mb-1'>Images</label>
            {imagesUrl.map((image, index) => (
                <InputField
                    key={index}
                    value={image}
                    onChange={(e) => handleImageChange(index, e)}
                    placeholder="Enter Image URL"
                />
            ))}
            <button type="button" className='px-4 py-2 bg-main rounded-2xl mt-4' onClick={handleAddImage}>Add+</button>
        </div>
    );
};

export default ImageInput;