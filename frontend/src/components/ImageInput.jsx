const ImageInput = ({ handleImageChange }) => {
    return (
        <div>
            <label>Image</label>
            <div>
                <input
                    type="file"
                    name="image"
                    onChange={(e) => handleImageChange(e)}
                />
            </div>
        </div>
    );
};

export default ImageInput;
