import ProductOptions from "./ProductOptions";

const ProductDetails = ({
    product,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    handleAddCart
}) => {

    // Sizes available for selected color
    const colorObj = selectedColor
        ? product.colors.find(c => c.colorName === selectedColor)
        : null;

    const sizeOptions = colorObj?.sizes.map(s => s.size) || [];

    // Get quantity for selected color + size
    const selectedSizeObj = colorObj?.sizes.find(s => s.size === selectedSize);
    const availableQuantity = selectedSizeObj ? selectedSizeObj.quantity : 0;

    return (
        <div className='w-full md:w-1/2 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold'>{product.name}</h1>
            <p className='text-xl text-text-primary'>${product.price}</p>

            <div className='flex flex-row gap-3'>
                <span>⭐⭐⭐⭐⭐</span>
                <span>5 customer reviews</span>
            </div>

            <p className='font-semibold'>{product.description}</p>

            <div className='flex flex-col gap-2'>
                <h3 className='font-semibold'>Features:</h3>
                <ul className='list-disc list-inside text-text-primary'>
                    {product.features.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                    ))}
                </ul>
            </div>

            <ProductOptions
                title="Color"
                options={product.colors.map(c => c.colorName)}
                selectedOption={selectedColor}
                onSelectOption={(color) => {
                    setSelectedColor(color);
                    // Automatically select first size for this color
                    const firstSize = product.colors.find(c => c.colorName === color)?.sizes[0]?.size;
                    setSelectedSize(firstSize || null);
                }}
            />

            <ProductOptions
                title="Size"
                options={sizeOptions || []}
                selectedOption={selectedSize}
                onSelectOption={setSelectedSize}
                disabled={!selectedColor}
            />

            {/* Show available quantity */}
            {selectedColor && selectedSize && (
                <p className="text-text-primary font-medium">
                    Available Quantity: {availableQuantity}
                </p>
            )}

            <div className='flex flex-row flex-wrap justify-center items-center gap-4'>
                <input
                    type='number'
                    min={1}
                    max={availableQuantity}
                    placeholder='1'
                    className='flex-1 text-xl px-6 py-3 border-2 border-slate-200 rounded-lg'
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(Number(e.target.value), availableQuantity))}
                />
                <button
                    className='flex-1 px-6 py-3 border-2 border-black rounded-lg'
                    onClick={handleAddCart}
                    disabled={!selectedColor || !selectedSize || quantity < 1 || quantity > availableQuantity}
                >
                    Add to Cart
                </button>
                <button className='flex-1 px-6 py-3 border-2 border-black rounded-lg'>
                    + Compare
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
