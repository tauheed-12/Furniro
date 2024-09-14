const ProductImage = ({ imageUrl }) => (
    <div className='w-full md:w-1/2 flex justify-center md:justify-end bg-quaternary'>
        <img src={imageUrl} alt='Product' />
    </div>
);

export default ProductImage;