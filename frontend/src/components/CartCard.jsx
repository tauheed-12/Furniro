const CartCard = ({ productId, imgName, price, productName, removeProduct }) => {
    return (
        <div className='flex flex-row justify-center items-center gap-14 px-16 py-8'>
            <table className='flex-[2]'>
                <thead className='bg-main'>
                    <tr>
                        <th className='px-10 py-1'>Product</th>
                        <th className='px-10 py-1'>Price</th>
                        <th className='px-10 py-1'>Quantity</th>
                        <th className='px-10 py-1'>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='items-center'>
                        <td className='flex flex-row gap-2 justify-center items-center'>
                            <img src={imgName} className='w-16 h-16 mt-2' alt='sofa' />
                            <span>{productName}</span>
                        </td>
                        <td className='text-center'>${price}</td>
                        <td className='text-center'>1</td>
                        <td className='text-center'>${price}</td>
                    </tr>
                </tbody>
            </table>
            <button className='px-4 py-2 border-2 border-black rounded-2xl' onClick={() => removeProduct(productId)}>
                Remove
            </button>
        </div>
    );
};

export default CartCard;