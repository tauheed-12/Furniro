import ProductOptions from "./ProductOptions";

const ProductDetails = ({ product, selectedSize, setSelectedSize, selectedColor, setSelectedColor, quantity, setQuantity, handleAddCart }) => (
    <div className='w-full md:w-1/2 flex flex-col gap-4'>
        <h1 className='text-3xl font-bold'>{product.productName}</h1>
        <p className='text-xl text-text-primary'>{product.price}</p>
        <div className='flex flex-row gap-3'>
            <span>stars</span>
            <span>5 customer reviews</span>
        </div>
        <p className='font-semibold'>{product.description}</p>
        <ProductOptions
            title="Size"
            options={product.sizes.map(size => size.sizeName)}
            selectedOption={selectedSize}
            onSelectOption={setSelectedSize}
        />
        <ProductOptions
            title="Color"
            options={product.color.map(c => c.colorName)}
            selectedOption={selectedColor}
            onSelectOption={setSelectedColor}
        />
        <div className='flex flex-row flex-wrap justify-center items-center gap-4'>
            <input
                type='number'
                placeholder='1'
                className='flex-1 text-xl px-6 py-3 border-2 border-slate-200 rounded-lg'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button className='flex-1 px-6 py-3 border-2 border-black rounded-lg' onClick={handleAddCart}>
                Add to Cart
            </button>
            <button className='flex-1 px-6 py-3 border-2 border-black rounded-lg'>+ Compare</button>
        </div>
    </div>
);

export default ProductDetails;