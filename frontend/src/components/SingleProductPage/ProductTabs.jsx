import DescriptionTab from "./DescriptionTab";
import AdditionalInfoTab from "./AdditionalInfoTab";
import ReviewsTab from "./ReviewsTab";

const ProductTabs = ({ selectedButton, setSelectedButton, product }) => (
    <div className='flex flex-col justify-start items-center py-10 px-6'>
        <div className='flex flex-row flex-wrap justify-center items-center gap-6 mb-4'>
            <button onClick={() => setSelectedButton(1)} className={`text-xl ${selectedButton === 1 ? 'text-black' : 'text-text-primary'}`}>
                Descriptions
            </button>
            <button onClick={() => setSelectedButton(2)} className={`text-xl ${selectedButton === 2 ? 'text-black' : 'text-text-primary'}`}>
                Additional Information
            </button>
            <button onClick={() => setSelectedButton(3)} className={`text-xl ${selectedButton === 3 ? 'text-black' : 'text-text-primary'}`}>
                Reviews(5)
            </button>
        </div>
        <div className='px-6 md:px-12 lg:px-28'>
            {selectedButton === 1 && <DescriptionTab description={product.description} imagesUrl={product.imagesUrl} />}
            {selectedButton === 2 && <AdditionalInfoTab product={product} />}
            {selectedButton === 3 && <ReviewsTab reviews={product.reviews} />}
        </div>
    </div>
);

export default ProductTabs;