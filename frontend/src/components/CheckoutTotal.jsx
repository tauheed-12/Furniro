const CheckoutTotal = ({ totalCheckoutValue }) => (
    <div className='flex-1 ml-10'>
        <div className='flex flex-col gap-4 mt-4'>
            <div className='flex justify-between'>
                <span className='font-semibold'>Subtotal</span>
                <span className='text-text-primary font-semibold'>{totalCheckoutValue}</span>
            </div>
            <div className='flex justify-between'>
                <span className='font-semibold'>Total</span>
                <span className='text-text-secondary'>{totalCheckoutValue}</span>
            </div>
        </div>
        <div className='mt-4 text-text-primary text-lg'>
            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
        </div>
    </div>
)

export default CheckoutTotal