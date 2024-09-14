import { MdFilterList } from "react-icons/md";

const ShopFilter = ({ start, end, productData, numberOfProducts, setNumberOfProducts, sortOrder, setSortOrder }) => {
    <div className='flex flex-col gap-8 md:flex-row justify-between items-center py-2 px-6 bg-quaternary -mt-5'>
        <div className='flex justify-center items-center gap-5'>
            <div className='flex justify-center items-center gap-3'>
                <MdFilterList />
                <span className='text-lg'>Filter</span>
            </div>

            <div className='text-lg'>
                Showing {start + 1}-{end > productData.length ? productData.length : end} results of {productData.length}
            </div>
        </div>
        <div className='flex flex-col sm:flex-row justify-center items-center gap-5'>
            <div className='flex justify-center items-center gap-3'>
                <label className='text-xl font-semibold'>Show</label>
                <input
                    type='number'
                    className='w-10 h-10 bg-white border-none'
                    placeholder='16'
                    value={numberOfProducts}
                    onChange={(e) => setNumberOfProducts(parseInt(e.target.value) || 16)}
                />
            </div>
            <div className='flex justify-center items-center gap-3'>
                <label className='text-xl font-semibold'>Sort By</label>
                <select
                    className='h-10 bg-white border-none'
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="default">Default</option>
                    <option value="price-high-to-low">Price high to low</option>
                    <option value="price-low-to-high">Price low to high</option>
                </select>
            </div>
        </div>
    </div>
}

export default ShopFilter