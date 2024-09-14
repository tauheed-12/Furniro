import { MdCancel } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const ShoppingCartCard = ({ name, price, quantity, img }) => (
    <div className='flex flex-row justify-between items-center w-full'>
        <img src={img} className='h-20 w-20 rounded-xl' alt='' />
        <div className='flex flex-col justify-between items-center'>
            <p className='text-lg font-semibold'>{name}</p>
            <p className='flex flex-row justify-between items-center w-full'>
                <span className='text-lg'>{quantity}</span>
                <span><RxCross2 /></span>
                <span className='text-text-secondary text-lg'>${price}</span>
            </p>
        </div>
        <MdCancel />
    </div>
)

export default ShoppingCartCard;