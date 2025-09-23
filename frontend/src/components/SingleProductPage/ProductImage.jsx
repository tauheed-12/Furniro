const ProductImage = ({ imageUrl }) => (
    <div className='w-full md:w-1/2'>
        <img src={imageUrl} alt='Product' />
    </div>
);

export default ProductImage;