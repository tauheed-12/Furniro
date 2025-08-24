import { useSelector } from "react-redux";

const CheckoutForm = ({ handleFormSubmit, inputDivCss, labelCss, handleChange,
    inputCss, handlePaymentMethodChange, error, loading
}) => {
    const { billingDetails } = useSelector(state => state.payment);
    return (
        <form className='flex-1 flex flex-col gap-5' onSubmit={handleFormSubmit}>
            <div className='flex flex-row justify-between items-center gap-5'>
                <div className={inputDivCss}>
                    <label className={labelCss}>First Name</label>
                    <input
                        type='text'
                        value={billingDetails.firstName}
                        onChange={handleChange}
                        name='firstName'
                        className={inputCss}
                        required
                    />
                </div>
                <div className={inputDivCss}>
                    <label className={labelCss}>Last Name</label>
                    <input
                        name='lastName'
                        value={billingDetails.lastName}
                        type='text'
                        onChange={handleChange}
                        className={inputCss}
                        required
                    />
                </div>
            </div>
            <div className={inputDivCss}>
                <label className={labelCss}>Company Name</label>
                <input
                    type='text'
                    value={billingDetails.companyName}
                    name='companyName'
                    onChange={handleChange}
                    className={inputCss}
                />
            </div>
            <div className={inputDivCss}>
                <label className={labelCss}>Country</label>
                <input
                    type='text'
                    value={billingDetails.country}
                    name='country'
                    onChange={handleChange}
                    className={inputCss}
                    required
                />
            </div>
            <div className={inputDivCss}>
                <label className={labelCss}>Street Address</label>
                <input
                    type='text'
                    value={billingDetails.streetAddress}
                    name='streetAddress'
                    onChange={handleChange}
                    className={inputCss}
                    required
                />
            </div>
            <div className={inputDivCss}>
                <label className={labelCss}>City</label>
                <input
                    type='text'
                    value={billingDetails.city}
                    name='city'
                    onChange={handleChange}
                    className={inputCss}
                    required
                />
            </div>
            <div className={inputDivCss}>
                <label className={labelCss}>Province</label>
                <input
                    type='text'
                    name='province'
                    onChange={handleChange}
                    value={billingDetails.province}
                    className={inputCss}
                    required
                />
            </div>
            <div className={inputDivCss}>
                <label className={labelCss}>ZIP code</label>
                <input
                    type='text'
                    value={billingDetails.zipCode}
                    name='zipCode'
                    onChange={handleChange}
                    className={inputCss}
                    required
                />
            </div>
            <div className={inputDivCss}>
                <label className={labelCss}>Email Address</label>
                <input
                    type='email'
                    value={billingDetails.emailAddress}
                    name='emailAddress'
                    onChange={handleChange}
                    className={inputCss}
                    required
                />
            </div>
            <div className={inputDivCss}>
                <label className={labelCss}>Additional Information</label>
                <input
                    type='text'
                    value={billingDetails.additionalInfo}
                    name='additionalInfo'
                    onChange={handleChange}
                    className={inputCss}
                />
            </div>
            <div className='mt-4'>
                <div className='flex items-center'>
                    <input
                        type='radio'
                        name='paymentMethod'
                        value='bankTransfer'
                        onChange={handlePaymentMethodChange}
                        required
                    />
                    <p className='ml-2 text-lg font-semibold'>Direct Bank Transfer</p>
                </div>
                <div className='flex items-center mt-4'>
                    <input
                        type='radio'
                        name='paymentMethod'
                        value='cashOnDelivery'
                        onChange={handlePaymentMethodChange}
                        required
                    />
                    <p className='ml-2 text-lg font-semibold'>Cash On Delivery</p>
                </div>
            </div>
            {error && <div className='text-red-500'>{error}</div>}
            <button
                type='submit'
                disabled={loading}
                className='self-center px-7 text-lg py-2 border-2 border-black rounded-2xl mt-8 hover:bg-primary hover:text-white'
            >
                {loading ? 'Processing...' : 'Place Order'}
            </button>
        </form>
    )
}

export default CheckoutForm;