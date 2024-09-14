import InputField from "./InputField";

const ColorInput = ({ colors, handleAddColor, handleColorChange }) => {
    return (
        <div className='flex flex-col'>
            <label className='text-lg font-semibold mb-1'>Colors</label>
            {colors.map((color, index) => (
                <div key={index} className='flex flex-row gap-4 mb-2'>
                    <select
                        className='border-solid border-[1px] border-black text-lg px-5 py-2 rounded-xl w-full'
                        name="colorName"
                        value={color.colorName}
                        onChange={(e) => handleColorChange(index, e)}
                    >
                        <option value="">Select Color</option>
                        <option value="Red">Red</option>
                        <option value="Green">Green</option>
                        <option value="Blue">Blue</option>
                    </select>
                    <InputField
                        type="number"
                        name="quantity"
                        value={color.quantity}
                        onChange={(e) => handleColorChange(index, e)}
                        placeholder='Quantity'
                    />
                </div>
            ))}
            <button type="button" className='px-4 py-2 bg-main rounded-2xl mt-4' onClick={handleAddColor}>Add+</button>
        </div>
    );
};

export default ColorInput;