import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ productId, imgName, productName, description, price, percentageOff }) => {
    const netPrice = (price - (price * (percentageOff / 100))).toFixed(2);

    return (
        <Link to={`/product/${productId}`}>
            <div className="bg-gray-100 mt-4 w-[300px] h-[420px] flex flex-col rounded-lg shadow transition">
                {/* Image section */}
                <div className="h-[220px] w-full overflow-hidden">
                    <img src={imgName} alt={productName} className="w-full h-full object-cover" />
                </div>

                {/* Content section */}
                <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                        <p className="text-xl font-semibold truncate">{productName}</p>
                        <p className="text-text-primary text-sm line-clamp-2">{description}</p>
                    </div>

                    <div className="flex flex-row justify-between items-center mt-3">
                        <span className="text-xl font-bold">$ {netPrice}</span>
                        <span className="text-text-primary line-through">$ {price}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
