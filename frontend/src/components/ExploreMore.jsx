import { VscCircle, VscArrowCircleRight } from "react-icons/vsc";

const ExploreMore = ({ imgs, imgIndex, setImgIndex }) => (
    <div className='flex flex-col lg:flex-row justify-between items-center w-full bg-tertiary py-8 overflow-x-hidden'>
        <div className='flex flex-col justify-start items-start gap-4 px-8'>
            <h2 className='text-4xl font-bold'>50+ Beautiful rooms inspiration</h2>
            <p className='text-sm text-text-primary w-[60%]'>Our designer already made a lot of beautiful prototype of rooms that inspire you</p>
            <button className='text-lg bg-primary text-white py-1 px-6 mt-4'>Explore More</button>
        </div>
        <div className='flex flex-row justify-center items-start gap-8 relative px-6'>
            <img src={imgs[imgIndex % imgs.length]} alt='slide1' className='mt-5 lg:mt-0' />
            <div className='hidden md:flex flex-col gap-8 '>
                <div className='flex-[2] flex flex-row items-start justify-start gap-6'>
                    <img src={imgs[(imgIndex + 1) % imgs.length]} alt='slide3' className='' />
                    <img src={imgs[(imgIndex + 2) % imgs.length]} alt='slide2' className='' />
                </div>
                <div className='flex-1 flex flex-row justify-start items-center gap-6'>
                    <VscCircle />
                    <VscCircle />
                    <VscCircle />
                </div>
            </div>
            <VscArrowCircleRight
                className='absolute hidden md:flex top-1/4 right-16 text-4xl text-text-secondary rounded-full
             bg-tertiary' onClick={() => setImgIndex(imgIndex + 1)} />
        </div>
    </div>
)

export default ExploreMore;