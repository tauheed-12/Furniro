import InputField from "./InputField";

const SizeInput = ({ sizes, handleAddSize, handleSizeChange }) => {
    return (
        <div className='flex flex-col'>
            <label className='text-lg font-semibold mb-1'>Sizes</label>
            {sizes.map((size, index) => (
                <div key={index} className='flex flex-row gap-4 mb-2'>
                    <select
                        className='border-solid border-[1px] border-black text-lg px-5 py-2 rounded-xl w-full'
                        name="sizeName"
                        value={size.sizeName}
                        onChange={(e) => handleSizeChange(index, e)}
                    >
                        <option value="">Select Size</option>
                        <option value="XL">XL</option>
                        <option value="L">L</option>
                        <option value="XXL">XXL</option>
                    </select>
                    <InputField
                        type="number"
                        name="quantity"
                        value={size.quantity}
                        onChange={(e) => handleSizeChange(index, e)}
                        placeholder='Quantity'
                    />
                </div>
            ))}
            <button type="button" className='px-4 py-2 bg-main rounded-2xl mt-4' onClick={handleAddSize}>Add+</button>
        </div>
    );
};

export default SizeInput;