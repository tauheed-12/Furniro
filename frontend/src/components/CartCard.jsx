const CartCard = ({ productId, imgName, price, productName, removeProduct }) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-14 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 lg:py-8 border-b">
            {/* Table layout for larger screens */}
            <table className="hidden md:table flex-[2] w-full text-sm md:text-base">
                <thead className="bg-main text-black">
                    <tr>
                        <th className="px-4 md:px-6 py-2">Product</th>
                        <th className="px-4 md:px-6 py-2">Price</th>
                        <th className="px-4 md:px-6 py-2">Quantity</th>
                        <th className="px-4 md:px-6 py-2">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
                        <td className="flex flex-row gap-2 justify-center items-center py-2">
                            <img src={imgName} className="w-12 h-12 md:w-16 md:h-16" alt="product" />
                            <span className="text-xs sm:text-sm md:text-base">{productName}</span>
                        </td>
                        <td>${price}</td>
                        <td>1</td>
                        <td>${price}</td>
                    </tr>
                </tbody>
            </table>

            {/* Card layout for mobile */}
            <div className="md:hidden w-full flex flex-col gap-3 border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-4">
                    <img src={imgName} className="w-16 h-16 object-cover rounded" alt="product" />
                    <div className="flex flex-col">
                        <span className="font-medium">{productName}</span>
                        <span className="text-gray-600 text-sm">${price}</span>
                    </div>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Quantity: 1</span>
                    <span className="font-medium">Subtotal: ${price}</span>
                </div>
            </div>

            {/* Remove button */}
            <button
                className="px-3 sm:px-4 py-1 sm:py-2 border-2 border-black rounded-xl hover:bg-black hover:text-white transition"
                onClick={() => removeProduct(productId)}
            >
                Remove
            </button>
        </div>
    );
};

export default CartCard;
