import ProductCard from './ProductCard';

const ProductsHome = ({ products, numbOfDisplayedProduct, isHideButton, setNumberOfProduct }) => {
    return (<div className='flex flex-col justify-center gap-6 items-center flex-wrap px-4 md:px-8'>
        <div className='flex flex-row justify-center gap-3 items-center flex-wrap'>
            {products.slice(0, numbOfDisplayedProduct).map((product, id) => (
                <ProductCard
                    productId={product._id}
                    imgName={product.imagesUrl[0]}
                    productName={product.productName}
                    description={product.description}
                    price={product.price}
                    percentageOff={product.discount}
                    key={id}
                />
            ))}
        </div>
        {!isHideButton && (
            <button
                className='bg-white text-text-secondary px-5 py-2 opacity-100 border-2 border-yellow-500 hover:bg-text-secondary transition-all duration-500 ease-in-out hover:text-white'
                onClick={setNumberOfProduct}
            >
                Load More
            </button>
        )}
    </div>)
}

export default ProductsHome;